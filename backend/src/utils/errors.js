export class AppError extends Error {
  constructor(mensagem, statusCode) {
    super(mensagem);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(mensagem = 'Dados inválidos') {
    super(mensagem, 400);
  }
}

export class UnauthorizatedError extends AppError {
  constructor(mensagem = 'Não autorizado') {
    super(mensagem, 401);
  }
}

export class ForbbidenError extends AppError {
  constructor(mensagem = 'Acesso negado') {
    super(mensagem, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(mensagem = 'Recurso não encontrado') {
    super(mensagem, 404);
  }
}

export class ConflictError extends AppError {
  constructor(mensagem = 'Conflito com dado existente') {
    super(mensagem, 409);
  }
}
