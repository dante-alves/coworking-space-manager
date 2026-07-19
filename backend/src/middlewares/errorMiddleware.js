import { AppError } from '../utils/errors.js';

export function errorHandler(erro, req, res, next) {
  if (erro instanceof AppError) {
    return res.status(erro.statusCode).json({
      sucesso: false,
      mensagem: erro.message,
    });
  }

  console.error(erro);
  return res.status(500).json({
    sucesso: false,
    mensagem: 'Erro interno do servidor',
  });
}
