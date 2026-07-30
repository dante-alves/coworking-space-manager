import { AdminSalaCard } from "@/components/admin/salas/AdminSalaCard"
import { AdminSalaForm } from "@/components/admin/salas/AdminSalaForm"
import { AlertaFeedback } from "@/components/salas/AlertaFeedback"
import { Button } from "@/components/ui/button"
import { useAdminSalas } from "@/hooks/useAdminSalas"
import { errosPorCampo } from "@/validators/erroSchema"
import {
  criarSalaSchema,
  editarSalaSchema,
  FORM_SALA_VAZIO,
  salaParaFormulario,
} from "@/validators/adminSalaSchema"
import { useState } from "react"

export default function TelaAdminSalas() {
  const {
    salas,
    carregando,
    salvando,
    processandoId,
    feedback,
    criarSala,
    atualizarSala,
    desativarSala,
    reativarSala,
    limparFeedback,
  } = useAdminSalas()

  const [modoForm, setModoForm] = useState(null)
  const [salaEditando, setSalaEditando] = useState(null)
  const [form, setForm] = useState(FORM_SALA_VAZIO)
  const [erros, setErros] = useState({})
  const [erroGeral, setErroGeral] = useState("")

  function abrirCriacao() {
    setModoForm("criar")
    setSalaEditando(null)
    setForm(FORM_SALA_VAZIO)
    setErros({})
    setErroGeral("")
    limparFeedback()
  }

  function abrirEdicao(sala) {
    setModoForm("editar")
    setSalaEditando(sala)
    setForm(salaParaFormulario(sala))
    setErros({})
    setErroGeral("")
    limparFeedback()
  }

  function fecharFormulario() {
    setModoForm(null)
    setSalaEditando(null)
    setForm(FORM_SALA_VAZIO)
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

    if (modoForm === "criar") {
      const resultado = criarSalaSchema.safeParse(form)

      if (!resultado.success) {
        const mapa = errosPorCampo(resultado.error)
        setErros(mapa)
        if (mapa[""]) setErroGeral(mapa[""])
        return
      }

      const payload = {
        ...resultado.data,
        descricao: resultado.data.descricao || undefined,
      }

      const sucesso = await criarSala(payload)

      if (sucesso) fecharFormulario()

      return
    }

    if (modoForm === "editar" && salaEditando) {
      const resultado = editarSalaSchema.safeParse(form)

      if (!resultado.success) {
        const mapa = errosPorCampo(resultado.error)
        setErros(mapa)
        if (mapa[""]) setErroGeral(mapa[""])
        return
      }

      const sucesso = await atualizarSala(salaEditando.id, resultado.data)

      if (sucesso) fecharFormulario()
    }
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Gerencie todas as salas do coworking. Salas inativas aparecem em cinza.
        </p>

        {!modoForm && (
          <Button type="button" onClick={abrirCriacao}>
            Nova sala
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

      {modoForm && (
        <AdminSalaForm
          titulo={modoForm === "criar" ? "Nova sala" : "Editar sala"}
          form={form}
          erros={erros}
          erroGeral={erroGeral}
          enviando={salvando}
          onSubmit={handleSubmit}
          onCancelar={fecharFormulario}
          onCampoChange={atualizarCampo}
        />
      )}

      {carregando ? (
        <p className="text-muted-foreground">Carregando salas...</p>
      ) : salas.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma sala cadastrada.</p>
      ) : (
        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {salas.map((sala) => (
            <AdminSalaCard
              key={sala.id}
              sala={sala}
              processando={processandoId === sala.id}
              onEditar={abrirEdicao}
              onDesativar={desativarSala}
              onReativar={reativarSala}
            />
          ))}
        </div>
      )}
    </div>
  )
}
