# Backend — Coworking Space Manager

API REST em Node.js + Express.

## Estrutura

```
backend/
  server.js          # entrada
  loadEnv.js         # carrega ../.env (raiz do monorepo)
  prisma/            # schema, migrations, seed
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

## Scripts

Execute dentro de `backend/` ou use `npm run <script> --prefix backend` na raiz.

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | API com nodemon |
| `npm start` | API em produção |
| `npm run db:migrate` | Migrations (dev) |
| `npm run db:migrate:deploy` | Migrations (prod) |
| `npm run db:seed` | Admin inicial |
| `npm run db:studio` | Prisma Studio |

Na raiz do monorepo, os mesmos comandos funcionam via `npm run dev`, `npm run db:seed`, etc.

## Variáveis de ambiente

O `.env` fica na **raiz do monorepo** (`../.env`). Veja [.env.example](../.env.example).

Em produção (Render), configure as variáveis no painel — não há arquivo `.env`.

## Deploy (Render)

| Campo | Valor |
|-------|--------|
| **Root Directory** | `backend` |
| **Build** | `npm install && npx prisma generate && npx prisma migrate deploy` |
| **Start** | `npm start` |

## Documentação da API

Com a API rodando: [http://localhost:3000/docs](http://localhost:3000/docs)
