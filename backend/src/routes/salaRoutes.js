import { Router } from "express";
import * as salaController from '../controllers/salaController.js'
import { adminOnly, auth } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { atualizarSalaSchema, criarSalaSchema, idSalaSchema, listarSalasQuerySchema } from "../validators/salaSchemas.js";

const router = Router();

router.post('/salas', auth, adminOnly, validate(criarSalaSchema, 'body'), salaController.criar);
router.get('/salas', auth, validate(listarSalasQuerySchema, 'query'), salaController.listar);
router.put('/salas/:id', auth, adminOnly, validate(idSalaSchema,'params'), validate(atualizarSalaSchema, 'body'), salaController.atualizar);
router.delete('/salas/:id', auth, adminOnly, validate(idSalaSchema, 'params'), salaController.deletar); 
    
export default router;