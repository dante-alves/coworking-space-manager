import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { estaLogado, obterUsuario } from "@/lib/auth-storage";

export function useAuth() {
    const { pathname } = useLocation();

    const logado = useMemo(() => estaLogado(), [pathname]);
    const usuario = useMemo(() => obterUsuario(), [pathname]);
    const ehAdmin = usuario?.eAdmin === true;

    return { logado, usuario, ehAdmin };
}