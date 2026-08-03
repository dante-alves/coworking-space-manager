# Coworking Space Manager

Sistema que gerencia as alocações das salas de um coworking.

## Live demo

- **Frontend:** https://coworking-space-manager-sand.vercel.app
- **Backend / API:** https://coworking-space-manager.onrender.com
- **Swagger:** https://coworking-space-manager.onrender.com/docs

> No plano free do Render, a API "dorme" após um tempo sem tráfego — a primeira requisição depois disso pode demorar 30-60s (ou falhar e precisar de uma segunda tentativa). Isso é limitação de infraestrutura, não bug da aplicação.

## Pré-requisitos

- Node.js 20+
- npm
- PostgreSQL (local ou remoto, ex. Prisma Postgres/Supabase)
- Redis (local ou remoto, ex. Upstash) — usado para sessão (refresh token)

## Estrutura do monorepo

```
/
  .env                 # compartilhado (backend + Vite)
  backend/             # API + Prisma → Render
  frontend/            # React + Vite → Vercel
```

## Stack

**Backend:** Express 5, Prisma 5, PostgreSQL, Redis (ioredis), JWT + bcrypt, Zod, Swagger, Helmet, express-rate-limit — Render

**Frontend:** React 19, Vite, React Router 7, Axios, Tailwind CSS 4, shadcn/ui — Vercel

**Sessão:** access JWT curto + refresh token opaco no Redis (Upstash), entregue via cookie `httpOnly`

---

## Como criar um usuário administrador

Quem for testar a aplicação precisa de pelo menos **um admin** para acessar o painel (`/admin`).

### Opção 1 — Seed (recomendado)

Na raiz do projeto, com `DATABASE_URL` no `.env`:

```bash
npm run db:seed
```

(O script roda em `backend/` — veja [backend/README.md](backend/README.md).)

Isso cria (ou promove) um administrador **idempotente** — pode rodar várias vezes sem duplicar.

**Credenciais padrão:**

| Campo | Valor |
|-------|--------|
| Email | `admin@coworking.com` |
| Senha | `Admin123!` |

Personalize via variáveis de ambiente antes de rodar o seed:

```env
ADMIN_EMAIL=seu@email.com
ADMIN_SEED_PASSWORD=SuaSenha123 
ADMIN_NOME=Seu Nome
ADMIN_CPF=12345678901
ADMIN_TELEFONE=83999990000
```

Em **produção**, defina `ADMIN_SEED_PASSWORD` forte no Render e rode o seed **uma vez** (Shell do Render ou local apontando para o banco remoto):

```bash
npm run db:seed
```

### Opção 2 — Admin logado cria outro admin (API / Swagger)

Depois que já existe um admin:

1. Faça login e copie o `accessToken`
2. No Swagger (`/docs`) ou Insomnia: `POST /usuarios` com header `Authorization: Bearer <token>`
3. Envie o body de cadastro normal + `"eAdmin": true`

Somente um **admin autenticado** consegue definir `eAdmin: true` — cadastro público ignora esse campo.

## Desenvolvimento local

```bash
# instalar dependências
npm run install:all

# migrations e admin inicial
npm run db:migrate
npm run db:seed

# subir API e front (terminais separados)
npm run dev
npm run dev:front
```

Ou entre em cada pasta: `backend/` e `frontend/`.

### Variáveis de ambiente

Monorepo com **um único `.env` na raiz** (backend carrega via `loadEnv.js`; Vite via `envDir`):

```bash
cp .env.example .env
```

Preencha conforme [.env.example](.env.example). Só variáveis `VITE_*` vão para o browser.

Mais detalhes: [backend/README.md](backend/README.md) · [frontend/README.md](frontend/README.md)

---

## Deploy

| Serviço | Onde | Config |
|---------|------|--------|
| Postgres | Prisma | `DATABASE_URL` → Render |
| Redis | Upstash | `REDIS_URL` → Render |
| API | Render (**Root Directory: `backend`**) | build: `npm install && npx prisma generate && npx prisma migrate deploy` · start: `npm start` |
| Front | Vercel (**Root Directory: `frontend`**) | `VITE_API_URL` |

Após o deploy da API, configure `FRONTEND_URL` no Render com a URL exata da Vercel e faça redeploy.

Após o primeiro deploy do banco, rode `npm run db:seed` uma vez para criar o admin de teste.

## Segurança da API

Medidas alinhadas ao OWASP API Security (consumo ilimitado de recursos e proteção de rotas de autenticação):

### Helmet

Headers HTTP de segurança (`X-Content-Type-Options`, `X-Frame-Options`, etc.) aplicados globalmente em `backend/src/app.js`.

### Rate limiting (Redis)

Contadores persistidos no **mesmo Redis** do refresh token (`backend/src/middlewares/rateLimitMiddleware.js`). Respostas **`429`** seguem o padrão da API via `TooManyRequestsError` e o `errorHandler` (`{ sucesso: false, mensagem }`). Headers `RateLimit-*` informam limite e tempo de reset.

| Escopo | Rota(s) | Limite | Janela |
|--------|---------|--------|--------|
| Global | Todas | 100 req/IP | 1 min |
| Login | `POST /login` | 10 req/IP+email | 15 min |
| Cadastro | `POST /usuarios` | 5 req/IP | 1 h |
| Refresh | `POST /refresh` | 30 req/IP | 15 min |

Rotas sensíveis passam pelo **limite global e pelo específico** (camadas complementares). No login, a chave usa `ipKeyGenerator` (IPv6 seguro) + email do body.

Em produção no Render, `app.set('trust proxy', 1)` garante que o IP real chegue ao rate limit atrás do proxy.

Detalhes de implementação: [backend/README.md](backend/README.md#segurança).

## Notes

- **CORS aceita apenas uma origem exata** via `FRONTEND_URL` (sem `/` no final). Se mudar o domínio do front (ex: apontar para uma URL diferente da Vercel), atualize essa variável no Render e redeploy — senão o login falha com erro de CORS.
- **Sempre acesse pela URL de produção fixa** da Vercel (a que aparece em Settings → Domains), nunca pela URL específica de um deployment (`projeto-<hash>-<time>.vercel.app`) — essa muda a cada deploy e não bate com o `FRONTEND_URL` configurado, causando bloqueio de CORS.
- **Cookie de refresh token** é `httpOnly` + `SameSite=None` + `Secure` em produção. Como front (`vercel.app`) e back (`onrender.com`) são domínios diferentes, alguns navegadores tratam esse cookie como "de terceiros" e podem bloqueá-lo (Safari sempre bloqueia por padrão; Chrome em aba anônima também). Para eliminar isso de vez, seria necessário usar subdomínios de um mesmo domínio próprio para front e back.
- **Timeout no axios** (`frontend/src/lib/api.js`) evita que a UI trave indefinidamente em "Logando..." caso a API demore demais para responder (ex: acordando do cold start do Render).
- Dias e turnos passados são bloqueados na criação de reservas.
- Apenas um admin autenticado pode criar outro admin (`eAdmin: true` é ignorado em cadastro público).
