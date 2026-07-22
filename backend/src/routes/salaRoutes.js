import { Router } from "express";
import * as salaController from '../controllers/salaController.js'
import { adminOnly, auth } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { atualizarSalaSchema, criarSalaSchema, idSalaSchema, listarSalasQuerySchema } from "../validators/salaSchemas.js";

const router = Router();

/**
 * @openapi
 * /salas:
 *   get:
 *     tags:
 *       - Salas
 *     summary: Listar salas
 *     description: Com dia/turno filtra disponíveis; admin sem dia vê todas (só enviar sem query para ver todas)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: dia
 *         schema:
 *           type: string
 *           format: date
 *           example: "2026-07-22"
 *       - in: query
 *         name: turno
 *         schema:
 *           type: string
 *           enum:
 *             - M
 *             - T
 *             - N
 *         examples:
 *           manha:
 *             summary: Manhã
 *             value: M
 *           tarde:
 *             summary: Tarde
 *             value: T
 *           noite:
 *             summary: Noite
 *             value: N
 *     responses:
 *       '200':
 *         description: Lista de salas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                 salas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                       capacidade:
 *                         type: integer
 *                       precoLocacao:
 *                         type: number
 *                       isActive:
 *                         type: boolean
 *                       turnos:
 *                         $ref: '#/components/schemas/TurnoStatus'
 *       '400':
 *         description: Cliente sem dia ou turno sem dia
 */
router.get('/salas', auth, validate(listarSalasQuerySchema, 'query'), salaController.listar);

/**
 * @openapi
 * /salas:
 *   post:
 *     tags:
 *       - Salas
 *     summary: Criar sala (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - capacidade
 *               - precoLocacao
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Sala 101
 *               capacidade:
 *                 type: integer
 *                 example: 10
 *               precoLocacao:
 *                 type: number
 *                 example: 50
 *               descricao:
 *                 type: string
 *                 example: Sala para reuniões
 *     responses:
 *       '201':
 *         description: Sala criada
 *       '403':
 *         description: Não admin
 *       '409':
 *         description: Nome duplicado
 */
router.post('/salas', auth, adminOnly, validate(criarSalaSchema, 'body'), salaController.criar);

/**
 * @openapi
 * /salas/{id}:
 *   put:
 *     tags:
 *       - Salas
 *     summary: Atualizar sala (admin)
 *     description: isActive true reativa; desativar só via DELETE
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               capacidade:
 *                 type: integer
 *               precoLocacao:
 *                 type: number
 *               descricao:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *                 description: true para reativar sala
 *     responses:
 *       '200':
 *         description: Sala atualizada
 *       '400':
 *         description: isActive false ou sala já ativa
 *       '403':
 *         description: Não admin
 *       '404':
 *         description: Não encontrada
 */
router.put('/salas/:id', auth, adminOnly, validate(idSalaSchema,'params'), validate(atualizarSalaSchema, 'body'), salaController.atualizar);

/**
 * @openapi
 * /salas/{id}:
 *   delete:
 *     tags:
 *       - Salas
 *     summary: Desativar sala (admin)
 *     description: Soft delete + cancela reservas futuras
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
 *         description: OK — reservasCanceladas
 *       '403':
 *         description: Não admin
 *       '404':
 *         description: Não encontrada
 */
router.delete('/salas/:id', auth, adminOnly, validate(idSalaSchema, 'params'), salaController.deletar);

export default router;
