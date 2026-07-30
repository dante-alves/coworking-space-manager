import { useNavigate } from "react-router-dom"
import { limparSessao } from "@/lib/auth-storage"

export function useLogout() {
  const navigate = useNavigate()

  function sair() {
    limparSessao()
    navigate("/", { replace: true })
  }

  return { sair }
}
