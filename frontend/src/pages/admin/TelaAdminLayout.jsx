import { AdminTabs } from "@/components/admin/AdminTabs"
import { PageContainer } from "@/components/layout/PageContainer"
import { Outlet } from "react-router-dom"

export default function TelaAdminLayout() {
  return (
    <PageContainer>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Painel de Gerenciamento</h1>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Modo: Administrador
        </span>
      </div>

      <AdminTabs />

      <div className="flex w-full flex-col gap-6">
        <Outlet />
      </div>
    </PageContainer>
  )
}
