import api from "@/lib/api";

export async function listar() {
    const { data } = await api.get("/reservas");

    return data;
}

export async function criar(dados) {
    const { data } = await api.post("/reservas", dados);

    return data;
}

export async function cancelar(id) {
    const { data } = await api.delete(`/reservas/${id}`);

    return data;
}