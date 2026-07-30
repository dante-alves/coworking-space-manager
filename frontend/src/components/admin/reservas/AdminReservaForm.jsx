import { FormSelect } from "@/components/form/form-select"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import {
  TURNOS,
  diaApiParaDate,
  diaParaApi,
  formatarDiaExibicao,
} from "@/lib/formatadores"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function AdminReservaForm({
  form,
  erros,
  erroGeral,
  enviando,
  salasAtivas,
  clientes,
  onSubmit,
  onCancelar,
  onCampoChange,
}) {
  const [calendarioAberto, setCalendarioAberto] = useState(false)
  const dataSelecionada = form.dia ? diaApiParaDate(form.dia) : undefined

  const opcoesClientes = [
    { value: "", label: "Selecione..." },
    ...clientes.map((cliente) => ({
      value: String(cliente.id),
      label: cliente.nome,
    })),
  ]

  const opcoesSalas = [
    { value: "", label: "Selecione..." },
    ...salasAtivas.map((sala) => ({
      value: String(sala.id),
      label: sala.nome,
    })),
  ]

  const opcoesTurnos = TURNOS.map(({ valor, label }) => ({
    value: valor,
    label,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Nova reserva</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {erroGeral && (
            <p className="text-sm text-destructive" role="alert">
              {erroGeral}
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <FormSelect
              id="reserva-cliente"
              label="Cliente"
              value={form.idUsuario}
              onChange={(valor) => onCampoChange("idUsuario", valor)}
              options={opcoesClientes}
              placeholder="Selecione..."
              error={erros.idUsuario}
              fullWidth
            />

            <FormSelect
              id="reserva-sala"
              label="Sala"
              value={form.idSala}
              onChange={(valor) => onCampoChange("idSala", valor)}
              options={opcoesSalas}
              placeholder="Selecione..."
              error={erros.idSala}
              fullWidth
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="reserva-dia" className="text-sm font-medium">
                Dia
              </label>
              <Popover open={calendarioAberto} onOpenChange={setCalendarioAberto}>
                <PopoverTrigger asChild>
                  <button
                    id="reserva-dia"
                    type="button"
                    className={cn(
                      "flex h-9 w-full items-center justify-between rounded-md border border-input",
                      "bg-background px-3 text-sm shadow-xs hover:bg-muted/50",
                      erros.dia && "border-destructive"
                    )}
                  >
                    <span>
                      {form.dia ? formatarDiaExibicao(form.dia) : "Selecione..."}
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
                        onCampoChange("dia", diaParaApi(data))
                        setCalendarioAberto(false)
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
              {erros.dia && (
                <p className="text-sm text-destructive">{erros.dia}</p>
              )}
            </div>

            <FormSelect
              id="reserva-turno"
              label="Turno"
              value={form.turno}
              onChange={(valor) => onCampoChange("turno", valor)}
              options={opcoesTurnos}
              error={erros.turno}
              fullWidth
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={enviando}>
              {enviando ? "Salvando..." : "Criar reserva"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={enviando}
              onClick={onCancelar}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
