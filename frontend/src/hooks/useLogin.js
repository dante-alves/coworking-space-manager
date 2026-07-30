
import { salvarSessao } from "@/lib/auth-storage";
import { login } from "@/services/usuarioService";
import { errosPorCampo } from "@/validators/erroSchema";
import { loginFormSchema } from "@/validators/loginSchema";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const estadoInicial = {
    email: "",
    senha: "",
};

export function useLogin() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [form, setForm] = useState(estadoInicial);
    const [erros, setErros] = useState({});
    const [erroGeral, setErroGeral] = useState("");
    const [enviando, setEnviando] = useState(false);

    function atualizarCampo(campo, valor) {
        setForm((f) => ({ ...f, [campo]: valor }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErros({});
        setErroGeral("");

        const resultado = loginFormSchema.safeParse(form);

        if (!resultado.success) {
            setErros(errosPorCampo(resultado.error));
            return;
        }

        try {
            setEnviando(true);

            const payload = resultado.data;
            const resposta = await login(payload)

            salvarSessao({
                accessToken: resposta.accessToken,
                usuario: resposta.usuario,
            });

            const destinoPadrao = resposta.usuario.eAdmin ? "/admin" : "/salas";
            const destino = location.state?.from ?? destinoPadrao;

            navigate(destino, { replace: true });
        } catch (erro) {
            setErroGeral(
                erro.response?.data?.mensagem ?? "Erro ao realizar login."
            );
        } finally {
            setEnviando(false);
        }
    }

    return {
        form,
        erros,
        erroGeral,
        enviando,
        atualizarCampo,
        handleSubmit,
    };
}