// Validaciones de médicos (se ejecutan en el servidor antes de guardar)
import { Medico } from "../models/medico.model";
import { Errores, SOLO_NUMEROS, CORREO_VALIDO } from "./comun";

// Datos de un médico sin el ID (el ID lo asigna el sistema)
export type DatosMedico = Omit<Medico, "id">;

// Toma lo que llega del formulario y lo limpia (quita espacios al inicio y al final)
export function leerDatosMedico(body: any): DatosMedico {
  return {
    nombre: String(body?.nombre ?? "").trim(),
    especialidad: String(body?.especialidad ?? "").trim(),
    documento: String(body?.documento ?? "").trim(),
    telefono: String(body?.telefono ?? "").trim(),
    correo: String(body?.correo ?? "").trim(),
    estado: body?.estado === "Inactivo" ? "Inactivo" : "Activo",
  };
}

// Revisa cada campo y devuelve los errores encontrados (vacío = todo bien)
export function validarMedico(datos: DatosMedico): Errores {
  const errores: Errores = {};

  if (datos.nombre === "") {
    errores.nombre = "El nombre es obligatorio.";
  }

  if (datos.especialidad === "") {
    errores.especialidad = "Debe seleccionar una especialidad.";
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

  return errores;
}
