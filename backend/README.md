# Backend — Coworking Space Manager

API REST em Node.js + Express.

## Estrutura

```
backend/
  server.js          # entrada
  src/
    app.js           # Express, CORS, cookies
    config/          # Prisma, Redis, Swagger
    controllers/
    services/
    routes/
    middlewares/
    validators/
    utils/
```

## Scripts (raiz do monorepo)

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | API com nodemon |
| `npm start` | API em produção |
| `npm run db:migrate` | Migrations (dev) |
| `npm run db:migrate:deploy` | Migrations (prod) |
| `npm run db:seed` | Admin inicial |

## Variáveis de ambiente

Todas ficam no **`.env` na raiz do repositório** — veja [.env.example](../.env.example) e o [README principal](../README.md).

Principais: `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, `FRONTEND_URL`, `NODE_ENV`.

## Documentação da API

Com a API rodando: [http://localhost:3000/docs](http://localhost:3000/docs)
