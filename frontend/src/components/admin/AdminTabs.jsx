import { cn } from "@/lib/utils"
import { NavLink } from "react-router-dom"

const ABAS = [
  { to: "/admin/salas", label: "Salas" },
  { to: "/admin/reservas", label: "Reservas" },
  { to: "/admin/clientes", label: "Clientes" },
]

export function AdminTabs() {
  return (
    <nav className="flex gap-1 border-b" aria-label="Abas do painel admin">
      {ABAS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "-mb-px border-b-2 px-4 py-2 text-sm transition-colors",
              isActive
                ? "border-primary font-medium text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
