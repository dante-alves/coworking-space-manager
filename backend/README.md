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
      rateLimitMiddleware.js   # limites global + auth
    validators/
    utils/
```

## Segurança

- **Helmet** — `app.js` (headers HTTP)
- **Rate limit global** — 100 req/min por IP em todas as rotas
- **Rate limit por rota** — `/login`, `/usuarios` (POST), `/refresh` (ver tabela abaixo)
- **Store** — Redis (`rate-limit-redis`), prefixos `rl:global:`, `rl:login:`, etc.
- **429** — `TooManyRequestsError` → `errorHandler`

| Middleware | Rota | Limite | Janela |
|------------|------|--------|--------|
| `globalRateLimit` | todas | 100/IP | 1 min |
| `loginRateLimit` | `POST /login` | 10/IP+email | 15 min |
| `cadastroRateLimit` | `POST /usuarios` | 5/IP | 1 h |
| `refreshRateLimit` | `POST /refresh` | 30/IP | 15 min |

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

### Principais rotas

Envie `Authorization: Bearer <accessToken>` nas rotas autenticadas.

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/login` | Login — retorna `accessToken` + cookie `httpOnly` de refresh |
| POST | `/logout` | Revoga o refresh token e limpa o cookie |
| POST | `/refresh` | Renova o `accessToken` a partir do cookie de refresh |
| POST | `/usuarios` | Cadastro (público; admin autenticado pode enviar `eAdmin`) |
| GET | `/usuarios` | Listar usuários (**admin**) |
| GET | `/usuarios/:id` | Buscar usuário por id |
| PUT | `/usuarios/:id` | Atualizar nome/telefone |
| DELETE | `/usuarios/:id` | Desativar conta (soft delete) |
| GET | `/salas` | Listar salas (com `dia`+`turno` filtra disponibilidade) |
| POST | `/salas` | Criar sala (**admin**) |
| PUT | `/salas/:id` | Atualizar sala (**admin**) |
| DELETE | `/salas/:id` | Desativar sala (**admin**; cancela reservas futuras) |
| GET | `/reservas` | Listar reservas (cliente vê só as próprias; admin filtra por query) |
| POST | `/reservas` | Criar reserva |
| DELETE | `/reservas/:id` | Cancelar reserva |
