// JavaScript de la página de Médicos: listar, buscar, registrar, editar y eliminar

const tabla = document.getElementById("tabla-medicos");
const buscador = document.getElementById("buscador");
const modal = document.getElementById("modal");
const formulario = document.getElementById("formulario");
const tituloFormulario = document.getElementById("titulo-formulario");

// Campos del formulario (sin el ID)
const CAMPOS = ["nombre", "especialidad", "documento", "telefono", "correo", "estado"];

// Guardamos la lista para poder llenar el formulario al editar
let listaMedicos = [];

// ---------- 1. LISTAR Y BUSCAR ----------
async function cargarMedicos() {
  const texto = buscador.value;
  const respuesta = await fetch(`/api/medicos?buscar=${encodeURIComponent(texto)}`);
  listaMedicos = await respuesta.json();
  mostrarTabla();
}

function mostrarTabla() {
  if (listaMedicos.length === 0) {
    tabla.innerHTML = `<tr><td colspan="8" class="vacio">No se encontraron médicos</td></tr>`;
    return;
  }

  tabla.innerHTML = listaMedicos
    .map(
      (m) => `
      <tr>
        <td>${m.id}</td>
        <td><strong>${escapar(m.nombre)}</strong></td>
        <td>${escapar(m.especialidad)}</td>
        <td>${escapar(m.documento)}</td>
        <td>${escapar(m.telefono)}</td>
        <td>${escapar(m.correo)}</td>
        <td>${etiquetaEstado(m.estado)}</td>
        <td class="acciones">
          <button class="btn-accion editar" onclick="abrirEditar(${m.id})">Editar</button>
          <button class="btn-accion eliminar" onclick="eliminarMedico(${m.id})">Eliminar</button>
        </td>
      </tr>`
    )
    .join("");
}

// Cada vez que se escribe en el buscador, se vuelve a cargar la tabla
buscador.addEventListener("input", cargarMedicos);

// ---------- 2. ABRIR EL FORMULARIO ----------
document.getElementById("btn-nuevo").addEventListener("click", () => {
  formulario.reset();
  limpiarErrores(formulario);
  formulario.elements.id.value = "";
  tituloFormulario.textContent = "Nuevo médico";
  modal.showModal();
});

function abrirEditar(id) {
  const medico = listaMedicos.find((m) => m.id === id);
  limpiarErrores(formulario);
  tituloFormulario.textContent = "Editar médico";

  // Llenamos el formulario con los datos actuales
  formulario.elements.id.value = medico.id;
  for (const campo of CAMPOS) {
    formulario.elements[campo].value = medico[campo];
  }
  modal.showModal();
}

document.getElementById("btn-cancelar").addEventListener("click", () => modal.close());

// ---------- 3. VALIDAR EN EL NAVEGADOR ----------
// (el servidor vuelve a validar por seguridad)
function validarFormulario(datos) {
  const errores = {};
  const soloNumeros = /^[0-9]+$/;
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (datos.nombre === "") errores.nombre = "El nombre es obligatorio.";
  if (datos.especialidad === "") errores.especialidad = "Debe seleccionar una especialidad.";

  if (datos.documento === "") errores.documento = "El documento es obligatorio.";
  else if (!soloNumeros.test(datos.documento)) errores.documento = "El documento solo debe contener números.";

  if (datos.telefono === "") errores.telefono = "El teléfono es obligatorio.";
  else if (!soloNumeros.test(datos.telefono) || datos.telefono.length < 7)
    errores.telefono = "El teléfono debe tener al menos 7 números.";

  if (datos.correo === "") errores.correo = "El correo es obligatorio.";
  else if (!correoValido.test(datos.correo))
    errores.correo = "El correo no tiene un formato válido (ejemplo: nombre@correo.com).";

  return errores;
}

// ---------- 4. GUARDAR (REGISTRAR O EDITAR) ----------
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault(); // evita que la página se recargue

  // Leemos los datos del formulario
  const datos = {};
  for (const campo of CAMPOS) {
    datos[campo] = formulario.elements[campo].value.trim();
  }

  // Validamos antes de enviar
  const errores = validarFormulario(datos);
  if (Object.keys(errores).length > 0) {
    mostrarErrores(formulario, errores);
    return;
  }

  // Si hay ID estamos editando (PUT), si no, registrando (POST)
  const id = formulario.elements.id.value;
  const respuesta = await fetch(id ? `/api/medicos/${id}` : "/api/medicos", {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    // El servidor encontró errores (por ejemplo, documento repetido)
    mostrarErrores(formulario, resultado.errores || {});
    return;
  }

  modal.close();
  mostrarMensaje(resultado.mensaje, "exito");
  cargarMedicos();
});

// ---------- 5. ELIMINAR ----------
async function eliminarMedico(id) {
  const medico = listaMedicos.find((m) => m.id === id);
  const confirmar = confirm(`¿Seguro que deseas eliminar a ${medico.nombre}?`);
  if (!confirmar) return;

  const respuesta = await fetch(`/api/medicos/${id}`, { method: "DELETE" });
  const resultado = await respuesta.json();

  mostrarMensaje(resultado.mensaje, respuesta.ok ? "exito" : "error");
  if (respuesta.ok) cargarMedicos();
}

// Al abrir la página, cargamos la tabla
cargarMedicos();
