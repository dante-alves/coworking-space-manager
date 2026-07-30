import { AdminTabs } from "@/components/admin/AdminTabs"
import { Outlet } from "react-router-dom"

export default function TelaAdminLayout() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Painel de Gerenciamento</h1>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Modo: Administrador
        </span>
      </div>

      <AdminTabs />

      <Outlet />
    </main>
  )
}
