import { FormSelect } from "@/components/form/form-select"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import {
  diaApiParaDate,
  diaParaApi,
  formatarDiaExibicao,
} from "@/lib/formatadores"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function FiltrosReservasAdmin({
  filtros,
  salas,
  clientes,
  onFiltroChange,
  onLimpar,
}) {
  const [calendarioAberto, setCalendarioAberto] = useState(false)
  const dataSelecionada = filtros.dia ? diaApiParaDate(filtros.dia) : undefined

  const opcoesClientes = [
    { value: "", label: "Todos" },
    ...clientes.map((cliente) => ({
      value: String(cliente.id),
      label: cliente.nome,
    })),
  ]

  const opcoesSalas = [
    { value: "", label: "Todas" },
    ...salas.map((sala) => ({
      value: String(sala.id),
      label: `${sala.nome}${!sala.isActive ? " (inativa)" : ""}`,
    })),
  ]

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border p-4">
      <p className="text-sm font-medium">Filtrar por:</p>

      <div className="flex flex-wrap items-end gap-4">
        <FormSelect
          id="filtro-cliente"
          label="Cliente"
          value={filtros.idUsuario}
          onChange={(valor) => onFiltroChange("idUsuario", valor)}
          options={opcoesClientes}
          placeholder="Todos"
        />

        <FormSelect
          id="filtro-sala"
          label="Sala"
          value={filtros.idSala}
          onChange={(valor) => onFiltroChange("idSala", valor)}
          options={opcoesSalas}
          placeholder="Todas"
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="filtro-dia" className="text-sm">
            Dia
          </label>
          <Popover open={calendarioAberto} onOpenChange={setCalendarioAberto}>
            <PopoverTrigger asChild>
              <button
                id="filtro-dia"
                type="button"
                className={cn(
                  "flex h-9 w-[180px] items-center justify-between rounded-md border border-input",
                  "bg-background px-3 text-sm shadow-xs hover:bg-muted/50"
                )}
              >
                <span>
                  {filtros.dia ? formatarDiaExibicao(filtros.dia) : "Todos"}
                </span>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dataSelecionada}
                captionLayout="dropdown"
                onSelect={(data) => {
                  if (data) {
                    onFiltroChange("dia", diaParaApi(data))
                    setCalendarioAberto(false)
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {filtros.dia && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onFiltroChange("dia", "")}
          >
            Limpar dia
          </Button>
        )}

        <Button type="button" variant="outline" size="sm" onClick={onLimpar}>
          Limpar filtros
        </Button>
      </div>
    </div>
  )
}
