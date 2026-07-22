import prisma from "../config/prisma.js";
import { ConflictError, NotFoundError, ValidationError } from "../utils/errors.js";
import { turnoAindaReservavel } from "../utils/turnoValido.js";


// select reutilizável
const selectSala = {
    id: true,
    nome: true,
    capacidade: true,
    descricao: true,
    precoLocacao: true,
    isActive:  true,
    dtCriacao: true,
    dtAtualizacao: true,
};

// CREATE

async function criar(dados) {

    const { nome, capacidade, descricao, precoLocacao } = dados;

    try {
        const sala = await prisma.sala.create({
            data: {
                nome,
                capacidade,
                descricao,
                precoLocacao,
            },
            select: selectSala,
        });

        return sala;
    } catch(erro) {
        if (erro.code === 'P2002') {
            throw new ConflictError("Já existe uma sala com esse nome.");
        }

        throw erro;
    }
}

// READ
async function listar(dia, turno, solicitanteEhAdmin) {
    
    if (!dia) {
        if (!solicitanteEhAdmin){
            throw new ValidationError("Informe o dia para listar salas disponíveis");
        }

        return listarAdmin();
    }

    return listarDisponiveis(dia, turno);
}

async function listarAdmin() {
    const salas = await prisma.sala.findMany({
        select: selectSala,
        orderBy: { id: 'asc' },
    });

    return salas;
}

const TURNOS = ['M', 'T', 'N'];

function statusTurno(dia, t, ocupados) {
    if (ocupados.has(t)) return 'ocupado'; // se o turno já está ocupado

    if (!turnoAindaReservavel(dia, t)) return 'indisponivel'; // se o turno já passou do horário de reserva, retorna 'indisponivel'
    return 'disponivel'; // se o turno ainda está disponível, retorna 'disponivel'
}

async function listarDisponiveis(dia, turno) {

    // dia vem do Zod como "YYYY-MM-DD"
    const diaDate = new Date(`${dia}T00:00:00.000Z`);

    // pegar salas ativas
    const salas = await prisma.sala.findMany({
        where: { isActive: true },
        select: selectSala,
        orderBy: { id: 'asc' },
    })

    // reservas confirmadas do dia
    const reservas = await prisma.reserva.findMany({
        where: {
            dia: diaDate,
            status: 'confirmada',
        },
        select: { // esse select vai ser usado no próx passo de ocupacaoPorSala
            idSala: true,
            turno: true,
        },
    });

    /* Map() com chave idSala tendo como valor Set() contendo turnos ocupados
        ocupacaoPorSala {
            1 => Set {'M', 'T'},
            2 => Set {'N'}
        }
    */

    const ocupacaoPorSala = new Map();

    // pega reserva por reserva das reservas confirmadas do dia
    for (const reserva of reservas) { 
        if (!ocupacaoPorSala.has(reserva.idSala)) { // se o Map ainda não tem aquele id
            ocupacaoPorSala.set(reserva.idSala, new Set()); // adiciona o idSala ao Map com um Set() zerado
        }

        ocupacaoPorSala.get(reserva.idSala).add(reserva.turno); // adiciona o turno ao Set() referente aquele idSala que já está registrado no Map
    }

    // montar status por sala
    const salaComStatus = salas.map((sala) => {
        const ocupados = ocupacaoPorSala.get(sala.id) ?? new Set();

        const turnos =  {
            M: statusTurno(dia, 'M', ocupados),
            T: statusTurno(dia, 'T', ocupados),
            N: statusTurno(dia, 'N', ocupados),
        };

        const totalmenteReservada = TURNOS.every((t) => ocupados.has(t)); // verifica se ocupados está com manhã, tarde e noite reservadas -> se estiver, totalmenteReservada recebe true.

        return {
            ...sala,
            turnos,
            totalmenteReservada,
        };
    });

    // filtra por salas livres no turno selecionado
    if (turno) {
        return salaComStatus.filter((sala) => {
            const ocupados = ocupacaoPorSala.get(sala.id) ?? new Set();
            return !ocupados.has(turno);
        })
    }

    return salaComStatus;
}
// UPDATE
// endpoint pode ser utilizado para reativar sala -> isActive = true
async function atualizar(id, dados) {

    try {
        // impedir que admin desative sala pelo endpoint de atualizar
        if (dados.isActive === false) {
            throw new ValidationError('Use DELETE /salas/:id para desativar uma sala.');
        }
        // verificar se é possível reativar a sala -> sala existe e está inativa
        if (dados.isActive === true) {
            const salaBuscada = await prisma.sala.findUnique({
                where: { id },
                select: { isActive: true },
            })

            if (!salaBuscada) throw new NotFoundError("Sala não encontrada");

            if (salaBuscada.isActive) throw new ValidationError("Sala já está ativa");
        }

        const sala = await prisma.sala.update({
            where: { id: id },
            data: dados, // isActive vem opcional nos dados, então se tiver, ele atualiza.
            select: selectSala,
        });

        return sala;
    } catch(erro) {
        if (erro.code === 'P2025') {
            throw new NotFoundError('Sala não encontrada');
        }

        if (erro.code === 'P2002') {
            throw new ConflictError('Já existe uma sala com esse nome.');
        }
        throw erro;
    }

}
// DELETE (soft delete)
async function deletar(id) {

    try {
        const sala = await prisma.sala.findUnique({
            where: { id },
            select: { id: true, isActive: true},
        });

        if (!sala || !sala.isActive) {
            throw new NotFoundError('Sala não encontrada');
        }

        return await prisma.$transaction(async (tx) => {
            const hoje = new Date();
            hoje.setUTCHours(0, 0, 0, 0);

            const { count } = await tx.reserva.updateMany({
                where: {
                    idSala: id,
                    status: 'confirmada',
                    dia: { gte: hoje },
                },
                data: { status: 'cancelada' },
            });

            await tx.sala.update({
                where: { id },
                data: { isActive: false },
            });

            return { reservasCanceladas: count };
        });
    } catch (erro) {
        if (erro instanceof NotFoundError) throw erro;

        if (erro.code === 'P2025') {
            throw new NotFoundError('Sala não encontrada');
        }

        throw erro;
    }
}

export default { criar, listar, atualizar, deletar };