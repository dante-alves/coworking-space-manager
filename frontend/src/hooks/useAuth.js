import { useMemo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { estaLogado, obterUsuario } from "@/lib/auth-storage";

export function useAuth() {
    const { pathname } = useLocation();
    const [versaoSessao, setVersaoSessao] = useState(0);

    useEffect(() => {
        const atualizar = () => setVersaoSessao((v) => v + 1);

        window.addEventListener("sessao-atualizada", atualizar);

        return () => window.removeEventListener("sessao-atualizada", atualizar);
    }, []);

    const logado = useMemo(() => estaLogado(), [pathname, versaoSessao]);
    const usuario = useMemo(() => obterUsuario(), [pathname, versaoSessao]);
    const ehAdmin = usuario?.eAdmin === true;

    return { logado, usuario, ehAdmin };
}