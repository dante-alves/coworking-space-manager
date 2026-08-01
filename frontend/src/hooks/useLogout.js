import { useNavigate } from "react-router-dom"
import { limparSessao } from "@/lib/auth-storage"
import { logout } from "@/services/usuarioService";

export function useLogout() {
  const navigate = useNavigate()

  async function sair() {
    try {
      await logout();
    } finally {
      limparSessao();
      navigate("/", { replace: true });
    }
  }

  return { sair }
}
