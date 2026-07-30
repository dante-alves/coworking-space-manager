import api from "@/lib/api";

export async function listarDisponiveis(dia, turno) {
    const { data } = await api.get("/salas", { params: { dia, turno } });

    return data;
}

export async function listarTodas() {
    const { data } = await api.get("/salas");

    return data;
}

export async function criar(dados) {
    const { data } = await api.post("/salas", dados);

    return data;
}

export async function atualizar(id, dados) {
    const { data } = await api.put(`/salas/${id}`, dados);

    return data;
}

export async function desativar(id) {
    const { data } = await api.delete(`/salas/${id}`);

    return data;
}