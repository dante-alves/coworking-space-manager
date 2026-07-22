import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { auth } from "../middlewares/authMiddleware.js";
import * as reservaController from '../controllers/reservaController.js';
import { criarReservaSchema, idReservaSchema, listarReservasQuerySchema,  } from "../validators/reservaSchema.js";

const router = Router();

/**
 * @openapi
 * /reservas:
 *   get:
 *     tags:
 *       - Reservas
 *     summary: Listar reservas confirmadas
 *     description: Cliente vê só as próprias; admin filtra por query
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: idUsuario
 *         description: Só admin — filtra reservas de um cliente
 *         schema:
 *           type: integer
 *           example: 2
 *       - in: query
 *         name: idSala
 *         description: Só admin — filtra reservas de uma sala
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: dia
 *         description: Só admin — filtra por dia
 *         schema:
 *           type: string
 *           format: date
 *           example: "2026-07-22"
 *     responses:
 *       '200':
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                 reservas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reserva'
 */
router.get('/reservas', auth, validate(listarReservasQuerySchema, 'query'), reservaController.listar);

/**
 * @openapi
 * /reservas:
 *   post:
 *     tags:
 *       - Reservas
 *     summary: Criar reserva
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idSala
 *               - dia
 *               - turno
 *             properties:
 *               idSala:
 *                 type: integer
 *                 example: 1
 *               dia:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-22"
 *               turno:
 *                 type: string
 *                 enum:
 *                   - M
 *                   - T
 *                   - N
 *                 example: M
 *               idUsuario:
 *                 type: integer
 *                 description: Opcional — só admin (reserva em nome de cliente)
 *     responses:
 *       '201':
 *         description: Reserva criada
 *       '400':
 *         description: Dia/turno inválido ou fora do prazo
 *       '404':
 *         description: Sala/usuário não encontrado
 *       '409':
 *         description: Turno já reservado
 */
router.post('/reservas', auth, validate(criarReservaSchema, 'body'), reservaController.criar);

/**
 * @openapi
 * /reservas/{id}:
 *   delete:
 *     tags:
 *       - Reservas
 *     summary: Cancelar reserva
 *     description: Cliente só a própria; admin qualquer uma
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Cancelada (status cancelada)
 *       '403':
 *         description: Sem permissão
 *       '404':
 *         description: Não encontrada ou já cancelada
 */
router.delete('/reservas/:id', auth, validate(idReservaSchema, 'params'), reservaController.deletar);

export default router;
