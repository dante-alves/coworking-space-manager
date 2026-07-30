import { cn } from "@/lib/utils"
import {
  estiloAvatarPorNome,
  obterInicialNome,
} from "@/lib/formatadores"

const TAMANHOS = {
  sm: "size-7 text-xs",
  lg: "size-14 text-xl",
}

export function AvatarUsuario({ nome, size = "sm", className }) {
  const inicial = obterInicialNome(nome)
  const estiloAvatar = estiloAvatarPorNome(nome)

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold",
        TAMANHOS[size],
        className
      )}
      style={estiloAvatar}
      aria-hidden="true"
    >
      {inicial}
    </span>
  )
}
