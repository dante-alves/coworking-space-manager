import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import { ConflictError, NotFoundError, UnauthorizatedError } from '../utils/errors.js';

// select reutilizável
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

// CREATE
async function criar(dados, solicitanteEhAdmin, eAdminDesejado) {
  const { nome, email, senha, telefone, cpf, endereco } = dados;

  const eAdmin = solicitanteEhAdmin ? Boolean(eAdminDesejado) : false;

  const senhaHash = await bcrypt.hash(senha, 10);

  try {
    const usuario = await prisma.$transaction(async (tx) => {
      const enderecoCriado = await tx.endereco.create({
        data: {
          rua: endereco.rua,
          numero: endereco.numero,
          complemento: endereco.complemento,
          bairro: endereco.bairro,
          cep: endereco.cep,
          cidade: endereco.cidade,
          uf: endereco.uf,
        },
      });

      const usuarioCriado = await tx.usuario.create({
        data: {
          nome,
          email,
          senha: senhaHash,
          telefone,
          cpf,
          eAdmin,
          idEndereco: enderecoCriado.id,
        },
        select: selectUsuario,
      });

      return usuarioCriado;
    });

    return usuario;
  } catch (erro) {
    if (erro.code === 'P2002') {
      const campo = erro.meta?.target?.[0];

      if (campo === 'email') {
        throw new ConflictError('Este email já está cadastrado');
      }

      if (campo === 'cpf') {
        throw new ConflictError('Este CPF já está cadastrado');
      }

      throw new ConflictError('Dado já cadastrado');
    }

    throw erro;
  }
}


// LOGIN
async function login(dados) {

  const { email, senha } = dados;

  try {

    const usuarioComSenha = await prisma.usuario.findUnique({
      where: { email },
      select: { 
        ...selectUsuario, 
        senha: true 
      },
    });

    
    if (!usuarioComSenha) { // Uusário não encontrado
      throw new UnauthorizatedError("Email ou senha inválidos.");
    }
    
    // verificar se usuário está ativo
    if (!usuarioComSenha.isActive) {
      throw new UnauthorizatedError("Email ou senha inválidos.");
    }
    const { senha: senhaHash, ...usuario } = usuarioComSenha; 

    // comparar a senha com o hash armazenado no banco
    const isPasswordValid = await bcrypt.compare(senha, senhaHash);

    if (!isPasswordValid) {
      throw new UnauthorizatedError("Email ou senha inválidos.");
    }

    return usuario;

  } catch (erro) {
    throw erro;
  }
}

// auxiliares para listar usuários (paginação e filtro de busca)
const tamanhoPag = 30;

function filtroBusca(busca) {

  const buscaLimpa = busca?.trim();

  if (!buscaLimpa) return {};

  const cpfLimpo = busca.replace(/\D/g, '') // limpando os . ou - do CPF

  // busca por email, nome ou CPF
  return {
    OR: [
      { nome: { contains: buscaLimpa, mode: 'insensitive' } },
      { email: { contains: buscaLimpa, mode: 'insensitive' } },
      ...(cpfLimpo ? [{ cpf: cpfLimpo }] : []),
    ],
  };
}


// READ
async function listar(pagina = 1, busca = '') {

  // paginação
  const paginaAtual = Math.max(Number(pagina) || 1, 1);
  const limit = tamanhoPag || 30;
  const skip = (paginaAtual - 1) * limit;

  const [usuarios, totalUsuarios] = await Promise.all([
    prisma.usuario.findMany({
      where: filtroBusca(busca),
      select: selectUsuario,
      skip,
      take: limit,
      orderBy: { id: 'asc' },
    }),
    prisma.usuario.count({ where: filtroBusca(busca) }),
  ]);

  return {
    usuarios,
    paginacao: {
      pagina: paginaAtual,
      porPagina: limit,
      total: totalUsuarios,
      totalPaginas: Math.ceil(totalUsuarios / limit),
    },
  };
}


// UPDATE
async function atualizar(id, dados) {

  // const { nome, telefone } = dados; antes fazia assim, mas o ZOD já vai mandar dados filtrado com { nome } ou { telefone } ou { nome, telefone }
  try{

    const usuario = await prisma.usuario.update({
      where: { id: id },
      data: dados,
      select: selectUsuario,
    });
    
    return usuario;

  } catch(erro) {
    if (erro.code === 'P2025') {
      throw new NotFoundError('Usuário não encontrado');
    }

    throw erro;
  }
}


// DELETE (soft delete — desativar conta)
async function deletar(id) {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      select: { id: true, isActive: true },
    });

    if (!usuario || !usuario.isActive) {
      throw new NotFoundError('Usuário não encontrado');
    }

    return await prisma.$transaction(async (tx) => {
      const hoje = new Date();
      hoje.setUTCHours(0, 0, 0, 0);

      const { count } = await tx.reserva.updateMany({
        where: {
          idUsuario: id,
          status: 'confirmada',
          dia: { gte: hoje },
        },
        data: { status: 'cancelada' },
      });

      await tx.usuario.update({
        where: { id },
        data: { isActive: false },
      });

      return { reservasCanceladas: count };
    });
  } catch (erro) {

    if (erro instanceof NotFoundError) throw erro;

    if (erro.code === 'P2025') {
      throw new NotFoundError('Usuário não encontrado');
    }

    throw erro;
  }
}


// GET BY ID
async function getById(id) {
  
  try {

    const usuario = await prisma.usuario.findUniqueOrThrow({
      where: { 
        id: id, 
      },
      select: selectUsuario,
    });

    return usuario;

  } catch (erro) {
    if (erro.code === 'P2025') {
      throw new NotFoundError('Usuário não encontrado');
    }

    throw erro;
  }
}

export default { criar, login, listar, atualizar, deletar, getById };
