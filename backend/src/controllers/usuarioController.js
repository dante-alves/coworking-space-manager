import usuarioService from '../services/usuarioService.js';
import { ForbbidenError } from '../utils/errors.js';
import { gerarToken } from '../utils/jwt.js';

export async function criar(req, res, next) {
  try {
    const dados = req.body;

    const solicitanteEhAdmin = req.usuario?.eAdmin === true;
    const eAdminDesejado = dados.eAdmin;

    const usuarioCriado = await usuarioService.criar(dados, solicitanteEhAdmin, eAdminDesejado);

    if (!solicitanteEhAdmin) {
      const payload = {
        id: usuarioCriado.id,
        eAdmin: usuarioCriado.eAdmin,
      };

      const token = gerarToken(payload);
      
      return res.status(201).json({
        sucesso: true,
        usuario: usuarioCriado,
        accessToken: token,
      });
    }

    return res.status(201).json({
      sucesso: true,
      usuario: usuarioCriado,
    });
  } catch (erro) {
    next(erro);
  }
}

export async function login(req, res, next) {

  try {
    const dados = req.body;

    const usuario = await usuarioService.login(dados);

    const payload = {
      id: usuario.id,
      eAdmin: usuario.eAdmin
    }
    
    const token = gerarToken(payload);

    return res.status(200).json({
      sucesso: true,
      usuario: usuario,
      accessToken: token,
    });
  } catch (erro) {
    next(erro);
  }

}

export async function listar(req, res, next) {
  try {

    const { pagina, busca } = req.validatedQuery; // já vem formatado graças ao validate.js
    
    /* Antes do validate.js era assim:

    const pagina = req.query.pagina;
    const busca = req.query.busca;
    */
    const {usuarios, paginacao} = await usuarioService.listar(pagina, busca);

    return res.status(200).json({
      sucesso: true,
      usuarios: usuarios,
      paginacao: paginacao,
    });
  } catch(erro) {
    next(erro);
  }
}


export async function atualizar(req, res, next) {
  try {
    const { id } = req.params;
    const solicitante = req.usuario;

    if (!solicitante.eAdmin && Number(solicitante.id) !== Number(id)) {
      throw new ForbbidenError();
    }

    const usuarioAtualizado = await usuarioService.atualizar(id, req.body);

    return res.status(200).json({
      sucesso: true,
      usuario: usuarioAtualizado,
    });
  } catch (erro) {
    next(erro);
  }
}

export async function deletar(req, res, next) {
  try {
    const { id } = req.params;
    const solicitante = req.usuario;
    const idAlvo = Number(id);
    const idSolicitante = Number(solicitante.id);

    const eProprioId = idAlvo === idSolicitante;

    if (solicitante.eAdmin && eProprioId) {
        throw new ForbbidenError('Admin não pode desativar a própria conta por aqui');
      
    } 
    
    if (!solicitante.eAdmin && !eProprioId) {
      throw new ForbbidenError();
    }

    const resultado = await usuarioService.deletar(idAlvo);

    return res.status(200).json({
      sucesso: true,
      reservasCanceladas: resultado.reservasCanceladas,
    });
  } catch (erro) {
    next(erro);
  }
}


export async function getById(req, res, next) {
  try {

    const { id } = req.params;
    
    const usuario = await usuarioService.getById(id);
    
    return res.status(200).json({
      sucesso: true,
      usuario: usuario,
    });
  } catch(erro) {
    next(erro);
  }
}