import { Router } from 'express';
import usuarioRoutes from './usuarioRoutes.js';
import salaRoutes from './salaRoutes.js';
import reservaRoutes from './reservaRoutes.js';
const routes = Router();

routes.use(usuarioRoutes);
routes.use(salaRoutes);
routes.use(reservaRoutes)

export default routes;
