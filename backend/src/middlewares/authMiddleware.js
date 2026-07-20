import jwt from 'jsonwebtoken';
import { UnauthorizatedError, ForbbidenError } from '../utils/errors.js';

export function auth(req, res, next) {
  const token = extractToken(req);

  if (!token) return next(new UnauthorizatedError('Token não fornecido'));

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return next(new UnauthorizatedError('Token inválido ou expirado'));
  }
}

export function authOpcional(req, res, next) {
  const token = extractToken(req);

  if (!token) return next();

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    // token inválido em rota opcional: segue sem usuário autenticado
  }

  next();
}

function extractToken(req) {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) return null;

  return header.split(' ')[1];
}

export function adminOnly(req, res, next) {
  if (req.usuario?.eAdmin !== true) return next(new ForbbidenError());

  next();
}
