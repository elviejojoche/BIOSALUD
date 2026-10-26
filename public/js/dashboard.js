// JavaScript del Dashboard: pide los datos al servidor y los muestra en la página

async function cargarDashboard() {
  try {
    // 1. Pedimos los datos a nuestra API
    const respuesta = await fetch("/api/dashboard");
    const datos = await respuesta.json();

    // 2. Llenamos las tarjetas de totales
    document.getElementById("total-pacientes").textContent = datos.totales.pacientes;
    document.getElementById("total-medicos").textContent = datos.totales.medicos;
    document.getElementById("total-programadas").textContent = datos.totales.citasProgramadas;
    document.getElementById("total-pendientes").textContent = datos.totales.citasPendientes;

    // 3. Llenamos la tabla de próximas citas
    const tabla = document.getElementById("tabla-proximas-citas");
    if (datos.proximasCitas.length === 0) {
      tabla.innerHTML = `<tr><td colspan="5" class="vacio">No hay citas programadas</td></tr>`;
    } else {
      tabla.innerHTML = datos.proximasCitas
        .map(
          (cita) => `
          <tr>
            <td>${escapar(cita.paciente)}</td>
            <td>${escapar(cita.medico)}</td>
            <td>${formatearFecha(cita.fecha)}</td>
            <td>${escapar(cita.hora)}</td>
            <td>${etiquetaEstado(cita.estado)}</td>
          </tr>`
        )
        .join("");
    }

    // 4. Llenamos la lista de pacientes recientes
    const lista = document.getElementById("lista-pacientes-recientes");
    lista.innerHTML = datos.pacientesRecientes
      .map(
        (p) => `
        <li>
          <span class="avatar">${escapar(p.nombre[0] + p.apellido[0])}</span>
          <div>
            <strong>${escapar(p.nombre + " " + p.apellido)}</strong>
            <small>${escapar(p.eps)} · Doc. ${escapar(p.documento)}</small>
          </div>
          ${etiquetaEstado(p.estado)}
        </li>`
      )
      .join("");
  } catch (error) {
    console.error(error);
    alert("No se pudieron cargar los datos del dashboard.");
  }
}

// Cuando la página carga, ejecutamos la función
cargarDashboard();
