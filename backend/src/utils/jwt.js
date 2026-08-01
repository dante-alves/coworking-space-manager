import jwt from 'jsonwebtoken';

const SEGREDO = process.env.JWT_SECRET;
const EXPIRA_EM = process.env.JWT_ACCESS_EXPIRES_IN ?? '15m';

export function gerarAccessToken(payload) {
  return jwt.sign(payload, SEGREDO, { expiresIn: EXPIRA_EM });
}


export function gerarToken(payload) {
  return gerarAccessToken(payload);
}