import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function TelaHome() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Seu espaço de trabalho, no seu turno.
      </h1>
      <p className="mt-4 max-w-lg text-muted-foreground">
        Reserve salas de reunião, auditório e atendimento no coworking —
        manhã, tarde ou noite.
      </p>

      <Link
        to="/salas"
        className={cn(buttonVariants({ size: "lg" }), "mt-8")}
      >
        Ver salas
      </Link>
    </main>
  )
}