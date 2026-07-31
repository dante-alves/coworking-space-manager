import { LoginForm } from '@/components/auth/LoginForm'
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
    <div className='flex flex-1 items-center justify-center px-4 py-8'>
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
