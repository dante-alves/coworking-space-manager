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
import { formatarCpf } from "@/lib/formatadores"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function AdminClienteCard({
  cliente,
  processando = false,
  onVerDetalhes,
  onDesativar,
}) {
  const [confirmarAberto, setConfirmarAberto] = useState(false)

  async function handleConfirmarDesativar() {
    const sucesso = await onDesativar(cliente.id)

    if (sucesso) {
      setConfirmarAberto(false)
    }
  }

  return (
    <>
      <Card
        className={cn(
          "w-full",
          !cliente.isActive && "border-dashed bg-muted/40 opacity-80"
        )}
      >
        <CardHeader className="gap-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base">{cliente.nome}</CardTitle>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                cliente.isActive
                  ? "bg-green-600/10 text-green-700 dark:text-green-400"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {cliente.isActive ? "Ativo" : "Inativo"}
            </span>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-1 text-sm text-muted-foreground">
          <p>
            Email:{" "}
            <span className="text-foreground">{cliente.email}</span>
          </p>
          <p>
            Telefone:{" "}
            <span className="text-foreground">{cliente.telefone}</span>
          </p>
          <p>
            CPF:{" "}
            <span className="text-foreground">{formatarCpf(cliente.cpf)}</span>
          </p>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={processando}
            onClick={() => onVerDetalhes(cliente.id)}
          >
            Ver detalhes
          </Button>

          {cliente.isActive && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={processando}
              onClick={() => setConfirmarAberto(true)}
            >
              Desativar
            </Button>
          )}
        </CardFooter>
      </Card>

      <AlertDialog open={confirmarAberto} onOpenChange={setConfirmarAberto}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Desativar cliente?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja desativar o cliente{" "}
              <strong>{cliente.nome}</strong>? As reservas futuras dele serão
              canceladas e ele não poderá mais fazer login.
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
