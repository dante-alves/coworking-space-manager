import { AppError } from '../utils/errors.js';

export function errorHandler(erro, req, res, next) {
  // erros esperados
  if (erro instanceof AppError) {
    return res.status(erro.statusCode).json({
      sucesso: false,
      mensagem: erro.message,
    });
  }
  // erros não esperados
  console.error(erro);
  return res.status(500).json({
    sucesso: false,
    mensagem: 'Erro interno do servidor',
  });
}
