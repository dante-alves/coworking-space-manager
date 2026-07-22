import { ValidationError } from "./errors.js";

const PRAZO_MINUTOS = {
    M: 11 * 60 + 59, // 11:59 -> última hora que o turno pode ser reservado
    T: 17 * 60 + 59, // 17:59
    N: 23 * 60 + 59, // 23:59
};

const FUSO = 'America/Sao_Paulo';

function diaNoFuso(date = new Date()) {
    return date.toLocaleDateString('en-CA', { timeZone: FUSO });
}

function minutosNoFuso(date = new Date()) {
    const formatador = new Intl.DateTimeFormat('pt-BR', {
        timeZone: FUSO,
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    })

    const parts = formatador.formatToParts(date);
    const hora = Number(parts.find(part => part.type === 'hour').value);
    const minuto = Number(parts.find(part => part.type === 'minute').value);
    return hora * 60 + minuto;
}

export function validarPrazoReserva(dia, turno) {
    
    const hoje = diaNoFuso();

    if (dia > hoje) return;
    if (dia < hoje) throw new ValidationError('Não é possível reservar sala no passado.');

    const agora = minutosNoFuso();
    const prazo = PRAZO_MINUTOS[turno];

    if (agora > prazo) {
        const labels = { M: 'manhã', T: 'tarde', N: 'noite' };
        throw new ValidationError(`Não é mais possível reservar o turno da ${labels[turno]} para hoje.`);
    }
}

// para mostrar só turnos reserváveis no listarDisponiveis 
export function turnoAindaReservavel(dia, turno) {
    const hoje = diaNoFuso();

    if (dia > hoje) return true;
    if (dia < hoje) return false;

    const agora = minutosNoFuso();

    return agora <= PRAZO_MINUTOS[turno]; // se agora for menor ou igual ao prazo, o turno está disponível
}