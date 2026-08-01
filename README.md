# Coworking Space Manager

Sistema que gerencia as alocações das salas de um coworking.

## Estrutura do monorepo

```
/
  .env                 # compartilhado (backend + Vite)
  backend/             # API + Prisma → Render
  frontend/            # React + Vite → Vercel
```

## Stack

- **Frontend:** React + Vite (Vercel)
- **Backend:** Node + Express (Render)
- **Banco:** PostgreSQL (Prisma)
- **Sessão:** Refresh token opaco no Redis (Upstash) via cookie httpOnly

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
