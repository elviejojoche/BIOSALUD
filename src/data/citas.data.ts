// Datos de demostración de citas.
// Cuando conectemos MySQL, estos datos vendrán de la tabla "citas".
import { Cita } from "../models/cita.model";

export const citas: Cita[] = [
  { id: 1, pacienteId: 1, medicoId: 1, fecha: "2026-10-20", hora: "08:00", motivo: "Control general", estado: "Atendida" },
  { id: 2, pacienteId: 3, medicoId: 3, fecha: "2026-10-22", hora: "10:30", motivo: "Dolor en el pecho", estado: "Atendida" },
  { id: 3, pacienteId: 4, medicoId: 4, fecha: "2026-10-24", hora: "14:00", motivo: "Revisión de lunar", estado: "Cancelada" },
  { id: 4, pacienteId: 2, medicoId: 1, fecha: "2026-10-28", hora: "09:00", motivo: "Chequeo anual", estado: "Confirmada" },
  { id: 5, pacienteId: 6, medicoId: 2, fecha: "2026-10-29", hora: "11:00", motivo: "Vacunación", estado: "Pendiente" },
  { id: 6, pacienteId: 5, medicoId: 3, fecha: "2026-10-30", hora: "15:30", motivo: "Control de presión arterial", estado: "Confirmada" },
  { id: 7, pacienteId: 8, medicoId: 4, fecha: "2026-11-03", hora: "08:30", motivo: "Alergia en la piel", estado: "Pendiente" },
  { id: 8, pacienteId: 7, medicoId: 1, fecha: "2026-11-05", hora: "16:00", motivo: "Dolor de cabeza frecuente", estado: "Pendiente" },
];
