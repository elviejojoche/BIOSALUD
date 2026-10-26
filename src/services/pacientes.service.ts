// Servicio de pacientes: aquí están todas las operaciones con los datos.
// Hoy trabaja con el arreglo de demostración; al conectar MySQL solo cambia este archivo.
import { Paciente } from "../models/paciente.model";
import { pacientes } from "../data/pacientes.data";
import { citas } from "../data/citas.data";
import { DatosPaciente } from "../validations/paciente.validation";

// Listar pacientes. Si llega un texto de búsqueda, filtra por nombre, apellido, documento o EPS
export function listarPacientes(buscar = ""): Paciente[] {
  const texto = buscar.trim().toLowerCase();
  if (texto === "") return pacientes;

  return pacientes.filter((p) =>
    `${p.nombre} ${p.apellido} ${p.documento} ${p.eps}`.toLowerCase().includes(texto)
  );
}

export function obtenerPaciente(id: number): Paciente | undefined {
  return pacientes.find((p) => p.id === id);
}

// Revisa si otro paciente ya tiene ese documento (excluirId sirve al editar)
export function existeDocumento(documento: string, excluirId?: number): boolean {
  return pacientes.some((p) => p.documento === documento && p.id !== excluirId);
}

export function crearPaciente(datos: DatosPaciente): Paciente {
  // El nuevo ID es el mayor ID actual + 1 (en MySQL lo haría AUTO_INCREMENT)
  const nuevoId = pacientes.length > 0 ? Math.max(...pacientes.map((p) => p.id)) + 1 : 1;
  const nuevo: Paciente = { id: nuevoId, ...datos };
  pacientes.push(nuevo);
  return nuevo;
}

export function actualizarPaciente(id: number, datos: DatosPaciente): Paciente | undefined {
  const paciente = obtenerPaciente(id);
  if (!paciente) return undefined;

  Object.assign(paciente, datos);
  return paciente;
}

// Un paciente con citas no se puede eliminar (para no dejar citas sin paciente)
export function tieneCitas(id: number): boolean {
  return citas.some((c) => c.pacienteId === id);
}

export function eliminarPaciente(id: number): boolean {
  const posicion = pacientes.findIndex((p) => p.id === id);
  if (posicion === -1) return false;

  pacientes.splice(posicion, 1);
  return true;
}
