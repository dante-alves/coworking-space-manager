import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { AppRodape } from "./AppRodape";
import { FundoDesfocado } from "./FundoDesfocado";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { configurarNavegacao } from "@/lib/navegacao";

export function LayoutPrincipal() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isHome = pathname === "/";

    useEffect(() => {
        configurarNavegacao({ navigate })
    }, [navigate]);

    return (
        <div
            className={cn(
                "relative flex min-h-svh flex-col",
                isHome ? "bg-background" : "overflow-x-hidden"
            )}
        >
            {!isHome && <FundoDesfocado />}

            <AppHeader />

            {isHome ? (
                <Outlet />
            ) : (
                <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col bg-background shadow-xl shadow-black/10">
                    <Outlet />
                </div>
            )}

            <AppRodape />
        </div>
    );
}
