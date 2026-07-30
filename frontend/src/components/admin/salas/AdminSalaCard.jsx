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
import { formatarPrecoTurno } from "@/lib/formatadores"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function AdminSalaCard({
  sala,
  processando = false,
  onEditar,
  onDesativar,
  onReativar,
}) {
  const [confirmarAberto, setConfirmarAberto] = useState(false)

  async function handleConfirmarDesativar() {
    const sucesso = await onDesativar(sala.id)

    if (sucesso) {
      setConfirmarAberto(false)
    }
  }

  return (
    <>
      <div className="h-full">
        <Card
          className={cn(
            "flex h-full w-full flex-col",
            !sala.isActive && "border-dashed bg-muted/40 opacity-80"
          )}
        >
          <CardHeader className="gap-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle>{sala.nome}</CardTitle>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                  sala.isActive
                    ? "bg-green-600/10 text-green-700 dark:text-green-400"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {sala.isActive ? "Ativa" : "Inativa"}
              </span>
            </div>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col gap-1 text-muted-foreground">
            <p>Capacidade: {sala.capacidade} pessoas</p>
            <p>Preço: {formatarPrecoTurno(sala.precoLocacao)}</p>
            <p className="flex-1 text-sm">{sala.descricao ?? ""}</p>
          </CardContent>

          <CardFooter className="mt-auto flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={processando}
            onClick={() => onEditar(sala)}
          >
            Editar
          </Button>

          {sala.isActive ? (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={processando}
              onClick={() => setConfirmarAberto(true)}
            >
              Desativar
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              disabled={processando}
              onClick={() => onReativar(sala.id)}
            >
              {processando ? "Reativando..." : "Reativar"}
            </Button>
          )}
        </CardFooter>
        </Card>
      </div>

      <AlertDialog open={confirmarAberto} onOpenChange={setConfirmarAberto}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Desativar sala?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover a sala{" "}
              <strong>{sala.nome}</strong>? As reservas futuras serão
              canceladas.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={processando}>
              Voltar
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={processando}
              onClick={handleConfirmarDesativar}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {processando ? "Desativando..." : "Desativar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
