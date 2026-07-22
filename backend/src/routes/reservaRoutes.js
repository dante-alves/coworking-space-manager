import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { auth } from "../middlewares/authMiddleware.js";
import * as reservaController from '../controllers/reservaController.js';
import { criarReservaSchema, idReservaSchema, listarReservasQuerySchema,  } from "../validators/reservaSchema.js";


const router = Router();

router.post('/reservas', auth, validate(criarReservaSchema, 'body'), reservaController.criar);
router.get('/reservas', auth, validate(listarReservasQuerySchema, 'query'), reservaController.listar);
router.delete('/reservas/:id', auth, validate(idReservaSchema, 'params'), reservaController.deletar);

export default router;