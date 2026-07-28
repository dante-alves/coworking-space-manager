import { SignupForm } from "@/components/signup-form"
import { useCadastro } from "@/hooks/useCadastro"

export default function TelaCadastro() {
  const {
    form,
    erros,
    erroGeral,
    enviando,
    atualizarCampo,
    atualizarEndereco,
    handleSubmit,
  } = useCadastro();

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-4 py-8">
      <SignupForm
        className="w-full max-w-lg"
        form={form}
        erros={erros}
        erroGeral={erroGeral}
        enviando={enviando}
        atualizarCampo={atualizarCampo}
        atualizarEndereco={atualizarEndereco}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}
