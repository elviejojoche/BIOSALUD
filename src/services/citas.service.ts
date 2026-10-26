// Servicio de citas: aquí están todas las operaciones con los datos.
// Hoy trabaja con el arreglo de demostración; al conectar MySQL solo cambia este archivo.
import { Cita } from "../models/cita.model";
import { citas } from "../data/citas.data";
import { pacientes } from "../data/pacientes.data";
import { medicos } from "../data/medicos.data";
import { DatosCita } from "../validations/cita.validation";

// Una cita con los nombres del paciente y del médico (como un JOIN en SQL)
export interface CitaDetalle extends Cita {
  paciente: string;
  medico: string;
  especialidad: string;
}

function agregarNombres(c: Cita): CitaDetalle {
  const paciente = pacientes.find((p) => p.id === c.pacienteId);
  const medico = medicos.find((m) => m.id === c.medicoId);
  return {
    ...c,
    paciente: paciente ? `${paciente.nombre} ${paciente.apellido}` : "Desconocido",
    medico: medico ? medico.nombre : "Desconocido",
    especialidad: medico ? medico.especialidad : "",
  };
}

// Listar citas ordenadas por fecha y hora.
// buscar: filtra por paciente, médico o motivo. estado: filtra por estado.
export function listarCitas(buscar = "", estado = ""): CitaDetalle[] {
  const texto = buscar.trim().toLowerCase();

  return citas
    .map(agregarNombres)
    .filter((c) => estado === "" || c.estado === estado)
    .filter((c) => `${c.paciente} ${c.medico} ${c.motivo}`.toLowerCase().includes(texto))
    .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));
}

export function obtenerCita(id: number): Cita | undefined {
  return citas.find((c) => c.id === id);
}

export function existePaciente(id: number): boolean {
  return pacientes.some((p) => p.id === id);
}

export function medicoActivo(id: number): boolean {
  return medicos.some((m) => m.id === id && m.estado === "Activo");
}

// Revisa si el médico ya tiene otra cita (no cancelada) en la misma fecha y hora
export function horarioOcupado(datos: DatosCita, excluirId?: number): boolean {
  return citas.some(
    (c) =>
      c.medicoId === datos.medicoId &&
      c.fecha === datos.fecha &&
      c.hora === datos.hora &&
      c.estado !== "Cancelada" &&
      c.id !== excluirId
  );
}

export function crearCita(datos: DatosCita): Cita {
  // El nuevo ID es el mayor ID actual + 1 (en MySQL lo haría AUTO_INCREMENT)
  const nuevoId = citas.length > 0 ? Math.max(...citas.map((c) => c.id)) + 1 : 1;
  const nueva: Cita = { id: nuevoId, ...datos };
  citas.push(nueva);
  return nueva;
}

export function actualizarCita(id: number, datos: DatosCita): Cita | undefined {
  const cita = obtenerCita(id);
  if (!cita) return undefined;

  Object.assign(cita, datos);
  return cita;
}

export function eliminarCita(id: number): boolean {
  const posicion = citas.findIndex((c) => c.id === id);
  if (posicion === -1) return false;

  citas.splice(posicion, 1);
  return true;
}
