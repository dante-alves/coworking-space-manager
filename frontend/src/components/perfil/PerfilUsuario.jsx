import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLogout } from "@/hooks/useLogout"
import { formatarCpf } from "@/lib/formatadores"
import { PerfilFormEdit } from "@/components/perfil/PerfilFormEdit"
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
import { useState } from "react"

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

export function PerfilUsuario({
  usuario,
  editando,
  form,
  erros,
  erroGeral,
  enviando,
  removendo,
  onIniciarEdicao,
  onCancelarEdicao,
  onSalvarEdicao,
  onCampoChange,
  onRemoverConta,
}) {
  const { sair } = useLogout()
  const [confirmarRemocaoAberto, setConfirmarRemocaoAberto] = useState(false)

  const dataCadastro = usuario.dtCriacao
    ? new Date(usuario.dtCriacao).toLocaleDateString("pt-BR")
    : "—"

  const endereco = usuario.endereco
    ? `Rua ${usuario.endereco.rua}, ${usuario.endereco.numero}. Bairro: ${usuario.endereco.bairro}. CEP: ${usuario.endereco.cep}, ${usuario.endereco.cidade}-${usuario.endereco.uf}.`
    : "—"

  async function handleConfirmarRemocao() {
    const sucesso = await onRemoverConta()

    if (sucesso) {
      setConfirmarRemocaoAberto(false)
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{editando ? "Editar perfil" : usuario.nome}</CardTitle>
        <CardDescription>
          {usuario.eAdmin ? "Administrador" : "Cliente"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {editando ? (
          <PerfilFormEdit
            form={form}
            erros={erros}
            erroGeral={erroGeral}
            enviando={enviando}
            onSubmit={onSalvarEdicao}
            onCancelar={onCancelarEdicao}
            onCampoChange={onCampoChange}
          />
        ) : (
          <dl className="flex flex-col gap-4">
            <Campo label="Email" valor={usuario.email} />
            <Campo label="Telefone" valor={usuario.telefone} />
            <Campo label="CPF" valor={formatarCpf(usuario.cpf)} />
            <Campo label="Endereço" valor={endereco} />
            <Campo label="Cadastrado em" valor={dataCadastro} />
          </dl>
        )}
      </CardContent>

      {!editando && (
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={onIniciarEdicao}>
              Editar
            </Button>
            <Button type="button" variant="outline" onClick={sair}>
              Sair
            </Button>
          </div>

          {!usuario.eAdmin && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={removendo}
              onClick={() => setConfirmarRemocaoAberto(true)}
            >
              Remover conta
            </Button>
          )}
        </CardFooter>
      )}

      <AlertDialog
        open={confirmarRemocaoAberto}
        onOpenChange={setConfirmarRemocaoAberto}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover conta?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover a sua conta? Suas reservas futuras
              serão canceladas e você não poderá mais fazer login.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={removendo}>
              Voltar
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={removendo}
              onClick={handleConfirmarRemocao}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {removendo ? "Removendo..." : "Remover conta"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
