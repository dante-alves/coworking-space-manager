import api from '@/lib/api'

export async function cadastrar(dados) {
    const { data } = await api.post('/usuarios', dados);

    return data;
}

export async function login(dados) {
    const { data } = await api.post('/login', dados);

    return data;
}

export async function buscarPorId(id) {
    const { data } = await api.get(`/usuarios/${id}`);

    return data;
}

export async function atualizar(id, dados) {
    const { data } = await api.put(`/usuarios/${id}`, dados);

    return data;
}

export async function desativar(id) {
    const { data } = await api.delete(`/usuarios/${id}`);

    return data;
}

export async function listar(pagina = 1, busca = "") {
    const { data } = await api.get("/usuarios", {
        params: { pagina, busca },
    });

    return data;
}