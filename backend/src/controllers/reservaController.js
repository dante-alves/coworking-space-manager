import reservaService from "../services/reservaService.js";

export async function criar(req, res, next) {

    try {
        
        const { idSala, dia, turno, idUsuario: idUsuarioBody } = req.body;

        const solicitante = req.usuario;

        let idUsuario;

        if (solicitante.eAdmin === true) {
            idUsuario = idUsuarioBody ?? solicitante.id; // se idUsuarioBody vier undefined, recebe o id do solicitante 
        } else {
            // cliente sempre ignora o body, só pode modificar as próprias reservas.
            idUsuario = solicitante.id;
        }

        const dados = {
            idSala,
            dia,
            turno,
            idUsuario
        };

        const reservaCriada = await reservaService.criar(dados)
        
        return res.status(201).json({
            sucesso: true,
            reserva: reservaCriada
        });
    } catch(erro) {
        next(erro);
    }
}

export async function listar(req, res, next) {

    try {
        const { idUsuario, idSala, dia } = req.validatedQuery;
        const solicitante = req.usuario;
        const solicitanteEhAdmin = solicitante.eAdmin === true;

        const dados = {
            idUsuario: solicitanteEhAdmin ? idUsuario : undefined,
            idSala: solicitanteEhAdmin ? idSala : undefined,
            dia: solicitanteEhAdmin ? dia : undefined, // ou dia para ambos - depois decido isso
            solicitanteEhAdmin,
            idSolicitante: solicitante.id,
        };

        const reservas = await reservaService.listar(dados);

        return res.status(200).json({
            sucesso: true,
            reservas: reservas,
        });
    } catch(erro) {
        next(erro);
    }
}

export async function deletar(req, res, next) {

    try {
        const { id } = req.params;

        await reservaService.deletar(id, req.usuario);

        return res.status(200).json({
            sucesso: true,
        });
    } catch(erro) {
        next(erro);
    }
}