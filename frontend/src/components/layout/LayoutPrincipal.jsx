import { Outlet, useNavigate } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { useEffect } from "react";
import { configurarNavegacao } from "@/lib/navegacao";

export function LayoutPrincipal() {

    const navigate = useNavigate();

    useEffect(() => {
        configurarNavegacao({ navigate })
    }, [navigate]);

    return (
        <div className="flex min-h-svh flex-col bg-background">
            <AppHeader />
            <Outlet />
        </div>
    );
}