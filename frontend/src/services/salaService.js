import api from "@/lib/api";

export async function listarDisponiveis(dia, turno) {
    
    const { data } = await api.get('/salas', { params: { dia, turno } });

    return data;
}