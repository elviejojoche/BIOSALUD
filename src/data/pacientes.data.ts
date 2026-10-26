// Datos de demostración de pacientes.
// Cuando conectemos MySQL, estos datos vendrán de la tabla "pacientes".
import { Paciente } from "../models/paciente.model";

export const pacientes: Paciente[] = [
  { id: 1, nombre: "Carlos", apellido: "Ramírez", documento: "1023456789", telefono: "3104567890", correo: "carlos.ramirez@gmail.com", eps: "Sura", estado: "Activo" },
  { id: 2, nombre: "María", apellido: "López", documento: "1034567891", telefono: "3115678901", correo: "maria.lopez@gmail.com", eps: "Sanitas", estado: "Activo" },
  { id: 3, nombre: "Andrés", apellido: "Gómez", documento: "1045678912", telefono: "3126789012", correo: "andres.gomez@hotmail.com", eps: "Nueva EPS", estado: "Activo" },
  { id: 4, nombre: "Laura", apellido: "Martínez", documento: "1056789123", telefono: "3137890123", correo: "laura.martinez@gmail.com", eps: "Compensar", estado: "Inactivo" },
  { id: 5, nombre: "Jorge", apellido: "Herrera", documento: "1067891234", telefono: "3148901234", correo: "jorge.herrera@outlook.com", eps: "Sura", estado: "Activo" },
  { id: 6, nombre: "Valentina", apellido: "Castro", documento: "1078912345", telefono: "3159012345", correo: "valentina.castro@gmail.com", eps: "Salud Total", estado: "Activo" },
  { id: 7, nombre: "Santiago", apellido: "Rojas", documento: "1089123456", telefono: "3160123456", correo: "santiago.rojas@gmail.com", eps: "Famisanar", estado: "Activo" },
  { id: 8, nombre: "Camila", apellido: "Torres", documento: "1091234567", telefono: "3171234567", correo: "camila.torres@yahoo.com", eps: "Sanitas", estado: "Activo" },
  { id: 9, nombre: "Daniel", apellido: "Moreno", documento: "1102345678", telefono: "3182345678", correo: "daniel.moreno@gmail.com", eps: "Coosalud", estado: "Activo" },
  { id: 10, nombre: "Sofía", apellido: "Jiménez", documento: "1113456789", telefono: "3193456789", correo: "sofia.jimenez@gmail.com", eps: "Nueva EPS", estado: "Inactivo" },
];
