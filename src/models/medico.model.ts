// Modelo: describe cómo es un médico (será la tabla "medicos" en MySQL)
export type EstadoMedico = "Activo" | "Inactivo";

export interface Medico {
  id: number;
  nombre: string;
  especialidad: string;
  documento: string;
  telefono: string;
  correo: string;
  estado: EstadoMedico;
}
