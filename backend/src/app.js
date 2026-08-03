import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import { setupSwagger } from './config/swagger.js';
import helmet from 'helmet';
import { globalRateLimit } from './middlewares/rateLimitMiddleware.js';
const app = express();

app.set('trust proxy', 1);
app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use(globalRateLimit);

// Configuração do Swagger -> se fosse projeto em produção real, eu deveria ter um cuidado para não expor a documentação do swagger para o público
setupSwagger(app);

app.use('/', routes);
app.use(errorHandler);

export default app;
