// Controlador de pacientes: recibe las peticiones, valida y responde
import { Request, Response } from "express";
import * as servicio from "../services/pacientes.service";
import { leerDatosPaciente, validarPaciente } from "../validations/paciente.validation";

// GET /api/pacientes?buscar=texto
export function listar(req: Request, res: Response) {
  const buscar = String(req.query.buscar ?? "");
  res.json(servicio.listarPacientes(buscar));
}

// GET /api/pacientes/:id
export function obtener(req: Request, res: Response) {
  const paciente = servicio.obtenerPaciente(Number(req.params.id));
  if (!paciente) {
    res.status(404).json({ mensaje: "Paciente no encontrado." });
    return;
  }
  res.json(paciente);
}

// POST /api/pacientes
export function crear(req: Request, res: Response) {
  const datos = leerDatosPaciente(req.body);
  const errores = validarPaciente(datos);

  if (!errores.documento && servicio.existeDocumento(datos.documento)) {
    errores.documento = "Ya existe un paciente con ese documento.";
  }

  if (Object.keys(errores).length > 0) {
    res.status(400).json({ mensaje: "Revisa los campos marcados.", errores });
    return;
  }

  const paciente = servicio.crearPaciente(datos);
  res.status(201).json({ mensaje: "Paciente registrado correctamente.", paciente });
}

// PUT /api/pacientes/:id
export function actualizar(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!servicio.obtenerPaciente(id)) {
    res.status(404).json({ mensaje: "Paciente no encontrado." });
    return;
  }

  const datos = leerDatosPaciente(req.body);
  const errores = validarPaciente(datos);

  if (!errores.documento && servicio.existeDocumento(datos.documento, id)) {
    errores.documento = "Ya existe otro paciente con ese documento.";
  }

  if (Object.keys(errores).length > 0) {
    res.status(400).json({ mensaje: "Revisa los campos marcados.", errores });
    return;
  }

  const paciente = servicio.actualizarPaciente(id, datos);
  res.json({ mensaje: "Paciente actualizado correctamente.", paciente });
}

// DELETE /api/pacientes/:id
export function eliminar(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!servicio.obtenerPaciente(id)) {
    res.status(404).json({ mensaje: "Paciente no encontrado." });
    return;
  }

  if (servicio.tieneCitas(id)) {
    res.status(400).json({ mensaje: "No se puede eliminar: el paciente tiene citas registradas." });
    return;
  }

  servicio.eliminarPaciente(id);
  res.json({ mensaje: "Paciente eliminado correctamente." });
}
