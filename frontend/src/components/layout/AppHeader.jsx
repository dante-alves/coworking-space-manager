import { useAuth } from "@/hooks/useAuth"
import { useLogout } from "@/hooks/useLogout"
import { cn } from "@/lib/utils"
import { Link, NavLink } from "react-router-dom"
import { Button, buttonVariants } from "@/components/ui/button"

const LINKS_CLIENTE = [
  { to: "/salas", label: "Salas Disponíveis" },
  { to: "/minhas-reservas", label: "Minhas Reservas" },
  { to: "/perfil", label: "Perfil" },
]

const LINKS_ADMIN = [
  { to: "/admin", label: "Painel de Gerenciamento" },
  { to: "/perfil", label: "Perfil" },
]

export function AppHeader() {
  const { logado, ehAdmin } = useAuth()
  const { sair } = useLogout()

  const links = ehAdmin ? LINKS_ADMIN : LINKS_CLIENTE

  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="text-xl font-semibold hover:text-primary">
          Coworking Space Manager
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm">
          {logado ? (
            <>
              {ehAdmin && (
                <span className="hidden rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary sm:inline">
                  Modo: Administrador
                </span>
              )}

              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/admin" ? false : undefined}
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
