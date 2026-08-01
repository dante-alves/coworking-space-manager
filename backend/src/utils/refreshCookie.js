const NOME = 'refreshToken';
const TTL_MS = Number(process.env.REFRESH_TOKEN_TTL_SECONDS ?? 604800) * 1000;
const isProd = process.env.NODE_ENV === 'production';

const opcoesCookie = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax',
  path: '/',
};

export function definirRefreshCookie(res, token) {
  res.cookie(NOME, token, {
    ...opcoesCookie,
    maxAge: TTL_MS,
  });
}

export function limparRefreshCookie(res) {
  res.clearCookie(NOME, opcoesCookie);
}

export function obterRefreshCookie(req) {
  return req.cookies?.[NOME] ?? null;
}
