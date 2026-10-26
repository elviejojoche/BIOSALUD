// JavaScript de la página de Pacientes: listar, buscar, registrar, editar y eliminar

const tabla = document.getElementById("tabla-pacientes");
const buscador = document.getElementById("buscador");
const modal = document.getElementById("modal");
const formulario = document.getElementById("formulario");
const tituloFormulario = document.getElementById("titulo-formulario");

// Guardamos la lista para poder llenar el formulario al editar
let listaPacientes = [];

// ---------- 1. LISTAR Y BUSCAR ----------
async function cargarPacientes() {
  const texto = buscador.value;
  const respuesta = await fetch(`/api/pacientes?buscar=${encodeURIComponent(texto)}`);
  listaPacientes = await respuesta.json();
  mostrarTabla();
}

function mostrarTabla() {
  if (listaPacientes.length === 0) {
    tabla.innerHTML = `<tr><td colspan="9" class="vacio">No se encontraron pacientes</td></tr>`;
    return;
  }

  tabla.innerHTML = listaPacientes
    .map(
      (p) => `
      <tr>
        <td>${p.id}</td>
        <td>${escapar(p.nombre)}</td>
        <td>${escapar(p.apellido)}</td>
        <td>${escapar(p.documento)}</td>
        <td>${escapar(p.telefono)}</td>
        <td>${escapar(p.correo)}</td>
        <td>${escapar(p.eps)}</td>
        <td>${etiquetaEstado(p.estado)}</td>
        <td class="acciones">
          <button class="btn-accion editar" onclick="abrirEditar(${p.id})">Editar</button>
          <button class="btn-accion eliminar" onclick="eliminarPaciente(${p.id})">Eliminar</button>
        </td>
      </tr>`
    )
    .join("");
}

// Cada vez que se escribe en el buscador, se vuelve a cargar la tabla
buscador.addEventListener("input", cargarPacientes);

// ---------- 2. ABRIR EL FORMULARIO ----------
document.getElementById("btn-nuevo").addEventListener("click", () => {
  formulario.reset();
  limpiarErrores(formulario);
  formulario.elements.id.value = "";
  tituloFormulario.textContent = "Nuevo paciente";
  modal.showModal();
});

function abrirEditar(id) {
  const paciente = listaPacientes.find((p) => p.id === id);
  limpiarErrores(formulario);
  tituloFormulario.textContent = "Editar paciente";

  // Llenamos el formulario con los datos actuales
  for (const campo of ["id", "nombre", "apellido", "documento", "telefono", "correo", "eps", "estado"]) {
    formulario.elements[campo].value = paciente[campo];
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
  if (datos.apellido === "") errores.apellido = "El apellido es obligatorio.";

  if (datos.documento === "") errores.documento = "El documento es obligatorio.";
  else if (!soloNumeros.test(datos.documento)) errores.documento = "El documento solo debe contener números.";

  if (datos.telefono === "") errores.telefono = "El teléfono es obligatorio.";
  else if (!soloNumeros.test(datos.telefono) || datos.telefono.length < 7)
    errores.telefono = "El teléfono debe tener al menos 7 números.";

  if (datos.correo === "") errores.correo = "El correo es obligatorio.";
  else if (!correoValido.test(datos.correo))
    errores.correo = "El correo no tiene un formato válido (ejemplo: nombre@correo.com).";

  if (datos.eps === "") errores.eps = "Debe seleccionar una EPS.";

  return errores;
}

// ---------- 4. GUARDAR (REGISTRAR O EDITAR) ----------
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault(); // evita que la página se recargue

  // Leemos los datos del formulario
  const datos = {};
  for (const campo of ["nombre", "apellido", "documento", "telefono", "correo", "eps", "estado"]) {
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
  const respuesta = await fetch(id ? `/api/pacientes/${id}` : "/api/pacientes", {
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
  cargarPacientes();
});

// ---------- 5. ELIMINAR ----------
async function eliminarPaciente(id) {
  const paciente = listaPacientes.find((p) => p.id === id);
  const confirmar = confirm(`¿Seguro que deseas eliminar a ${paciente.nombre} ${paciente.apellido}?`);
  if (!confirmar) return;

  const respuesta = await fetch(`/api/pacientes/${id}`, { method: "DELETE" });
  const resultado = await respuesta.json();

  mostrarMensaje(resultado.mensaje, respuesta.ok ? "exito" : "error");
  if (respuesta.ok) cargarPacientes();
}

// Al abrir la página, cargamos la tabla
cargarPacientes();
