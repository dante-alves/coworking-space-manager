import api from "@/lib/api";

export async function criar(dados) {

    const { data } = await api.post('/reservas', dados);

    return data;
}