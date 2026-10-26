// Elementos de validación que comparten pacientes, médicos y citas

// Errores por campo, ejemplo: { nombre: "El nombre es obligatorio" }
export type Errores = Record<string, string>;

// Expresiones regulares sencillas
export const SOLO_NUMEROS = /^[0-9]+$/;
export const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
