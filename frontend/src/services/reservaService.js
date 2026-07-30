import api from "@/lib/api";

export async function listar(filtros = {}) {
    const params = {}

    if (filtros.idUsuario) params.idUsuario = filtros.idUsuario
    if (filtros.idSala) params.idSala = filtros.idSala
    if (filtros.dia) params.dia = filtros.dia

    const { data } = await api.get("/reservas", { params })

    return data
}

export async function criar(dados) {
    const { data } = await api.post("/reservas", dados);

    return data;
}

export async function cancelar(id) {
    const { data } = await api.delete(`/reservas/${id}`);

    return data;
}