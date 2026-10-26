// Modelo: describe cómo es una cita (será la tabla "citas" en MySQL)
export type EstadoCita = "Pendiente" | "Confirmada" | "Atendida" | "Cancelada";

export interface Cita {
  id: number;
  pacienteId: number; // se relaciona con Paciente.id
  medicoId: number;   // se relaciona con Medico.id
  fecha: string;      // formato AAAA-MM-DD
  hora: string;       // formato HH:MM
  motivo: string;
  estado: EstadoCita;
}
