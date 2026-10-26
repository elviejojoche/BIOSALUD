// Servicio del Dashboard: calcula los totales y prepara las listas.
// Es el único lugar que lee los datos; al conectar MySQL solo cambiaremos esta parte.
import { pacientes } from "../data/pacientes.data";
import { medicos } from "../data/medicos.data";
import { citas } from "../data/citas.data";

export function obtenerResumen() {
  // Citas que todavía no se han atendido ni cancelado
  const citasProgramadas = citas.filter(
    (c) => c.estado === "Pendiente" || c.estado === "Confirmada"
  );

  // Próximas citas: las programadas, ordenadas por fecha y hora (máximo 5)
  const proximasCitas = [...citasProgramadas]
    .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora))
    .slice(0, 5)
    .map((c) => {
      // Buscamos el nombre del paciente y del médico usando sus IDs
      const paciente = pacientes.find((p) => p.id === c.pacienteId);
      const medico = medicos.find((m) => m.id === c.medicoId);
      return {
        id: c.id,
        paciente: paciente ? `${paciente.nombre} ${paciente.apellido}` : "Desconocido",
        medico: medico ? medico.nombre : "Desconocido",
        fecha: c.fecha,
        hora: c.hora,
        estado: c.estado,
      };
    });

  // Pacientes recientes: los últimos 5 registrados (los de ID más alto)
  const pacientesRecientes = [...pacientes].sort((a, b) => b.id - a.id).slice(0, 5);

  return {
    totales: {
      pacientes: pacientes.length,
      medicos: medicos.length,
      citasProgramadas: citasProgramadas.length,
      citasPendientes: citas.filter((c) => c.estado === "Pendiente").length,
    },
    proximasCitas,
    pacientesRecientes,
  };
}
