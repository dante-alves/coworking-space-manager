import { Card, CardContent } from "@/components/ui/card"
import { TURNOS } from "@/lib/formatadores"
import { cn } from "@/lib/utils"
import { CloudSun, MoonStar, Sunrise } from "lucide-react"

const ICONES_TURNO = {
  M: Sunrise,
  T: CloudSun,
  N: MoonStar,
}

export function FaixaTurnos({ variant = "light", className }) {
  const escuro = variant === "dark"

  return (
    <Card
      className={cn(
        "gap-0 overflow-hidden py-0",
        escuro
          ? "rounded-md border-white/20 bg-black/40 backdrop-blur-md"
          : "rounded-lg border-border bg-muted/30",
        className
      )}
    >
      <CardContent
        className={cn(
          "flex flex-col p-0 sm:flex-row",
          escuro ? "divide-y divide-white/20 sm:divide-x sm:divide-y-0" : "divide-y divide-border sm:divide-x sm:divide-y-0"
        )}
      >
        {TURNOS.map(({ valor, label, horario, iconClass }) => {
          const Icone = ICONES_TURNO[valor]

          return (
            <div
              key={valor}
              className={cn(
                "flex items-center gap-2 px-5 py-3 text-sm",
                escuro ? "text-white/90" : "text-muted-foreground"
              )}
            >
              <Icone className={cn("size-4 shrink-0", iconClass)} />
              <span>{label}</span>
              <span
                className={cn(
                  "font-semibold",
                  escuro ? "text-white" : "text-foreground"
                )}
              >
                {horario}
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
