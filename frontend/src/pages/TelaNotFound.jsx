import { PageContainer } from "@/components/layout/PageContainer"
import { PageTitulo } from "@/components/layout/PageTitulo"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

export default function TelaNotFound() {
  return (
    <PageContainer className="flex flex-1 flex-col items-center justify-center py-16 text-center">
      <p className="font-display text-7xl font-semibold text-muted-foreground/30">
        404
      </p>

      <PageTitulo
        className="items-center"
        titulo="Página não encontrada"
        descricao="O endereço que você acessou não existe ou foi movido."
      />

      <Link to="/" className={cn(buttonVariants({ size: "lg" }), "mt-2")}>
        Voltar para a home
      </Link>
    </PageContainer>
  )
}
