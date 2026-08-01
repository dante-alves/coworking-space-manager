# Frontend — Coworking Space Manager

SPA em React + Vite + Tailwind + shadcn/ui.

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Dev server (porta 5173) |
| `npm run build` | Build para produção |
| `npm run preview` | Preview do build |

Execute dentro de `frontend/`.

## Variáveis de ambiente

O Vite lê o **`.env` na raiz do monorepo** (`envDir` configurado em `vite.config.js`).

Variável usada pelo front:

```env
VITE_API_URL=http://localhost:3000
```

Copie [.env.example](../.env.example) para `.env` na **raiz** — não crie `.env` aqui em `frontend/`.

Em produção (Vercel), defina `VITE_API_URL` no painel do projeto (Root Directory: `frontend/`).

## Estrutura

```
frontend/src/
  components/   # UI por domínio (auth, admin, salas…)
  hooks/        # lógica de tela
  pages/        # rotas
  services/     # chamadas à API
  lib/          # api, auth-storage, utils
```

Documentação geral, deploy e admin: [README principal](../README.md).
