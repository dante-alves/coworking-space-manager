import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { estaLogado } from "@/lib/auth-storage";

export function useAuth() {
    const { pathname } = useLocation();

    const logado = useMemo(() => estaLogado(), [pathname]);

    return { logado };
}