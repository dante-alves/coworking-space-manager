import { z } from "zod"

export const FILTROS_RESERVAS_VAZIOS = {
  idUsuario: "",
  idSala: "",
  dia: "",
}

export const filtrosReservasAdminSchema = z.object({
  idUsuario: z
    .union([z.literal(""), z.coerce.number().int().positive()])
    .optional(),
  idSala: z.union([z.literal(""), z.coerce.number().int().positive()]).optional(),
  dia: z.union([z.literal(""), z.string().date("Dia inválido.")]).optional(),
})

export function montarParamsFiltrosReservas(filtros) {
  const params = {}

  if (filtros.idUsuario) params.idUsuario = Number(filtros.idUsuario)
  if (filtros.idSala) params.idSala = Number(filtros.idSala)
  if (filtros.dia) params.dia = filtros.dia

  return params
}

export const criarReservaAdminSchema = z.object({
  idSala: z.coerce.number().int().positive("Selecione uma sala."),
  idUsuario: z.coerce.number().int().positive("Selecione um cliente."),
  dia: z.string().date("Dia inválido."),
  turno: z.enum(["M", "T", "N"], {
    errorMap: () => ({ message: "Turno inválido." }),
  }),
})

export const FORM_RESERVA_VAZIO = {
  idSala: "",
  idUsuario: "",
  dia: "",
  turno: "M",
}
