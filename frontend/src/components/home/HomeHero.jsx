import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { FaixaTurnos } from "@/components/turnos/FaixaTurnos"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export function HomeHero() {
  return (
    <section
      className="relative flex min-h-[min(85svh,720px)] items-end bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(10,12,15,0.55) 0%, rgba(10,12,15,0.35) 30%, rgba(10,12,15,0.88) 100%), url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2000&q=80')",
        backgroundPosition: "center 38%",
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 pb-16 pt-10">
        <Badge
          variant="outline"
          className="border-white/30 bg-white/10 px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-white"
        >
          Reserva de salas por turno
        </Badge>

        <h1 className="font-display max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Seu espaço de trabalho,
          <br />
          <span className="font-normal italic text-amber-100">no seu turno.</span>
        </h1>

        <p className="max-w-xl text-lg text-white/80">
          Reserve salas de reunião, auditório e atendimento no coworking em poucos cliques.
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-5">
          <Link
            to="/salas"
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 bg-white font-semibold text-neutral-900 hover:bg-amber-100"
            )}
          >
            Ver salas disponíveis
            <ArrowRight className="size-4" />
          </Link>

          <a
            href="#tipos-sala"
            className="border-b border-white/40 pb-1 text-sm text-white/80 hover:border-white/80"
          >
            Como funciona
          </a>
        </div>

        <FaixaTurnos variant="dark" className="mt-2" />
      </div>
    </section>
  )
}
