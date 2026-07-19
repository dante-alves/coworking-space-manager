import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController.js';
import { adminOnly, auth, authOpcional } from '../middlewares/authMiddleware.js';
import {
  atualizarUsuarioSchema,
  criarUsuarioSchema,
  idUsuarioSchema,
  listarUsuariosQuerySchema,
} from '../validators/usuarioSchemas.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

router.get('/usuarios', auth, adminOnly, validate(listarUsuariosQuerySchema, 'query'), usuarioController.listar);
router.post('/usuarios', authOpcional, validate(criarUsuarioSchema, 'body'), usuarioController.criar);
router.get('/usuarios/:id', auth, adminOnly, validate(idUsuarioSchema, 'params'), usuarioController.getById);
router.put('/usuarios/:id',auth,validate(idUsuarioSchema, 'params'),validate(atualizarUsuarioSchema, 'body'),usuarioController.atualizar);
router.delete('/usuarios/:id', auth,validate(idUsuarioSchema, 'params'),usuarioController.deletar);

export default router;
