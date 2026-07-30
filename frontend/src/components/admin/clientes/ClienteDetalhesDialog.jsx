import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { formatarCpf } from "@/lib/formatadores"

function Campo({ label, valor }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
      <dt className="w-32 shrink-0 text-sm font-medium text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm">{valor ?? "—"}</dd>
    </div>
  )
}

export function ClienteDetalhesDialog({
  cliente,
  aberto,
  carregando,
  onFechar,
}) {
  const endereco = cliente?.endereco
    ? `Rua ${cliente.endereco.rua}, ${cliente.endereco.numero}. Bairro: ${cliente.endereco.bairro}. CEP: ${cliente.endereco.cep}, ${cliente.endereco.cidade}-${cliente.endereco.uf}.`
    : "—"

  const dataCadastro = cliente?.dtCriacao
    ? new Date(cliente.dtCriacao).toLocaleDateString("pt-BR")
    : "—"

  return (
    <AlertDialog open={aberto} onOpenChange={(open) => !open && onFechar()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {carregando ? "Carregando..." : cliente?.nome ?? "Cliente"}
          </AlertDialogTitle>
        </AlertDialogHeader>

        {carregando ? (
          <p className="text-sm text-muted-foreground">Carregando detalhes...</p>
        ) : cliente ? (
          <dl className="flex flex-col gap-3">
            <Campo label="Email" valor={cliente.email} />
            <Campo label="Telefone" valor={cliente.telefone} />
            <Campo label="CPF" valor={formatarCpf(cliente.cpf)} />
            <Campo label="Endereço" valor={endereco} />
            <Campo
              label="Status"
              valor={cliente.isActive ? "Ativo" : "Inativo"}
            />
            <Campo label="Cadastrado em" valor={dataCadastro} />
          </dl>
        ) : null}

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button type="button" variant="outline" onClick={onFechar}>
              Fechar
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
