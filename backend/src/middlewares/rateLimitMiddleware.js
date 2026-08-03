import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import redis from '../config/redis.js';
import { TooManyRequestsError } from '../utils/errors.js';
// store compartilhado - contador no Redis
function criarStore(prefixo) {
    return new RedisStore({
        sendCommand: (...args) => redis.call(...args),
        prefix: `rl:${prefixo}:`,
    });
}

// resposta no mesmo formato de errorHandler
function handler(req, res, next) {
    next(new TooManyRequestsError());
}

// opções base (OWASP: headers + 429 padronizado)
const opcoesBase = {
    standardHeaders: true,
    legacyHeaders: false,
    handler,
};

export const loginRateLimit = rateLimit({
    ...opcoesBase,
    windowMs: 15 * 60 * 1000, // 15 min
    max: 10, // 10 tentativas 
    store: criarStore('login'),
    keyGenerator: (req) => {
        const ip = ipKeyGenerator(req.ip);
        const email = req.body?.email?.toLowerCase()?.trim() ?? '';
        return email ? `${ip}:${email}` : ip;
      },
});

export const cadastroRateLimit = rateLimit({
    ...opcoesBase,
    windowMs: 1 * 60 * 60 * 1000, // 1 hora
    max: 5, 
    store: criarStore('cadastro'),
});

export const refreshRateLimit = rateLimit({
    ...opcoesBase,
    windowMs: 15 * 60 * 1000, 
    max: 30,
    store: criarStore('refresh'),
});

export const globalRateLimit = rateLimit({
    ...opcoesBase,
    windowMs: 60 * 1000, // 1 min
    max: 100,
    store: criarStore('global'),
})