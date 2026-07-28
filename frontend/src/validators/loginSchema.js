import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z.string().trim().min(1, 'Email é obrigatório.').email('Formato de email inválido.'),
    senha: z.string().min(1, 'Senha é obrigatória.')
})

