import { cancelar, listar } from "@/services/reservaService";
import { useCallback, useEffect, useState } from "react";

export function useMinhasReservas() {
    const [reservas, setReservas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [cancelandoId, setCancelandoId] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const carregar = useCallback(async () => {
        setFeedback(null);

        try {
            setCarregando(true);

            const resposta = await listar();
            setReservas(resposta.reservas ?? []);
        } catch (erro) {
            setReservas([]);
            setFeedback({
                tipo: "erro",
                mensagem: erro.response?.data?.mensagem ?? "Erro ao carregar reservas.",
            });
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        carregar();
    }, [carregar]);

    async function cancelarReserva(id) {
        setFeedback(null);

        try {
            setCancelandoId(id);

            await cancelar(id);

            setFeedback({
                tipo: "sucesso",
                mensagem: "Reserva cancelada com sucesso!",
            });

            await carregar();

            return true;
        } catch (erro) {
            setFeedback({
                tipo: "erro",
                mensagem: erro.response?.data?.mensagem ?? "Erro ao cancelar reserva.",
            });

            return false;
        } finally {
            setCancelandoId(null);
        }
    }

    function limparFeedback() {
        setFeedback(null);
    }

    return {
        reservas,
        carregando,
        cancelandoId,
        feedback,
        cancelarReserva,
        limparFeedback,
    };
}
