import usuarioService from '../services/usuarioService.js';
import refreshTokenService from '../services/refreshTokenService.js';
import { ForbbidenError, UnauthorizatedError } from '../utils/errors.js';
import { gerarAccessToken } from '../utils/jwt.js';
import {
  definirRefreshCookie,
  limparRefreshCookie,
  obterRefreshCookie,
} from '../utils/refreshCookie.js';

async function emitirTokens(res, usuario) {
  const accessToken = gerarAccessToken({
    id: usuario.id,
    eAdmin: usuario.eAdmin,
  });

  const refreshToken = await refreshTokenService.criar(usuario.id);
  definirRefreshCookie(res, refreshToken);

  return { accessToken };
}

export async function criar(req, res, next) {
  try {
    const dados = req.body;

    const solicitanteEhAdmin = req.usuario?.eAdmin === true;
    const eAdminDesejado = dados.eAdmin;

    const usuarioCriado = await usuarioService.criar(dados, solicitanteEhAdmin, eAdminDesejado);

    if (!solicitanteEhAdmin) {
      const { accessToken } = await emitirTokens(res, usuarioCriado);

      return res.status(201).json({
        sucesso: true,
        usuario: usuarioCriado,
        accessToken,
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
    const { accessToken } = await emitirTokens(res, usuario);

    return res.status(200).json({
      sucesso: true,
      usuario,
      accessToken,
    });
  } catch (erro) {
    next(erro);
  }
}

export async function logout(req, res, next) {
  try {
    const refreshToken = obterRefreshCookie(req);

    if (refreshToken) {
      await refreshTokenService.revogar(refreshToken);
    }

    limparRefreshCookie(res);

    return res.status(200).json({ sucesso: true });
  } catch (erro) {
    next(erro);
  }
}

export async function refresh(req, res, next) {
  try {
    const refreshToken = obterRefreshCookie(req);

    if (!refreshToken) {
      throw new UnauthorizatedError('Refresh token inválido ou expirado.');
    }

    const idUsuario = await refreshTokenService.validar(refreshToken);

    if (!idUsuario) {
      throw new UnauthorizatedError('Refresh token inválido ou expirado.');
    }

    const usuario = await usuarioService.getById(idUsuario);

    if (!usuario.isActive) {
      await refreshTokenService.revogar(refreshToken);
      limparRefreshCookie(res);
      throw new UnauthorizatedError('Refresh token inválido ou expirado.');
    }

    const novoRefresh = await refreshTokenService.rotacionar(refreshToken, idUsuario);
    definirRefreshCookie(res, novoRefresh);

    const accessToken = gerarAccessToken({
      id: usuario.id,
      eAdmin: usuario.eAdmin,
    });

    return res.status(200).json({
      sucesso: true,
      accessToken,
    });
  } catch (erro) {
    next(erro);
  }
}

export async function listar(req, res, next) {
  try {
    const { pagina, busca, clientes } = req.validatedQuery;
    const { usuarios, paginacao } = await usuarioService.listar(
      pagina,
      busca,
      clientes ?? false
    );

    return res.status(200).json({
      sucesso: true,
      usuarios,
      paginacao,
    });
  } catch (erro) {
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
    const solicitante = req.usuario;

    if (!solicitante.eAdmin && Number(solicitante.id) !== Number(id)) {
      throw new ForbbidenError();
    }

    const usuario = await usuarioService.getById(id);

    return res.status(200).json({
      sucesso: true,
      usuario,
    });
  } catch (erro) {
    next(erro);
  }
}
