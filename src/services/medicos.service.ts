// Servicio de médicos: aquí están todas las operaciones con los datos.
// Hoy trabaja con el arreglo de demostración; al conectar MySQL solo cambia este archivo.
import { Medico } from "../models/medico.model";
import { medicos } from "../data/medicos.data";
import { citas } from "../data/citas.data";
import { DatosMedico } from "../validations/medico.validation";

// Listar médicos. Si llega un texto de búsqueda, filtra por nombre, especialidad o documento
export function listarMedicos(buscar = ""): Medico[] {
  const texto = buscar.trim().toLowerCase();
  if (texto === "") return medicos;

  return medicos.filter((m) =>
    `${m.nombre} ${m.especialidad} ${m.documento}`.toLowerCase().includes(texto)
  );
}

export function obtenerMedico(id: number): Medico | undefined {
  return medicos.find((m) => m.id === id);
}

// Revisa si otro médico ya tiene ese documento (excluirId sirve al editar)
export function existeDocumento(documento: string, excluirId?: number): boolean {
  return medicos.some((m) => m.documento === documento && m.id !== excluirId);
}

export function crearMedico(datos: DatosMedico): Medico {
  // El nuevo ID es el mayor ID actual + 1 (en MySQL lo haría AUTO_INCREMENT)
  const nuevoId = medicos.length > 0 ? Math.max(...medicos.map((m) => m.id)) + 1 : 1;
  const nuevo: Medico = { id: nuevoId, ...datos };
  medicos.push(nuevo);
  return nuevo;
}

export function actualizarMedico(id: number, datos: DatosMedico): Medico | undefined {
  const medico = obtenerMedico(id);
  if (!medico) return undefined;

  Object.assign(medico, datos);
  return medico;
}

// Un médico con citas no se puede eliminar (para no dejar citas sin médico)
export function tieneCitas(id: number): boolean {
  return citas.some((c) => c.medicoId === id);
}

export function eliminarMedico(id: number): boolean {
  const posicion = medicos.findIndex((m) => m.id === id);
  if (posicion === -1) return false;

  medicos.splice(posicion, 1);
  return true;
}
