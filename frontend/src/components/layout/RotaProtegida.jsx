import { Navigate, useLocation } from "react-router-dom"
import { estaLogado } from "@/lib/auth-storage"

export function RotaProtegida({ children }) {
  const location = useLocation()

  if (!estaLogado()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}