import { z } from "zod"
import { telefoneOpcionalSchema } from "@/validators/telefoneSchema"

export const editarUsuarioSchema = z
  .object({
    nome: z.string().trim().optional(),
    telefone: telefoneOpcionalSchema,
  })
  .transform((data) => {
    const dadosParaAtualizar = {}

    if (data.nome !== undefined && data.nome !== "") {
      dadosParaAtualizar.nome = data.nome
    }

    if (data.telefone !== undefined && data.telefone !== "") {
      dadosParaAtualizar.telefone = data.telefone
    }

    return dadosParaAtualizar
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    "Informe ao menos o nome ou telefone para alterar."
  )
