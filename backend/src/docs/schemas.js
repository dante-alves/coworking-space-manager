/**
 * @openapi
 * components:
 *   schemas:
 *     Erro:
 *       type: object
 *       properties:
 *         sucesso:
 *           type: boolean
 *           example: false
 *         mensagem:
 *           type: string
 *           example: Dados inválidos
 *
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *         telefone:
 *           type: string
 *         cpf:
 *           type: string
 *         eAdmin:
 *           type: boolean
 *         isActive:
 *           type: boolean
 *
 *     Endereco:
 *       type: object
 *       required:
 *         - rua
 *         - numero
 *         - bairro
 *         - cep
 *         - cidade
 *         - uf
 *       properties:
 *         rua:
 *           type: string
 *         numero:
 *           type: string
 *         complemento:
 *           type: string
 *         bairro:
 *           type: string
 *         cep:
 *           type: string
 *         cidade:
 *           type: string
 *         uf:
 *           type: string
 *
 *     TurnoStatus:
 *       type: object
 *       properties:
 *         M:
 *           type: string
 *           enum:
 *             - disponivel
 *             - ocupado
 *             - indisponivel
 *         T:
 *           type: string
 *           enum:
 *             - disponivel
 *             - ocupado
 *             - indisponivel
 *         N:
 *           type: string
 *           enum:
 *             - disponivel
 *             - ocupado
 *             - indisponivel
 *
 *     Reserva:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         idSala:
 *           type: integer
 *         nomeSala:
 *           type: string
 *         dia:
 *           type: string
 *           format: date
 *         turno:
 *           type: string
 *           enum:
 *             - M
 *             - T
 *             - N
 */
