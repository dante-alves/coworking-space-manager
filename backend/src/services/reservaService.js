import prisma from "../config/prisma.js";
import { AppError, ConflictError, NotFoundError, ValidationError } from "../utils/errors.js";
import { validarPrazoReserva } from "../utils/turnoValido.js";

// select reutilizável
const selectReserva = {
  id: true,
  dia: true,
  turno: true,
  status: true,
  dtCriacao: true,
  idUsuario: true,
  idSala: true,
};

const selectUsuario = {
  id: true,
  nome: true,
  email: true,
  telefone: true,
  cpf: true,
  eAdmin: true,
  isActive: true,
  dtCriacao: true,
};

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

    const { dia, turno, idUsuario, idSala } = dados;
    
    const diaDate = new Date(`${dia}T00:00:00.000Z`);
    try {
        
        // verificar se dia ou turno da reserva estão no prazo válido (não estão no passado)
        validarPrazoReserva(dia, turno);

        // verificar se já tem reserva no turno
        const reservaExistente = await prisma.reserva.findFirst({
            where: {
                idSala,
                dia: diaDate,
                turno,
                status: 'confirmada',
            },
            select: { id: true },
        })

        if (reservaExistente) {
            throw new ConflictError("Turno já foi reservado.");
        }

        // verificar se o usuário vinculado existe
        const usuario = await prisma.usuario.findUnique({
            where: { id: idUsuario },
            select: selectUsuario,
        });
    
        if (!usuario || !usuario.isActive) {
            throw new NotFoundError("Usuário não encontrado.");
        }
        
        // verificar se a sala vinculada existe
        const sala = await prisma.sala.findUnique({
            where: { id: idSala },
            select: selectSala,
        });
    
        if (!sala) {
            throw new NotFoundError("Sala não encontrada.");
        }
    
        if (!sala.isActive) {
            throw new NotFoundError("Sala desativada.");
        }

        // criar a reserva
        const reserva = await prisma.reserva.create({
            data: {
                dia: diaDate,
                turno,
                idUsuario,
                idSala,
            },
            include: {
                usuario: { select: selectUsuario },
                sala: true,
            }
        });


        return reserva;

    } catch (erro) {
        if (erro instanceof AppError) throw erro;
        if (erro.code === 'P2002') {
            throw new ConflictError("Turno já foi reservado.");
        }

        throw erro;
    }
}

// READ -> admin -> filtrar por id do usuário ou por id da sala
// cliente só vê as próprias reservas
async function listar(dados) {
    
    const { idUsuario, idSala, dia, solicitanteEhAdmin, idSolicitante, } = dados;

    // criar uma query
    const where = {
        status: 'confirmada',
    };

    if (solicitanteEhAdmin) {
        if (idUsuario) where.idUsuario = idUsuario;
        if (idSala) where.idSala = idSala;
        if (dia) where.dia = new Date(`${dia}T00:00:00.000Z`);
    } else {
        where.idUsuario = idSolicitante;
    }

    const reservas = await prisma.reserva.findMany({
        where,
        select: {
            id: true,
            idSala: true,
            dia: true,
            turno: true,
            sala: { select: { nome: true } },
        },
        orderBy: [{ dia: 'asc' }, { turno: 'asc' }],
    })

    return reservas.map((r) => ({
        id: r.id,
        idSala: r.idSala,
        nomeSala: r.sala.nome,
        dia: r.dia,
        turno: r.turno
    }));
}

// UPDATE -> não vou fazer por enquanto

// DELETE (soft delete)
async function deletar(id, solicitante) {
    
    try {
        const reserva = await prisma.reserva.findUnique({
            where: { id },
            select: { id: true, idUsuario: true, status: true },
          });

          if (!reserva || reserva.status !== 'confirmada') {
            throw new NotFoundError('Reserva não encontrada');
        }

        if (!solicitante.eAdmin && reserva.idUsuario !== solicitante.id) {
            throw new ForbbiddenError('Você não tem permissão para deletar esta reserva');
        }

        await prisma.reserva.update({
            where: { id },
            data: { status: 'cancelada' },
        });

    } catch(erro) {
        if (erro.code === 'P2025') {
            throw new NotFoundError('Reserva não encontrada');
        }

        throw erro;
    }
}
export default { criar, listar, deletar };