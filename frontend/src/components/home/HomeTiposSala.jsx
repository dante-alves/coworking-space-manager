import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TIPOS_SALA_HOME } from "@/lib/homeConteudo"

export function HomeTiposSala() {
  return (
    <section id="tipos-sala" className="flex flex-col gap-12">
      <div className="flex flex-col items-start justify-between gap-6 border-b border-border pb-6 md:flex-row md:items-end">
        <h2 className="font-display text-3xl font-medium md:text-4xl">
          Salas para cada tipo de trabalho
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Escolha o espaço certo para reunião, apresentação ou atendimento a
          clientes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
        {TIPOS_SALA_HOME.map((sala) => (
          <Card
            key={sala.titulo}
            className="gap-3 rounded-none border-0 bg-background px-7 py-8 transition-colors hover:bg-card"
          >
            <CardContent className="flex h-full flex-col gap-3 p-0">
              <span className="text-xs tracking-wide text-muted-foreground">
                {sala.indice}
              </span>
              <h3 className="font-display text-xl font-medium">{sala.titulo}</h3>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                {sala.descricao}
              </p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {sala.turnos.map((turno) => (
                  <Badge
                    key={turno}
                    variant="outline"
                    className="border-border text-xs font-normal text-muted-foreground"
                  >
                    {turno}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
