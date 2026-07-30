import { PageContainer } from "@/components/layout/PageContainer"
import { PageTitulo } from "@/components/layout/PageTitulo"
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
    removendo,
    feedback,
    iniciarEdicao,
    cancelarEdicao,
    salvarEdicao,
    atualizarCampo,
    removerConta,
    limparFeedback,
  } = usePerfil()

  return (
    <PageContainer>
      <PageTitulo
        titulo="Perfil"
        descricao="Visualize e edite seus dados de cadastro."
      />

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
          removendo={removendo}
          onIniciarEdicao={iniciarEdicao}
          onCancelarEdicao={cancelarEdicao}
          onSalvarEdicao={salvarEdicao}
          onCampoChange={atualizarCampo}
          onRemoverConta={removerConta}
        />
      )}
    </PageContainer>
  )
}
