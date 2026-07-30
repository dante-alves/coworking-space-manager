import { buttonVariants } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export function HomeRodapeCta() {
  const { logado } = useAuth()

  return (
    <section className="bg-neutral-900 px-6 py-20 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-start justify-between gap-6">
        <h2 className="font-display max-w-xs text-3xl font-medium md:text-4xl">
          Pronto para reservar sua sala?
        </h2>

        <Link
          to={logado ? "/salas" : "/cadastro"}
          className={cn(
            buttonVariants({ size: "lg" }),
            "gap-2 bg-white font-semibold text-neutral-900 hover:bg-amber-100"
          )}
        >
          {logado ? "Ver salas disponíveis" : "Criar conta grátis"}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
