import { AdminTabs } from "@/components/admin/AdminTabs"
import { PageContainer } from "@/components/layout/PageContainer"
import { PageTitulo } from "@/components/layout/PageTitulo"
import { Outlet } from "react-router-dom"

export default function TelaAdminLayout() {
  return (
    <PageContainer>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageTitulo
          titulo="Painel de Gerenciamento"
          descricao="Gerencie salas, reservas e clientes do coworking."
        />
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
