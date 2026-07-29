import { hojeParaApi } from "@/lib/formatadores";
import { criar } from "@/services/reservaService";
import { listarDisponiveis } from "@/services/salaService";
import { criarReservaSchema } from "@/validators/reservaSchema";
import { filtroSalasSchema } from "@/validators/salaSchema";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function useSalasDisponiveis() {

    const [dia, setDia] = useState(hojeParaApi());
    const [turno, setTurno] = useState("M");
    const [salas, setSalas] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [reservandoId, setReservandoId] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const buscarSalas = useCallback(async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        setFeedback(null);

        const resultado = filtroSalasSchema.safeParse({ dia, turno });

        if (!resultado.success) {
            setSalas([]);
            setFeedback({ tipo: "erro", mensagem: "Erro ao procurar salas." });
            return;
        }

        try {
            setCarregando(true);

            const resposta = await listarDisponiveis(resultado.data.dia, resultado.data.turno);

            setSalas(resposta.salas ?? []);

        } catch (erro) {
            setSalas([]);
            setFeedback({
                tipo: "erro",
                mensagem: erro.response?.data?.mensagem ?? "Erro ao procurar salas."
            });
        } finally {
            setCarregando(false);
        }
    },
    [dia, turno]);

    useEffect(() => {
        buscarSalas();
    }, [buscarSalas]);

    async function reservar(idSala) {
        setFeedback(null);

        const resultado = criarReservaSchema.safeParse({ idSala, dia, turno });

        if (!resultado.success) {
            setFeedback({ tipo: "erro", mensagem: "Dados da reserva inválidos." });
            return false;
        }

        try {
            setReservandoId(idSala);

            await criar(resultado.data);

            setFeedback({
                tipo: "sucesso",
                mensagem: "Reserva realizada com sucesso!"
            });

            await buscarSalas();

            return true;
        } catch (erro) {
            setFeedback({
                tipo: "erro",
                mensagem: erro.response?.data?.mensagem ?? "Erro ao realizar reserva"
            });

            return false;
        } finally {
            setReservandoId(null);
        }
    }

    function limparFeedback() {
        setFeedback(null);
    }

    return {
        dia,
        setDia,
        turno,
        setTurno,
        salas,
        carregando,
        reservandoId,
        feedback,
        reservar,
        buscarSalas,
        limparFeedback,
    }
}