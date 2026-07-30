import { cn } from "@/lib/utils"
import { obterPrimeiroNome } from "@/lib/formatadores"
import { AvatarUsuario } from "@/components/perfil/AvatarUsuario"
import { NavLink } from "react-router-dom"

export function NavLinkPerfil({ nome }) {
  const primeiroNome = obterPrimeiroNome(nome)

  return (
    <NavLink
      to="/perfil"
      className={({ isActive }) =>
        cn("flex items-center gap-2 no-underline", isActive && "text-primary")
      }
    >
      {({ isActive }) => (
        <>
          <AvatarUsuario nome={nome} size="sm" />
          <span
            className={cn(
              "underline-offset-4 hover:text-primary hover:underline",
              isActive && "font-medium underline"
            )}
          >
            {primeiroNome}
          </span>
        </>
      )}
    </NavLink>
  )
}
