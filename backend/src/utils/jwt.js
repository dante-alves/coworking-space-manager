import jwt from 'jsonwebtoken';

const SEGREDO = process.env.JWT_SECRET;
const EXPIRA_EM = '2h';

export function gerarToken(payload) {
  return jwt.sign(payload, SEGREDO, { expiresIn: EXPIRA_EM });
}
