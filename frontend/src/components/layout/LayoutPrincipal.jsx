import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";

export function LayoutPrincipal() {
    return (
        <div className="flex min-h-svh flex-col bg-background">
            <AppHeader />
            <Outlet />
        </div>
    )
}