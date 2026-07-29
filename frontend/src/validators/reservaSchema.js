import { z } from "zod"

export const criarReservaSchema = z.object({
  idSala: z.number().int().positive("Sala inválida."),
  dia: z.string().date("Dia inválido."),
  turno: z.enum(["M", "T", "N"]),
})