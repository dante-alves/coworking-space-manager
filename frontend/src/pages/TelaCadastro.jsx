import { SignupForm } from "@/components/auth/SignupForm"
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
    <div className="flex flex-1 items-center justify-center px-4 py-8">
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
