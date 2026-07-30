import { atualizarUsuarioSessao, limparSessao, obterUsuario } from "@/lib/auth-storage"
import { atualizar, buscarPorId, desativar } from "@/services/usuarioService"
import { errosPorCampo } from "@/validators/erroSchema"
import { editarUsuarioSchema } from "@/validators/editarUsuarioSchema"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function usePerfil() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState("")
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState({ nome: "", telefone: "" })
  const [erros, setErros] = useState({})
  const [erroGeral, setErroGeral] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [removendo, setRemovendo] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const carregar = useCallback(async () => {
    const sessao = obterUsuario()

    if (!sessao?.id) {
      setErro("Usuário não encontrado na sessão.")
      setCarregando(false)
      return
    }

    try {
      setCarregando(true)
      setErro("")

      const resposta = await buscarPorId(sessao.id)
      setUsuario(resposta.usuario)
    } catch (e) {
      setErro(e.response?.data?.mensagem ?? "Erro ao carregar perfil.")
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  function iniciarEdicao() {
    if (!usuario) return

    setForm({ nome: usuario.nome, telefone: usuario.telefone })
    setErros({})
    setErroGeral("")
    setFeedback(null)
    setEditando(true)
  }

  function cancelarEdicao() {
    setEditando(false)
    setErros({})
    setErroGeral("")
  }

  function atualizarCampo(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }))
  }

  async function salvarEdicao(e) {
    e.preventDefault()
    setErros({})
    setErroGeral("")
    setFeedback(null)

    const resultado = editarUsuarioSchema.safeParse(form)

    if (!resultado.success) {
      const mapa = errosPorCampo(resultado.error)
      setErros(mapa)
      if (mapa[""]) setErroGeral(mapa[""])
      return
    }

    try {
      setEnviando(true)

      const resposta = await atualizar(usuario.id, resultado.data)
      const usuarioAtualizado = { ...usuario, ...resposta.usuario }

      setUsuario(usuarioAtualizado)
      atualizarUsuarioSessao({
        nome: usuarioAtualizado.nome,
        telefone: usuarioAtualizado.telefone,
      })

      setEditando(false)
      setFeedback({ tipo: "sucesso", mensagem: "Perfil atualizado com sucesso!" })
    } catch (e) {
      setErroGeral(e.response?.data?.mensagem ?? "Erro ao atualizar perfil.")
    } finally {
      setEnviando(false)
    }
  }

  async function removerConta() {
    if (!usuario) return false

    setFeedback(null)

    try {
      setRemovendo(true)

      await desativar(usuario.id)
      limparSessao()
      navigate("/login", { replace: true })

      return true
    } catch (e) {
      setFeedback({
        tipo: "erro",
        mensagem: e.response?.data?.mensagem ?? "Erro ao remover conta.",
      })

      return false
    } finally {
      setRemovendo(false)
    }
  }

  function limparFeedback() {
    setFeedback(null)
  }

  return {
    usuario,
    carregando,
    erro,
    editando,
    form,
    erros,
    erroGeral,
    enviando,
    removendo,
    feedback,
    iniciarEdicao,
    cancelarEdicao,
    salvarEdicao,
    atualizarCampo,
    removerConta,
    limparFeedback,
  }
}
