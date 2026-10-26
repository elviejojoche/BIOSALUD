// Modelo: describe cómo es un paciente (será la tabla "pacientes" en MySQL)
export type EstadoPaciente = "Activo" | "Inactivo";

export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  documento: string;
  telefono: string;
  correo: string;
  eps: string;
  estado: EstadoPaciente;
}
