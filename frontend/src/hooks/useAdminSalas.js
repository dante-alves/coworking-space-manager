import {
  atualizar,
  criar,
  desativar,
  listarTodas,
} from "@/services/salaService"
import { useCallback, useEffect, useState } from "react"

export function useAdminSalas() {
  const [salas, setSalas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [processandoId, setProcessandoId] = useState(null)
  const [feedback, setFeedback] = useState(null)

  const carregar = useCallback(async () => {
    setFeedback(null)

    try {
      setCarregando(true)

      const resposta = await listarTodas()
      setSalas(resposta.salas ?? [])
    } catch (erro) {
      setSalas([])
      setFeedback({
        tipo: "erro",
        mensagem: erro.response?.data?.mensagem ?? "Erro ao carregar salas.",
      })
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  async function criarSala(dados) {
    setFeedback(null)

    try {
      setSalvando(true)

      await criar(dados)

      setFeedback({ tipo: "sucesso", mensagem: "Sala criada com sucesso!" })
      await carregar()

      return true
    } catch (erro) {
      setFeedback({
        tipo: "erro",
        mensagem: erro.response?.data?.mensagem ?? "Erro ao criar sala.",
      })

      return false
    } finally {
      setSalvando(false)
    }
  }

  async function atualizarSala(id, dados) {
    setFeedback(null)

    try {
      setSalvando(true)

      await atualizar(id, dados)

      setFeedback({ tipo: "sucesso", mensagem: "Sala atualizada com sucesso!" })
      await carregar()

      return true
    } catch (erro) {
      setFeedback({
        tipo: "erro",
        mensagem: erro.response?.data?.mensagem ?? "Erro ao atualizar sala.",
      })

      return false
    } finally {
      setSalvando(false)
    }
  }

  async function desativarSala(id) {
    setFeedback(null)

    try {
      setProcessandoId(id)

      const resposta = await desativar(id)
      const total = resposta.reservasCanceladas ?? 0

      const mensagemReservas =
        total === 0
          ? "Nenhuma reserva futura foi cancelada."
          : total === 1
            ? "1 reserva futura foi cancelada."
            : `${total} reservas futuras foram canceladas.`

      setFeedback({
        tipo: "sucesso",
        mensagem: `Sala desativada com sucesso! ${mensagemReservas}`,
      })
      await carregar()

      return true
    } catch (erro) {
      setFeedback({
        tipo: "erro",
        mensagem: erro.response?.data?.mensagem ?? "Erro ao desativar sala.",
      })

      return false
    } finally {
      setProcessandoId(null)
    }
  }

  async function reativarSala(id) {
    setFeedback(null)

    try {
      setProcessandoId(id)

      await atualizar(id, { isActive: true })

      setFeedback({ tipo: "sucesso", mensagem: "Sala reativada com sucesso!" })
      await carregar()

      return true
    } catch (erro) {
      setFeedback({
        tipo: "erro",
        mensagem: erro.response?.data?.mensagem ?? "Erro ao reativar sala.",
      })

      return false
    } finally {
      setProcessandoId(null)
    }
  }

  function limparFeedback() {
    setFeedback(null)
  }

  return {
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
  }
}
