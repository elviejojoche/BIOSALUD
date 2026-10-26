// Funciones de ayuda que usan varias páginas

// Evita que un texto con etiquetas HTML (por ejemplo "<script>") se ejecute en la página
function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = String(texto);
  return div.innerHTML;
}

// Convierte "2026-10-28" en "28 oct 2026"
function formatearFecha(fecha) {
  const [anio, mes, dia] = fecha.split("-");
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${Number(dia)} ${meses[Number(mes) - 1]} ${anio}`;
}

// Devuelve una etiqueta de color según el estado (Activo, Pendiente, Confirmada...)
function etiquetaEstado(estado) {
  const clase = estado.toLowerCase();
  return `<span class="estado estado-${clase}">${escapar(estado)}</span>`;
}

// Muestra un mensaje arriba de la página. tipo: "exito" o "error"
function mostrarMensaje(texto, tipo) {
  const caja = document.getElementById("mensaje");
  caja.textContent = texto;
  caja.className = `alerta alerta-${tipo}`;

  // El mensaje desaparece después de 4 segundos
  clearTimeout(caja.temporizador);
  caja.temporizador = setTimeout(() => (caja.className = "alerta oculto"), 4000);
}

// Muestra el error de cada campo debajo de él. errores = { nombre: "mensaje", ... }
function mostrarErrores(formulario, errores) {
  limpiarErrores(formulario);
  for (const campo in errores) {
    const input = formulario.elements[campo];
    const texto = formulario.querySelector(`[data-error="${campo}"]`);
    if (input) input.classList.add("invalido");
    if (texto) texto.textContent = errores[campo];
  }
}

// Quita todos los errores del formulario
function limpiarErrores(formulario) {
  formulario.querySelectorAll(".invalido").forEach((el) => el.classList.remove("invalido"));
  formulario.querySelectorAll("[data-error]").forEach((el) => (el.textContent = ""));
}
