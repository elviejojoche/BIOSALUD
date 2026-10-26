// Datos de demostración de médicos.
// Cuando conectemos MySQL, estos datos vendrán de la tabla "medicos".
import { Medico } from "../models/medico.model";

export const medicos: Medico[] = [
  { id: 1, nombre: "Dra. Paula Andrade", especialidad: "Medicina general", documento: "52345678", telefono: "3201234567", correo: "paula.andrade@biosalud.com", estado: "Activo" },
  { id: 2, nombre: "Dr. Felipe Morales", especialidad: "Pediatría", documento: "80456789", telefono: "3212345678", correo: "felipe.morales@biosalud.com", estado: "Activo" },
  { id: 3, nombre: "Dra. Natalia Vargas", especialidad: "Cardiología", documento: "52567890", telefono: "3223456789", correo: "natalia.vargas@biosalud.com", estado: "Activo" },
  { id: 4, nombre: "Dr. Ricardo Peña", especialidad: "Dermatología", documento: "79678901", telefono: "3234567890", correo: "ricardo.pena@biosalud.com", estado: "Activo" },
  { id: 5, nombre: "Dra. Diana Suárez", especialidad: "Ginecología", documento: "52789012", telefono: "3245678901", correo: "diana.suarez@biosalud.com", estado: "Inactivo" },
  { id: 6, nombre: "Dr. Mauricio León", especialidad: "Ortopedia", documento: "80890123", telefono: "3256789012", correo: "mauricio.leon@biosalud.com", estado: "Activo" },
];
