import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  cadastroFormSchema,
  montarPayloadCadastro,
} from "@/validators/cadastroSchema"
import {
  errosPorCampo
} from "@/validators/erroSchema"
import { cadastrar } from "@/services/usuarioService"
import { salvarSessao } from "@/lib/auth-storage"

const estadoInicial = {
  nome: "",
  email: "",
  senha: "",
  confirmarSenha: "",
  telefone: "",
  cpf: "",
  endereco: {
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cep: "",
    cidade: "",
    uf: "",
  },
};

export function useCadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState(estadoInicial);
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState("");
  const [enviando, setEnviando] = useState(false);

  function atualizarCampo(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }))
  }

  function atualizarEndereco(campo, valor) {
    setForm((f) => ({
      ...f,
      endereco: { ...f.endereco, [campo]: valor },
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErros({});
    setErroGeral("");

    const resultado = cadastroFormSchema.safeParse(form);

    if (!resultado.success) {
      setErros(errosPorCampo(resultado.error));
      return;
    }

    try {
      setEnviando(true);
      const payload = montarPayloadCadastro(resultado.data);
      const resposta = await cadastrar(payload);

      salvarSessao({
        accessToken: resposta.accessToken,
        usuario: resposta.usuario,
      });

      navigate("/salas");
    } catch (erro) {
      setErroGeral(
        erro.response?.data?.mensagem ?? "Erro ao realizar cadastro."
      );
    } finally {
      setEnviando(false);
    }
  }

  return {
    form,
    erros,
    erroGeral,
    enviando,
    atualizarCampo,
    atualizarEndereco,
    handleSubmit,
  };
}
