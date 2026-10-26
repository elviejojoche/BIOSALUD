// Controlador de médicos: recibe las peticiones, valida y responde
import { Request, Response } from "express";
import * as servicio from "../services/medicos.service";
import { leerDatosMedico, validarMedico } from "../validations/medico.validation";

// GET /api/medicos?buscar=texto
export function listar(req: Request, res: Response) {
  const buscar = String(req.query.buscar ?? "");
  res.json(servicio.listarMedicos(buscar));
}

// GET /api/medicos/:id
export function obtener(req: Request, res: Response) {
  const medico = servicio.obtenerMedico(Number(req.params.id));
  if (!medico) {
    res.status(404).json({ mensaje: "Médico no encontrado." });
    return;
  }
  res.json(medico);
}

// POST /api/medicos
export function crear(req: Request, res: Response) {
  const datos = leerDatosMedico(req.body);
  const errores = validarMedico(datos);

  if (!errores.documento && servicio.existeDocumento(datos.documento)) {
    errores.documento = "Ya existe un médico con ese documento.";
  }

  if (Object.keys(errores).length > 0) {
    res.status(400).json({ mensaje: "Revisa los campos marcados.", errores });
    return;
  }

  const medico = servicio.crearMedico(datos);
  res.status(201).json({ mensaje: "Médico registrado correctamente.", medico });
}

// PUT /api/medicos/:id
export function actualizar(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!servicio.obtenerMedico(id)) {
    res.status(404).json({ mensaje: "Médico no encontrado." });
    return;
  }

  const datos = leerDatosMedico(req.body);
  const errores = validarMedico(datos);

  if (!errores.documento && servicio.existeDocumento(datos.documento, id)) {
    errores.documento = "Ya existe otro médico con ese documento.";
  }

  if (Object.keys(errores).length > 0) {
    res.status(400).json({ mensaje: "Revisa los campos marcados.", errores });
    return;
  }

  const medico = servicio.actualizarMedico(id, datos);
  res.json({ mensaje: "Médico actualizado correctamente.", medico });
}

// DELETE /api/medicos/:id
export function eliminar(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!servicio.obtenerMedico(id)) {
    res.status(404).json({ mensaje: "Médico no encontrado." });
    return;
  }

  if (servicio.tieneCitas(id)) {
    res.status(400).json({ mensaje: "No se puede eliminar: el médico tiene citas registradas." });
    return;
  }

  servicio.eliminarMedico(id);
  res.json({ mensaje: "Médico eliminado correctamente." });
}
