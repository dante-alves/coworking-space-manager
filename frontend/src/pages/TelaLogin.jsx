import { LoginForm } from '@/components/login-form'
import { useLogin } from '@/hooks/useLogin'

export default function TelaLogin() {
    const {
      form,
      erros,
      erroGeral,
      enviando,
      atualizarCampo,
      handleSubmit,
    } = useLogin();

    return (
    <div className='flex min-h-svh w-full items-center justify-center bg-background px-4 py-8'>
      <LoginForm className='w-full max-w-lg'
      form={form}
      erros={erros}
      erroGeral={erroGeral}
      enviando={enviando}
      atualizarCampo={atualizarCampo}
      handleSubmit={handleSubmit}
      />
    </div>
    )
}