import { useAuth } from "@/hooks/useAuth"
import { useLogout } from "@/hooks/useLogout"
import { cn } from "@/lib/utils"
import { Link, NavLink } from "react-router-dom"
import { Button, buttonVariants } from "@/components/ui/button"

const LINKS_LOGADO = [
    { to: "/salas", label: "Salas Disponíveis" },
    { to: "/minhas-reservas", label: "Minhas Reservas" },
    { to: "/perfil", label: "Perfil" }, // Depois talvez vire o nome da pessoa + ícone
]

export function AppHeader() {

    const { logado } = useAuth()
    const { sair } = useLogout()

    return (
        <header className="border-b bg-card">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">

                <Link to="/" className="text-xl font-semibold hover:text-primary">
                    Coworking Space Manager
                </Link>

                <nav className="flex flex-wrap items-center gap-4 text-sm">
                    {logado ? (
                        <>
                            {LINKS_LOGADO.map(({ to, label }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    className={({ isActive }) =>
                                        cn(
                                            "underline-offset-4 hover:text-primary hover:underline",
                                            isActive && "font-medium text-primary underline"
                                        )
                                    }
                                >
                                    {label}
                                </NavLink>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={sair}
                            >
                                Sair
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className={buttonVariants({ variant: "outline", size: "sm" })}
                            >
                                Login
                            </Link>
                            <Link
                                to="/cadastro"
                                className={buttonVariants({ size: "sm" })}
                            >
                                Cadastrar
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}