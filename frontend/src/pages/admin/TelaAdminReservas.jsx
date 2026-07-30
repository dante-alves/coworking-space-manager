import { AdminReservaCard } from "@/components/admin/reservas/AdminReservaCard"
import { AdminReservaForm } from "@/components/admin/reservas/AdminReservaForm"
import { FiltrosReservasAdmin } from "@/components/admin/reservas/FiltrosReservasAdmin"
import { AlertaFeedback } from "@/components/salas/AlertaFeedback"
import { Button } from "@/components/ui/button"
import { useAdminReservas } from "@/hooks/useAdminReservas"
import { hojeParaApi } from "@/lib/formatadores"
import { errosPorCampo } from "@/validators/erroSchema"
import {
  criarReservaAdminSchema,
  FORM_RESERVA_VAZIO,
} from "@/validators/adminReservaSchema"
import { useState } from "react"

export default function TelaAdminReservas() {
  const {
    reservas,
    salas,
    salasAtivas,
    clientes,
    filtros,
    carregando,
    salvando,
    cancelandoId,
    feedback,
    atualizarFiltro,
    limparFiltros,
    criarReserva,
    cancelarReserva,
    limparFeedback,
  } = useAdminReservas()

  const [formAberto, setFormAberto] = useState(false)
  const [form, setForm] = useState({
    ...FORM_RESERVA_VAZIO,
    dia: hojeParaApi(),
  })
  const [erros, setErros] = useState({})
  const [erroGeral, setErroGeral] = useState("")

  function abrirFormulario() {
    setFormAberto(true)
    setForm({ ...FORM_RESERVA_VAZIO, dia: hojeParaApi() })
    setErros({})
    setErroGeral("")
    limparFeedback()
  }

  function fecharFormulario() {
    setFormAberto(false)
    setForm({ ...FORM_RESERVA_VAZIO, dia: hojeParaApi() })
    setErros({})
    setErroGeral("")
  }

  function atualizarCampo(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErros({})
    setErroGeral("")

    const resultado = criarReservaAdminSchema.safeParse(form)

    if (!resultado.success) {
      const mapa = errosPorCampo(resultado.error)
      setErros(mapa)
      if (mapa[""]) setErroGeral(mapa[""])
      return
    }

    const sucesso = await criarReserva(resultado.data)

    if (sucesso) fecharFormulario()
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Visualize, filtre e gerencie reservas confirmadas.
        </p>

        {!formAberto && (
          <Button type="button" onClick={abrirFormulario}>
            Nova reserva
          </Button>
        )}
      </div>

      {feedback && (
        <AlertaFeedback
          tipo={feedback.tipo}
          mensagem={feedback.mensagem}
          onFechar={limparFeedback}
        />
      )}

      <FiltrosReservasAdmin
        filtros={filtros}
        salas={salas}
        clientes={clientes}
        onFiltroChange={atualizarFiltro}
        onLimpar={limparFiltros}
      />

      {formAberto && (
        <AdminReservaForm
          form={form}
          erros={erros}
          erroGeral={erroGeral}
          enviando={salvando}
          salasAtivas={salasAtivas}
          clientes={clientes}
          onSubmit={handleSubmit}
          onCancelar={fecharFormulario}
          onCampoChange={atualizarCampo}
        />
      )}

      {carregando ? (
        <p className="text-muted-foreground">Carregando reservas...</p>
      ) : reservas.length === 0 ? (
        <p className="text-muted-foreground">
          Nenhuma reserva encontrada com os filtros atuais.
        </p>
      ) : (
        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reservas.map((reserva) => (
            <AdminReservaCard
              key={reserva.id}
              reserva={reserva}
              processando={cancelandoId === reserva.id}
              onCancelar={cancelarReserva}
            />
          ))}
        </div>
      )}
    </div>
  )
}
