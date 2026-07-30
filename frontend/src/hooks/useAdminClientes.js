import { buscarPorId, desativar, listar } from "@/services/usuarioService"
import { useCallback, useEffect, useState } from "react"

export function useAdminClientes() {
  const [clientes, setClientes] = useState([])
  const [paginacao, setPaginacao] = useState(null)
  const [pagina, setPagina] = useState(1)
  const [buscaInput, setBuscaInput] = useState("")
  const [busca, setBusca] = useState("")
  const [carregando, setCarregando] = useState(true)
  const [processandoId, setProcessandoId] = useState(null)
  const [carregandoDetalhe, setCarregandoDetalhe] = useState(false)
  const [clienteDetalhe, setClienteDetalhe] = useState(null)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setBusca(buscaInput.trim())
      setPagina(1)
    }, 400)

    return () => clearTimeout(timer)
  }, [buscaInput])

  const carregar = useCallback(async () => {
    setFeedback(null)

    try {
      setCarregando(true)

      const resposta = await listar(pagina, busca, { apenasClientes: true })

      setClientes(resposta.usuarios ?? [])
      setPaginacao(resposta.paginacao ?? null)
    } catch (erro) {
      setClientes([])
      setPaginacao(null)
      setFeedback({
        tipo: "erro",
        mensagem: erro.response?.data?.mensagem ?? "Erro ao carregar clientes.",
      })
    } finally {
      setCarregando(false)
    }
  }, [pagina, busca])

  useEffect(() => {
    carregar()
  }, [carregar])

  async function verDetalhes(id) {
    setFeedback(null)

    try {
      setCarregandoDetalhe(true)

      const resposta = await buscarPorId(id)
      setClienteDetalhe(resposta.usuario)
    } catch (erro) {
      setClienteDetalhe(null)
      setFeedback({
        tipo: "erro",
        mensagem: erro.response?.data?.mensagem ?? "Erro ao carregar cliente.",
      })
    } finally {
      setCarregandoDetalhe(false)
    }
  }

  function fecharDetalhes() {
    setClienteDetalhe(null)
  }

  async function desativarCliente(id) {
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
        mensagem: `Cliente desativado com sucesso! ${mensagemReservas}`,
      })

      if (clienteDetalhe?.id === id) {
        setClienteDetalhe(null)
      }

      await carregar()

      return true
    } catch (erro) {
      setFeedback({
        tipo: "erro",
        mensagem: erro.response?.data?.mensagem ?? "Erro ao desativar cliente.",
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
    clientes,
    paginacao,
    pagina,
    setPagina,
    buscaInput,
    setBuscaInput,
    carregando,
    processandoId,
    carregandoDetalhe,
    clienteDetalhe,
    feedback,
    verDetalhes,
    fecharDetalhes,
    desativarCliente,
    limparFeedback,
  }
}
