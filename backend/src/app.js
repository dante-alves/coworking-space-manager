import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import { setupSwagger } from './config/swagger.js';



const app = express();

app.use(cors());
app.use(express.json());

// Configuração do Swagger -> se fosse projeto em produção, eu deveria ter um cuidado para não expor a documentação do swagger para o público
setupSwagger(app);

app.use('/', routes);
app.use(errorHandler);

export default app;
