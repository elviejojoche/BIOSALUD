// Validaciones de citas (se ejecutan en el servidor antes de guardar)
import { Cita, EstadoCita } from "../models/cita.model";
import { Errores } from "./comun";

// Datos de una cita sin el ID (el ID lo asigna el sistema)
export type DatosCita = Omit<Cita, "id">;

const ESTADOS: EstadoCita[] = ["Pendiente", "Confirmada", "Atendida", "Cancelada"];
const FORMATO_FECHA = /^\d{4}-\d{2}-\d{2}$/; // AAAA-MM-DD
const FORMATO_HORA = /^\d{2}:\d{2}$/;        // HH:MM

// Fecha de hoy en formato AAAA-MM-DD
export function fechaDeHoy(): string {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

// Toma lo que llega del formulario y lo limpia
export function leerDatosCita(body: any): DatosCita {
  const estado = String(body?.estado ?? "");
  return {
    pacienteId: Number(body?.pacienteId) || 0,
    medicoId: Number(body?.medicoId) || 0,
    fecha: String(body?.fecha ?? "").trim(),
    hora: String(body?.hora ?? "").trim(),
    motivo: String(body?.motivo ?? "").trim(),
    estado: ESTADOS.includes(estado as EstadoCita) ? (estado as EstadoCita) : "Pendiente",
  };
}

// Revisa cada campo y devuelve los errores encontrados (vacío = todo bien)
// esNueva = true cuando se registra (no se permiten fechas pasadas)
export function validarCita(datos: DatosCita, esNueva: boolean): Errores {
  const errores: Errores = {};

  if (!datos.pacienteId) {
    errores.pacienteId = "Debe seleccionar un paciente.";
  }

  if (!datos.medicoId) {
    errores.medicoId = "Debe seleccionar un médico.";
  }

  if (datos.fecha === "") {
    errores.fecha = "La fecha es obligatoria.";
  } else if (!FORMATO_FECHA.test(datos.fecha)) {
    errores.fecha = "La fecha no es válida.";
  } else if (esNueva && datos.fecha < fechaDeHoy()) {
    errores.fecha = "La fecha no puede ser anterior a hoy.";
  }

  if (datos.hora === "") {
    errores.hora = "La hora es obligatoria.";
  } else if (!FORMATO_HORA.test(datos.hora)) {
    errores.hora = "La hora no es válida.";
  }

  if (datos.motivo === "") {
    errores.motivo = "El motivo es obligatorio.";
  } else if (datos.motivo.length < 5) {
    errores.motivo = "Describe el motivo con al menos 5 caracteres.";
  }

  return errores;
}
