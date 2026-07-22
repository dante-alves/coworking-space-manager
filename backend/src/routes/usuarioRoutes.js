import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController.js';
import { adminOnly, auth, authOpcional } from '../middlewares/authMiddleware.js';
import {
  atualizarUsuarioSchema,
  criarUsuarioSchema,
  idUsuarioSchema,
  listarUsuariosQuerySchema,
  loginUsuarioSchema,
} from '../validators/usuarioSchemas.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: dante.novo@teste.com
 *               senha:
 *                 type: string
 *                 example: Senha123
 *     responses:
 *       '200':
 *         description: OK — retorna accessToken e usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                 accessToken:
 *                   type: string
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       '401':
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.post('/login', validate(loginUsuarioSchema), usuarioController.login);

/**
 * @openapi
 * /usuarios:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cadastrar usuário
 *     description: Público; admin autenticado pode enviar eAdmin
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *               - telefone
 *               - cpf
 *               - endereco
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               telefone:
 *                 type: string
 *               cpf:
 *                 type: string
 *               eAdmin:
 *                 type: boolean
 *               endereco:
 *                 $ref: '#/components/schemas/Endereco'
 *     responses:
 *       '201':
 *         description: Criado — accessToken se auto-cadastro
 *       '409':
 *         description: Email/CPF duplicado
 */
router.post('/usuarios', authOpcional, validate(criarUsuarioSchema, 'body'), usuarioController.criar);

/**
 * @openapi
 * /usuarios:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Listar usuários (admin)
 *     description: |
 *       Query opcional: pagina (default 1) e busca.
 *       Ex.: /usuarios?pagina=1&busca=Dante
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           default: 1
 *           example: 1
 *       - in: query
 *         name: busca
 *         description: Filtra por nome, email ou CPF (busca parcial, case insensitive)
 *         schema:
 *           type: string
 *           example: Dante
 *         examples:
 *           porNome:
 *             summary: Por nome
 *             value: Dante
 *           porEmail:
 *             summary: Por email
 *             value: maria.cliente@teste.com
 *           porCpf:
 *             summary: Por CPF
 *             value: "12345678901"
 *     responses:
 *       '200':
 *         description: usuarios + paginacao
 *       '403':
 *         description: Não admin
 */
router.get('/usuarios', auth, adminOnly, validate(listarUsuariosQuerySchema, 'query'), usuarioController.listar);

/**
 * @openapi
 * /usuarios/{id}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Buscar usuário por ID
 *     description: Cliente só no próprio id; admin em qualquer id
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
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       '403':
 *         description: Sem permissão
 *       '404':
 *         description: Não encontrado
 */
router.get('/usuarios/:id', auth, validate(idUsuarioSchema, 'params'), usuarioController.getById);

/**
 * @openapi
 * /usuarios/{id}:
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Atualizar nome/telefone
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
 *                 example: Maria Silva
 *               telefone:
 *                 type: string
 *                 example: "11999998888"
 *     responses:
 *       '200':
 *         description: Usuário atualizado
 *       '400':
 *         description: Body vazio ou inválido
 *       '403':
 *         description: Sem permissão
 */
router.put('/usuarios/:id', auth, validate(idUsuarioSchema, 'params'), validate(atualizarUsuarioSchema, 'body'), usuarioController.atualizar);

/**
 * @openapi
 * /usuarios/{id}:
 *   delete:
 *     tags:
 *       - Usuários
 *     summary: Desativar conta (soft delete)
 *     description: Cliente no próprio id; admin no id do cliente (não no próprio)
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
 *         description: Sem permissão
 *       '404':
 *         description: Não encontrado
 */
router.delete('/usuarios/:id', auth, validate(idUsuarioSchema, 'params'), usuarioController.deletar);

export default router;
