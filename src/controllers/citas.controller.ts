// Controlador de citas: recibe las peticiones, valida y responde
import { Request, Response } from "express";
import * as servicio from "../services/citas.service";
import { DatosCita, leerDatosCita, validarCita } from "../validations/cita.validation";
import { Errores } from "../validations/comun";

// Validaciones que necesitan consultar los datos guardados
function validarRelaciones(datos: DatosCita, errores: Errores, excluirId?: number) {
  if (!errores.pacienteId && !servicio.existePaciente(datos.pacienteId)) {
    errores.pacienteId = "El paciente seleccionado no existe.";
  }

  if (!errores.medicoId && !servicio.medicoActivo(datos.medicoId)) {
    errores.medicoId = "El médico seleccionado no existe o está inactivo.";
  }

  const sinErroresDeHorario = !errores.medicoId && !errores.fecha && !errores.hora;
  if (sinErroresDeHorario && datos.estado !== "Cancelada" && servicio.horarioOcupado(datos, excluirId)) {
    errores.hora = "El médico ya tiene una cita en esa fecha y hora.";
  }
}

// GET /api/citas?buscar=texto&estado=Pendiente
export function listar(req: Request, res: Response) {
  const buscar = String(req.query.buscar ?? "");
  const estado = String(req.query.estado ?? "");
  res.json(servicio.listarCitas(buscar, estado));
}

// GET /api/citas/:id
export function obtener(req: Request, res: Response) {
  const cita = servicio.obtenerCita(Number(req.params.id));
  if (!cita) {
    res.status(404).json({ mensaje: "Cita no encontrada." });
    return;
  }
  res.json(cita);
}

// POST /api/citas
export function crear(req: Request, res: Response) {
  const datos = leerDatosCita(req.body);
  const errores = validarCita(datos, true);
  validarRelaciones(datos, errores);

  if (Object.keys(errores).length > 0) {
    res.status(400).json({ mensaje: "Revisa los campos marcados.", errores });
    return;
  }

  const cita = servicio.crearCita(datos);
  res.status(201).json({ mensaje: "Cita registrada correctamente.", cita });
}

// PUT /api/citas/:id
export function actualizar(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!servicio.obtenerCita(id)) {
    res.status(404).json({ mensaje: "Cita no encontrada." });
    return;
  }

  const datos = leerDatosCita(req.body);
  const errores = validarCita(datos, false);
  validarRelaciones(datos, errores, id);

  if (Object.keys(errores).length > 0) {
    res.status(400).json({ mensaje: "Revisa los campos marcados.", errores });
    return;
  }

  const cita = servicio.actualizarCita(id, datos);
  res.json({ mensaje: "Cita actualizada correctamente.", cita });
}

// DELETE /api/citas/:id
export function eliminar(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!servicio.eliminarCita(id)) {
    res.status(404).json({ mensaje: "Cita no encontrada." });
    return;
  }
  res.json({ mensaje: "Cita eliminada correctamente." });
}
