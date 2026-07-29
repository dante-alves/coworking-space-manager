import { z } from "zod"

export const filtroSalasSchema = z.object({
  dia: z.string().date("Dia inválido."),
  turno: z.enum(["M", "T", "N"], {
    errorMap: () => ({ message: "Turno inválido." }),
  }),
})