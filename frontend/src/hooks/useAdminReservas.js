import { cancelar, criar, listar } from "@/services/reservaService"
import { listar as listarUsuarios } from "@/services/usuarioService"
import { listarTodas } from "@/services/salaService"
import {
  FILTROS_RESERVAS_VAZIOS,
  montarParamsFiltrosReservas,
} from "@/validators/adminReservaSchema"
import { useCallback, useEffect, useState } from "react"

export function useAdminReservas() {
  const [reservas, setReservas] = useState([])
  const [salas, setSalas] = useState([])
  const [clientes, setClientes] = useState([])
  const [filtros, setFiltros] = useState(FILTROS_RESERVAS_VAZIOS)
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [cancelandoId, setCancelandoId] = useState(null)
  const [feedback, setFeedback] = useState(null)

  const carregarOpcoes = useCallback(async () => {
    try {
      const [respostaSalas, respostaUsuarios] = await Promise.all([
        listarTodas(),
        listarUsuarios(1, ""),
      ])

      setSalas(respostaSalas.salas ?? [])
      setClientes(
        (respostaUsuarios.usuarios ?? []).filter(
          (usuario) => !usuario.eAdmin && usuario.isActive
        )
      )
    } catch {
      setSalas([])
      setClientes([])
    }
  }, [])

  const carregarReservas = useCallback(async () => {
    setFeedback(null)

    try {
      setCarregando(true)

      const params = montarParamsFiltrosReservas(filtros)
      const resposta = await listar(params)

      setReservas(resposta.reservas ?? [])
    } catch (erro) {
      setReservas([])
      setFeedback({
        tipo: "erro",
        mensagem: erro.response?.data?.mensagem ?? "Erro ao carregar reservas.",
      })
    } finally {
      setCarregando(false)
    }
  }, [filtros])

  useEffect(() => {
    carregarOpcoes()
  }, [carregarOpcoes])

  useEffect(() => {
    carregarReservas()
  }, [carregarReservas])

  function atualizarFiltro(campo, valor) {
    setFiltros((f) => ({ ...f, [campo]: valor }))
  }

  function limparFiltros() {
    setFiltros(FILTROS_RESERVAS_VAZIOS)
  }

  async function criarReserva(dados) {
    setFeedback(null)

    try {
      setSalvando(true)

      await criar(dados)

      setFeedback({ tipo: "sucesso", mensagem: "Reserva criada com sucesso!" })
      await carregarReservas()

      return true
    } catch (erro) {
      setFeedback({
        tipo: "erro",
        mensagem: erro.response?.data?.mensagem ?? "Erro ao criar reserva.",
      })

      return false
    } finally {
      setSalvando(false)
    }
  }

  async function cancelarReserva(id) {
    setFeedback(null)

    try {
      setCancelandoId(id)

      await cancelar(id)

      setFeedback({
        tipo: "sucesso",
        mensagem: "Reserva cancelada com sucesso!",
      })
      await carregarReservas()

      return true
    } catch (erro) {
      setFeedback({
        tipo: "erro",
        mensagem: erro.response?.data?.mensagem ?? "Erro ao cancelar reserva.",
      })

      return false
    } finally {
      setCancelandoId(null)
    }
  }

  function limparFeedback() {
    setFeedback(null)
  }

  const salasAtivas = salas.filter((sala) => sala.isActive)

  return {
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
  }
}
