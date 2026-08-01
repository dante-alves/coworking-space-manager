import crypto from 'crypto';
import redis from '../config/redis.js';

const TTL = Number(process.env.REFRESH_TOKEN_TTL_SECONDS ?? 604800);

function chaveRefresh(token) {
    return `refresh:${token}`;
}

function chaveUsuario(idUsuario) {
    return `user:${String(idUsuario)}:refresh`;
}

async function criar(idUsuario) {
    const token = crypto.randomUUID();
    const id = String(idUsuario);

    // 1 sessão por usuário: revoga refresh anterior se existir
    
    const tokenAntigo = await redis.get(chaveUsuario(id));
    if (tokenAntigo) {
        await redis.del(chaveRefresh(tokenAntigo));
    }

    /* o primeiro .set(chaveRefresh(token), id, 'EX', TTL) serve para relacionar o refresh token àquele usuário -> qunado o usuário envia um refresh token, o redis vai checar diretamente aquele refresh token
    
    o segundo .set(chaveUsuario(id), token, 'EX', TTL) faz o inverso, salva o usuàrio àquele refresh token -> quando o usuário faz login novamente, o redis checa o token antigo com redis.get(chaveUsuario(id)), buscando pelo id do usuário, por isso é importante esse segundo set 
    .*/
    await redis.multi().set(chaveRefresh(token), id, 'EX', TTL).set(chaveUsuario(id), token, 'EX', TTL).exec();

    return token;
}

async function validar(token) {

    const idUsuario = await redis.get(chaveRefresh(token));
    if (!idUsuario) return null;

    return Number(idUsuario);
}

async function revogar(token) {
    const idUsuario = await redis.get(chaveRefresh(token));

    if (!idUsuario) return null;

    await redis.multi().del(chaveRefresh(token)).del(chaveUsuario(idUsuario)).exec();
}

async function revogarPorUsuario(idUsuario) {
    const token = await redis.get(chaveUsuario(idUsuario));
    
    if (!token) return;

    await revogar(token);
}

async function rotacionar(tokenAntigo, idUsuario) {
    await revogar(tokenAntigo);
    return criar(idUsuario);
}

export default { criar, validar, revogar, revogarPorUsuario, rotacionar };
