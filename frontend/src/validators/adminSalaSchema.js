import { z } from "zod"

export const criarSalaSchema = z.object({
  nome: z.string().trim().min(1, "Nome da sala é obrigatório."),
  capacidade: z.coerce
    .number()
    .int("Capacidade deve ser um número inteiro.")
    .positive("Capacidade deve ser maior que zero."),
  precoLocacao: z.coerce
    .number()
    .positive("Preço deve ser maior que zero."),
  descricao: z.string().trim().optional(),
})

export const editarSalaSchema = z
  .object({
    nome: z.string().trim().optional(),
    capacidade: z.coerce
      .number()
      .int("Capacidade deve ser um número inteiro.")
      .positive("Capacidade deve ser maior que zero.")
      .optional(),
    precoLocacao: z.coerce
      .number()
      .positive("Preço deve ser maior que zero.")
      .optional(),
    descricao: z.string().trim().optional(),
  })
  .transform((data) => {
    const dadosParaAtualizar = {}

    if (data.nome !== undefined && data.nome !== "") {
      dadosParaAtualizar.nome = data.nome
    }

    if (data.capacidade !== undefined) {
      dadosParaAtualizar.capacidade = data.capacidade
    }

    if (data.precoLocacao !== undefined) {
      dadosParaAtualizar.precoLocacao = data.precoLocacao
    }

    if (data.descricao !== undefined) {
      dadosParaAtualizar.descricao = data.descricao || undefined
    }

    return dadosParaAtualizar
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    "Informe ao menos um campo para alterar."
  )

export const salaParaFormulario = (sala) => ({
  nome: sala?.nome ?? "",
  capacidade: sala?.capacidade != null ? String(sala.capacidade) : "",
  precoLocacao: sala?.precoLocacao != null ? String(sala.precoLocacao) : "",
  descricao: sala?.descricao ?? "",
})

export const FORM_SALA_VAZIO = salaParaFormulario(null)
