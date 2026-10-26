// Validaciones de pacientes (se ejecutan en el servidor antes de guardar)
import { Paciente } from "../models/paciente.model";
import { Errores, SOLO_NUMEROS, CORREO_VALIDO } from "./comun";

// Datos de un paciente sin el ID (el ID lo asigna el sistema)
export type DatosPaciente = Omit<Paciente, "id">;

// Toma lo que llega del formulario y lo limpia (quita espacios al inicio y al final)
export function leerDatosPaciente(body: any): DatosPaciente {
  return {
    nombre: String(body?.nombre ?? "").trim(),
    apellido: String(body?.apellido ?? "").trim(),
    documento: String(body?.documento ?? "").trim(),
    telefono: String(body?.telefono ?? "").trim(),
    correo: String(body?.correo ?? "").trim(),
    eps: String(body?.eps ?? "").trim(),
    estado: body?.estado === "Inactivo" ? "Inactivo" : "Activo",
  };
}

// Revisa cada campo y devuelve los errores encontrados (vacío = todo bien)
export function validarPaciente(datos: DatosPaciente): Errores {
  const errores: Errores = {};

  if (datos.nombre === "") {
    errores.nombre = "El nombre es obligatorio.";
  }

  if (datos.apellido === "") {
    errores.apellido = "El apellido es obligatorio.";
  }

  if (datos.documento === "") {
    errores.documento = "El documento es obligatorio.";
  } else if (!SOLO_NUMEROS.test(datos.documento)) {
    errores.documento = "El documento solo debe contener números.";
  }

  if (datos.telefono === "") {
    errores.telefono = "El teléfono es obligatorio.";
  } else if (!SOLO_NUMEROS.test(datos.telefono) || datos.telefono.length < 7) {
    errores.telefono = "El teléfono debe tener al menos 7 números.";
  }

  if (datos.correo === "") {
    errores.correo = "El correo es obligatorio.";
  } else if (!CORREO_VALIDO.test(datos.correo)) {
    errores.correo = "El correo no tiene un formato válido (ejemplo: nombre@correo.com).";
  }

  if (datos.eps === "") {
    errores.eps = "Debe seleccionar una EPS.";
  }

  return errores;
}
