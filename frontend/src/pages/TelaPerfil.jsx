import { AlertaFeedback } from "@/components/salas/AlertaFeedback"
import { PerfilUsuario } from "@/components/perfil/PerfilUsuario"
import { usePerfil } from "@/hooks/usePerfil"

export default function TelaPerfil() {
  const {
    usuario,
    carregando,
    erro,
    editando,
    form,
    erros,
    erroGeral,
    enviando,
    feedback,
    iniciarEdicao,
    cancelarEdicao,
    salvarEdicao,
    atualizarCampo,
    limparFeedback,
  } = usePerfil()

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Perfil</h1>

      {feedback && (
        <AlertaFeedback
          tipo={feedback.tipo}
          mensagem={feedback.mensagem}
          onFechar={limparFeedback}
        />
      )}

      {carregando && (
        <p className="text-muted-foreground">Carregando perfil...</p>
      )}

      {erro && (
        <p className="text-sm text-destructive" role="alert">
          {erro}
        </p>
      )}

      {!carregando && usuario && (
        <PerfilUsuario
          usuario={usuario}
          editando={editando}
          form={form}
          erros={erros}
          erroGeral={erroGeral}
          enviando={enviando}
          onIniciarEdicao={iniciarEdicao}
          onCancelarEdicao={cancelarEdicao}
          onSalvarEdicao={salvarEdicao}
          onCampoChange={atualizarCampo}
        />
      )}
    </main>
  )
}
