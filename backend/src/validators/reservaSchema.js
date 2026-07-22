import { z } from "zod";

export const criarReservaSchema = z.object({
    idSala: z.coerce.number().int().positive(),
    dia: z.string().date('Dia inválido. Use YYYY-MM-DD.'),
    turno: z.enum(['M', 'T', 'N']),
    idUsuario: z.coerce.number().int().positive().optional(),
})

export const listarReservasQuerySchema = z.object({
  idUsuario: z.coerce.number().int().positive().optional(),
  idSala: z.coerce.number().int().positive().optional(),
  dia: z.string().date('Dia inválido. Use YYYY-MM-DD.').optional(),
});

export const idReservaSchema = z.object({
    id: z.coerce.number().int().positive('ID inválido.'),
})