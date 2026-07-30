import { Navigate, useLocation } from "react-router-dom"
import { estaLogado, obterUsuario } from "@/lib/auth-storage"

export function RotaAdmin({ children }) {
  const location = useLocation()

  if (!estaLogado()) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    )
  }

  if (!obterUsuario()?.eAdmin) {
    return <Navigate to="/salas" replace />
  }

  return children
}
