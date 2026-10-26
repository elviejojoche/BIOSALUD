// JavaScript de la página de Citas: listar, filtrar, registrar, editar y eliminar

const tabla = document.getElementById("tabla-citas");
const buscador = document.getElementById("buscador");
const filtroEstado = document.getElementById("filtro-estado");
const modal = document.getElementById("modal");
const formulario = document.getElementById("formulario");
const tituloFormulario = document.getElementById("titulo-formulario");

// Campos del formulario (sin el ID)
const CAMPOS = ["pacienteId", "medicoId", "fecha", "hora", "motivo", "estado"];

// Guardamos la lista para poder llenar el formulario al editar
let listaCitas = [];

// Fecha de hoy en formato AAAA-MM-DD (para no permitir fechas pasadas)
function fechaDeHoy() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

// ---------- 1. CARGAR PACIENTES Y MÉDICOS EN LOS SELECT ----------
async function cargarOpciones() {
  const pacientes = await (await fetch("/api/pacientes")).json();
  const medicos = await (await fetch("/api/medicos")).json();

  formulario.elements.pacienteId.innerHTML =
    `<option value="">-- Seleccione --</option>` +
    pacientes
      .map((p) => `<option value="${p.id}">${escapar(p.nombre + " " + p.apellido)} · ${escapar(p.documento)}</option>`)
      .join("");

  // Solo los médicos activos pueden recibir citas
  formulario.elements.medicoId.innerHTML =
    `<option value="">-- Seleccione --</option>` +
    medicos
      .filter((m) => m.estado === "Activo")
      .map((m) => `<option value="${m.id}">${escapar(m.nombre)} · ${escapar(m.especialidad)}</option>`)
      .join("");
}

// ---------- 2. LISTAR Y FILTRAR ----------
async function cargarCitas() {
  const buscar = encodeURIComponent(buscador.value);
  const estado = encodeURIComponent(filtroEstado.value);
  const respuesta = await fetch(`/api/citas?buscar=${buscar}&estado=${estado}`);
  listaCitas = await respuesta.json();
  mostrarTabla();
}

function mostrarTabla() {
  if (listaCitas.length === 0) {
    tabla.innerHTML = `<tr><td colspan="8" class="vacio">No se encontraron citas</td></tr>`;
    return;
  }

  tabla.innerHTML = listaCitas
    .map(
      (c) => `
      <tr>
        <td>${c.id}</td>
        <td>${escapar(c.paciente)}</td>
        <td>${escapar(c.medico)}<br><small class="texto-suave">${escapar(c.especialidad)}</small></td>
        <td>${formatearFecha(c.fecha)}</td>
        <td>${escapar(c.hora)}</td>
        <td>${escapar(c.motivo)}</td>
        <td>${etiquetaEstado(c.estado)}</td>
        <td class="acciones">
          <button class="btn-accion editar" onclick="abrirEditar(${c.id})">Editar</button>
          <button class="btn-accion eliminar" onclick="eliminarCita(${c.id})">Eliminar</button>
        </td>
      </tr>`
    )
    .join("");
}

buscador.addEventListener("input", cargarCitas);
filtroEstado.addEventListener("change", cargarCitas);

// ---------- 3. ABRIR EL FORMULARIO ----------
document.getElementById("btn-nueva").addEventListener("click", () => {
  formulario.reset();
  limpiarErrores(formulario);
  formulario.elements.id.value = "";
  formulario.elements.fecha.min = fechaDeHoy(); // el calendario no deja elegir días pasados
  tituloFormulario.textContent = "Nueva cita";
  modal.showModal();
});

function abrirEditar(id) {
  const cita = listaCitas.find((c) => c.id === id);
  limpiarErrores(formulario);
  formulario.elements.fecha.min = ""; // al editar se permiten citas pasadas (ej: marcar "Atendida")
  tituloFormulario.textContent = "Editar cita";

  // Llenamos el formulario con los datos actuales
  formulario.elements.id.value = cita.id;
  for (const campo of CAMPOS) {
    formulario.elements[campo].value = cita[campo];
  }
  modal.showModal();
}

document.getElementById("btn-cancelar").addEventListener("click", () => modal.close());

// ---------- 4. VALIDAR EN EL NAVEGADOR ----------
// (el servidor vuelve a validar por seguridad)
function validarFormulario(datos, esNueva) {
  const errores = {};

  if (datos.pacienteId === "") errores.pacienteId = "Debe seleccionar un paciente.";
  if (datos.medicoId === "") errores.medicoId = "Debe seleccionar un médico.";

  if (datos.fecha === "") errores.fecha = "La fecha es obligatoria.";
  else if (esNueva && datos.fecha < fechaDeHoy()) errores.fecha = "La fecha no puede ser anterior a hoy.";

  if (datos.hora === "") errores.hora = "La hora es obligatoria.";

  if (datos.motivo === "") errores.motivo = "El motivo es obligatorio.";
  else if (datos.motivo.length < 5) errores.motivo = "Describe el motivo con al menos 5 caracteres.";

  return errores;
}

// ---------- 5. GUARDAR (REGISTRAR O EDITAR) ----------
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault(); // evita que la página se recargue

  // Leemos los datos del formulario
  const datos = {};
  for (const campo of CAMPOS) {
    datos[campo] = formulario.elements[campo].value.trim();
  }

  // Validamos antes de enviar
  const id = formulario.elements.id.value;
  const errores = validarFormulario(datos, !id);
  if (Object.keys(errores).length > 0) {
    mostrarErrores(formulario, errores);
    return;
  }

  // Si hay ID estamos editando (PUT), si no, registrando (POST)
  const respuesta = await fetch(id ? `/api/citas/${id}` : "/api/citas", {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    // El servidor encontró errores (por ejemplo, horario ocupado)
    mostrarErrores(formulario, resultado.errores || {});
    return;
  }

  modal.close();
  mostrarMensaje(resultado.mensaje, "exito");
  cargarCitas();
});

// ---------- 6. ELIMINAR ----------
async function eliminarCita(id) {
  const cita = listaCitas.find((c) => c.id === id);
  const confirmar = confirm(`¿Seguro que deseas eliminar la cita de ${cita.paciente} del ${formatearFecha(cita.fecha)}?`);
  if (!confirmar) return;

  const respuesta = await fetch(`/api/citas/${id}`, { method: "DELETE" });
  const resultado = await respuesta.json();

  mostrarMensaje(resultado.mensaje, respuesta.ok ? "exito" : "error");
  if (respuesta.ok) cargarCitas();
}

// Al abrir la página, cargamos las opciones y la tabla
cargarOpciones();
cargarCitas();
