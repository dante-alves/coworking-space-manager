import { ValidationError } from "../utils/errors.js";

export function validate(schema, origem = 'body') {
    return (req, res, next) => {
        const resultado = schema.safeParse(req[origem]) 

        if (!resultado.success) {
            const mensagem = resultado.error.issues[0].message; // pega a primeira mensagem de erro

            return next(new ValidationError(mensagem));
        }

        if (origem === 'query') {
            req.validatedQuery = resultado.data; // fiz isso por conta de um erro pois query não é editável. --> Se o validate tentasse sobrescrever req[query] ia dar 500 Internal Server Error
        }
        else {
            req[origem] = resultado.data; // já envia body/params/validados + transformados
        }

        next();
    };
}