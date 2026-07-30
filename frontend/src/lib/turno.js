const PRAZO_MINUTOS = {
  M: 11 * 60 + 59,
  T: 17 * 60 + 59,
  N: 23 * 60 + 59,
}

const FUSO = "America/Sao_Paulo"

function diaNoFuso(date = new Date()) {
  return date.toLocaleDateString("en-CA", { timeZone: FUSO })
}

function minutosNoFuso(date = new Date()) {
  const formatador = new Intl.DateTimeFormat("pt-BR", {
    timeZone: FUSO,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })

  const parts = formatador.formatToParts(date)
  const hora = Number(parts.find((part) => part.type === "hour").value)
  const minuto = Number(parts.find((part) => part.type === "minute").value)

  return hora * 60 + minuto
}

function normalizarDiaReserva(dia) {
  if (!dia) return ""
  if (typeof dia === "string") return dia.slice(0, 10)
  return dia.toISOString().slice(0, 10)
}

export function turnoAindaReservavel(dia, turno) {
  const diaNormalizado = normalizarDiaReserva(dia)
  const hoje = diaNoFuso()

  if (diaNormalizado > hoje) return true
  if (diaNormalizado < hoje) return false

  return minutosNoFuso() <= PRAZO_MINUTOS[turno]
}

export function reservaJaPassou(dia, turno) {
  return !turnoAindaReservavel(dia, turno)
}
