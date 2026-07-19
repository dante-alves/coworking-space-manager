import { ValidationError } from "../utils/errors.js";

export function validate(schema, origem = 'body') {
    return (req, res, next) => {
        const resultado = schema.safeParse(req[origem]) 

        if (!resultado.success) {
            const mensagem = resultado.error.issues[0].message; // pega a primeira mensagem de erro

            return next(new ValidationError(mensagem));
        }

        req[origem] = resultado.data; // já envia body/params/query validados + transformados

        next();
    };
}