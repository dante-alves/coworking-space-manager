import { z } from 'zod';

export const enderecoSchema = z.object({
    rua: z.string().trim().min(1, 'Rua é obrigatória.'),
    numero: z.string().trim().min(1, 'Número é obrigatório.'),
    complemento: z.string().optional(), // opcional na spec
    bairro: z.string().trim().min(1, 'Bairro é obrigatório.'),
    cep: z.string().trim().min(1, 'CEP é obrigatório.'),
    cidade: z.string().trim().min(1, 'Cidade é obrigatória.'),
    uf: z.string().trim().min(1, 'UF é obrigatória.'),
});