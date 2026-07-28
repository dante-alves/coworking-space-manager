import { z } from 'zod';

const enderecoSchema = z.object({
    rua: z.string().trim().min(1, 'Rua é obrigatória.'),
    numero: z.string().trim().min(1, 'Número é obrigatório.'),
    complemento: z.string().optional(), // opcional na spec
    bairro: z.string().trim().min(1, 'Bairro é obrigatório.'),
    cep: z.string().trim().min(1, 'CEP é obrigatório.'),
    cidade: z.string().trim().min(1, 'Cidade é obrigatória.'),
    uf: z.string().trim().min(1, 'UF é obrigatória.'),
});

export const cadastroFormSchema = z.object({
    nome: z.string().trim().min(1, 'Nome é obrigatório.'),
    email: z.string().trim().min(1, 'Email é obrigatório.').email('Formato de email inválido.'),
    senha: z
        .string()
        .min(1, 'Senha é obrigatória.')
        .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        'A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula e um número.'
        ),
    confirmarSenha: z.string().trim().min(1, 'Confirme sua senha'),
    telefone: z.string().trim().min(1, 'Telefone é obrigatório.'),
    cpf: z
        .string()
        .trim()
        .min(1, 'CPF é obrigatório.')
        .transform((valor) => valor.replace(/\D/g, '')) // limpa pontos/traço
        .refine((valor) => valor.length === 11, 'O CPF deve conter 11 dígitos.'),
    endereco: enderecoSchema,
    })
    .refine((dados) => dados.senha === dados.confirmarSenha, {
        message: 'As senhas não coincidem.',
        path: ['confirmarSenha'],
    })
    ;

export function montarPayloadCadastro(dados) {
    const { confirmarSenha, endereco, ...resto } = dados;
    return {
        ...resto,
        endereco: {
            ...endereco,
            complemento: endereco.complemento || undefined,
        },
    };
}
