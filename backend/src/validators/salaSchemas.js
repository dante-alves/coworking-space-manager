import { z } from 'zod';

export const criarSalaSchema = z.object({
    nome: z.string().trim().min(1, 'Nome da sala é obrigatório'),
    capacidade: z.coerce.number().int().positive('A capacidade deve ser um número inteiro positivo'),
    descricao: z.string().trim().optional().transform(texto => texto === '' ? undefined : texto),
    precoLocacao: z.coerce.number().positive('O valor deve ser maior que 0'),
})

export const listarSalasQuerySchema = z.object({
  dia: z.string().date('Dia inválido. Use YYYY-MM-DD.').optional(),
  turno: z.enum(['M', 'T', 'N']).optional(),
}).refine(
  (data) => !data.turno || data.dia,
  'Informe o dia quando filtrar por turno.'
);

export const atualizarSalaSchema = z.object({
    nome: z.string().trim().optional(),
    capacidade: z.coerce.number().int().positive().optional(),
    descricao: z.string().trim().optional(),
    precoLocacao: z.coerce.number().positive().optional(),
})
    .strict()
    .transform((data) => {
        const dadosParaAtualizar = {};

        if (data.nome !== undefined && data.nome !== '') {
                dadosParaAtualizar.nome = data.nome;
            }

        if (data.capacidade !== undefined && data.capacidade !== '') {
            dadosParaAtualizar.capacidade = data.capacidade;
        }

        if (data.descricao !== undefined && data.descricao !== '') {
                dadosParaAtualizar.descricao = data.descricao;
            }

        if (data.precoLocacao !== undefined && data.precoLocacao !== '') {
            dadosParaAtualizar.precoLocacao = data.precoLocacao;
        }

        return dadosParaAtualizar;
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        'Informe ao menos um campo para alterar.'
    )


export const idSalaSchema = z.object({
    id: z.coerce.number().int().positive('ID inválido.'),
})