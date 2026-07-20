import { z } from 'zod';
import { enderecoSchema } from './enderecoSchemas.js';

export const criarUsuarioSchema = z.object({
    nome: z.string().trim().min(1, 'Nome é obrigatório.'),
    email: z.string().trim().min(1, 'Email é obrigatório.').email('Formato de email inválido.'),
    senha: z
        .string()
        .min(1, 'Senha é obrigatória.')
        .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        'A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula e um número.'
        ),
    telefone: z.string().trim().min(1, 'Telefone é obrigatório.'),
    cpf: z
        .string()
        .trim()
        .min(1, 'CPF é obrigatório.')
        .transform((valor) => valor.replace(/\D/g, '')) // limpa pontos/traço
        .refine((valor) => valor.length === 11, 'O CPF deve conter 11 dígitos.'),
    endereco: enderecoSchema,
    eAdmin: z.boolean().optional(), // admin pode enviar
})

export const loginUsuarioSchema = z.object({
    email: z.string().trim().min(1, 'Email é obrigatório.').email('Formato de email inválido.'),
    senha: z.string().min(1, 'Senha é obrigatória.')
})

export const listarUsuariosQuerySchema = z.object({
    pagina: z.coerce.number().int().positive().optional().default(1),
    busca: z.string().optional().default(''),
});


export const atualizarUsuarioSchema = z.object({
    nome: z.string().trim().optional(),
    telefone: z.string().trim().optional(),
    })
    .strict() // rejeita outros campos
    .transform((data) => {
        const dadosParaAtualizar = {};

        if (data.nome !== undefined && data.nome !== '') {
            dadosParaAtualizar.nome = data.nome;
        }

        if (data.telefone !== undefined && data.telefone !== '') {
            dadosParaAtualizar.telefone = data.telefone;
        }

        return dadosParaAtualizar;
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        'Informe ao menos o nome ou telefone para alterar.'
    )
export const idUsuarioSchema = z.object({
    id: z.coerce.number().int().positive('ID inválido.'),
})

