import salaService from "../services/salaService.js";

export async function criar(req, res, next) {
    
    try {
        const dados = req.body;

        const salaCriada = await salaService.criar(dados);

        return res.status(201).json({
            sucesso: true,
            sala: salaCriada
        });
    } catch(erro) {
        next(erro);
    }
}

export async function listar(req, res, next) {
    
    try {
        const { dia, turno } = req.validatedQuery;
        const solicitanteEhAdmin = req.usuario?.eAdmin === true;


        const salas = await salaService.listar(dia, turno, solicitanteEhAdmin);

        return res.status(200).json({
             sucesso: true,
             salas,
        });
    } catch(erro) {
        next(erro);
    }
}

export async function atualizar(req, res, next) {

    try {
        const { id } = req.params;

        const salaAtualizada = await salaService.atualizar(id, req.body);

        return res.status(200).json({
            sucesso: true,
            sala: salaAtualizada,
        });

    } catch (erro) {
        next(erro);
    }
}


export async function deletar(req, res, next) {

    try {
        const { id } = req.params;

        const resultado = await salaService.deletar(id);

        return res.status(200).json({
            sucesso: true,
            reservasCanceladas: resultado.reservasCanceladas,
        });
    } catch(erro) {
        next(erro);
    }
}