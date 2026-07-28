import api from '@/lib/api'

export async function cadastrar(dados) {
    const { data } = await api.post('/usuarios', dados);

    return data;
}

export async function login(dados) {
    const { data } = await api.post('/login', dados);

    return data;
}