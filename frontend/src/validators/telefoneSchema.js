import { z } from "zod"

export const telefoneSchema = z
  .string()
  .trim()
  .min(1, "Telefone é obrigatório.")
  .transform((valor) => valor.replace(/\D/g, ""))
  .refine(
    (valor) => valor.length === 10 || valor.length === 11,
    "Telefone deve ter 10 ou 11 dígitos."
  )
  .refine((valor) => {
    const ddd = Number(valor.slice(0, 2))
    return ddd >= 11 && ddd <= 99
  }, "DDD inválido.")
  .refine(
    (valor) => valor.length !== 11 || valor[2] === "9",
    "Celular deve começar com 9 após o DDD."
  )

export const telefoneOpcionalSchema = z.preprocess(
  (valor) => {
    if (valor === undefined || valor === null) return undefined
    if (typeof valor === "string" && valor.trim() === "") return undefined
    return valor
  },
  telefoneSchema.optional()
)
