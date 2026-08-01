# Coworking Space Manager

Sistema que gerencia as alocações das salas de um coworking.

## Stack

- **Frontend:** React + Vite (Vercel)
- **Backend:** Node + Express (Render)
- **Banco:** PostgreSQL (Prisma)
- **Sessão:** Refresh token opaco no Redis (Upstash) via cookie httpOnly

---

## Como criar um usuário administrador

Quem for testar a aplicação precisa de pelo menos **um admin** para acessar o painel (`/admin`).

### Opção 1 — Seed (recomendado)

Na raiz do projeto, com `DATABASE_URL` configurada no `.env`:

```bash
npm run db:seed
```

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
# instalar dependências (raiz + frontend)
npm install
cd frontend && npm install && cd ..

# migrations e admin inicial
npm run db:migrate
npm run db:seed

# subir API e front (terminais separados)
npm run dev
cd frontend && npm run dev
```

### Variáveis de ambiente

Copie os exemplos e preencha com seus valores:

```bash
cp .env.example .env
cp frontend/.env.example frontend/.env
```

- **Backend:** `.env` na raiz — veja [.env.example](.env.example)
- **Frontend:** `frontend/.env` — veja [frontend/.env.example](frontend/.env.example)

---

## Deploy

| Serviço | Onde | Variável principal |
|---------|------|-------------------|
| Postgres | Prisma | `DATABASE_URL` → Render |
| Redis | Upstash | `REDIS_URL` → Render |
| API | Render | build: `npm install && npx prisma generate && npx prisma migrate deploy` |
| Front | Vercel (pasta `frontend/`) | `VITE_API_URL` |

Após o deploy da API, configure `FRONTEND_URL` no Render com a URL exata da Vercel e faça redeploy.

Após o primeiro deploy do banco, rode `npm run db:seed` uma vez para criar o admin de teste.
