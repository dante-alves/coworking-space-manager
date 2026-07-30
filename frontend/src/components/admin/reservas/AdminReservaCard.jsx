import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { formatarDiaExibicao, labelTurno } from "@/lib/formatadores"
import { reservaJaPassou } from "@/lib/turno"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function AdminReservaCard({
  reserva,
  processando = false,
  onCancelar,
}) {
  const [confirmarAberto, setConfirmarAberto] = useState(false)
  const passou = reservaJaPassou(reserva.dia, reserva.turno)

  async function handleConfirmar() {
    const sucesso = await onCancelar(reserva.id)

    if (sucesso) {
      setConfirmarAberto(false)
    }
  }

  return (
    <>
      <Card
        className={cn(
          "w-full",
          passou && "border-dashed bg-muted/30 opacity-80"
        )}
      >
        <CardHeader className="gap-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base">{reserva.nomeSala}</CardTitle>
            {passou && (
              <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                Passada
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-1 text-muted-foreground">
          <p>
            Cliente:{" "}
            <span className="text-foreground">
              {reserva.nomeUsuario ?? "—"}
            </span>
          </p>
          <p>
            Dia:{" "}
            <span className="text-foreground">
              {formatarDiaExibicao(reserva.dia)}
            </span>
          </p>
          <p>
            Turno:{" "}
            <span className="text-foreground">
              {labelTurno(reserva.turno)}
            </span>
          </p>
        </CardContent>

        {!passou && (
          <CardFooter>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="w-full"
              disabled={processando}
              onClick={() => setConfirmarAberto(true)}
            >
              Cancelar reserva
            </Button>
          </CardFooter>
        )}
      </Card>

      <AlertDialog open={confirmarAberto} onOpenChange={setConfirmarAberto}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar reserva?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar a reserva de{" "}
              <strong>{reserva.nomeUsuario}</strong> na sala{" "}
              <strong>{reserva.nomeSala}</strong>, dia{" "}
              <strong>{formatarDiaExibicao(reserva.dia)}</strong>, turno da{" "}
              <strong>{labelTurno(reserva.turno)}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={processando}>
              Voltar
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={processando}
              onClick={handleConfirmar}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {processando ? "Cancelando..." : "Cancelar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
