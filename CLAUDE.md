# CLAUDE.md

Este arquivo orienta o Claude Code (claude.ai/code) ao trabalhar neste repositório.

## ⚠️ Leia o AGENTS.md primeiro — ele é obrigatório

**O [`AGENTS.md`](./AGENTS.md) é o regramento obrigatório.** Toda mudança precisa cumpri-lo. Versão curta das regras inegociáveis:

0. **Política de idioma** — inglês só no código e em configs (identificadores, chaves de `.env`/`docker-compose`, paths/schemas do OpenAPI). **Todo o resto em português**: comentários, commits, docs, `AGENTS.md`, `CLAUDE.md`, README, roadmap, ADRs, descrições de endpoints, `plano.md`. Copy do usuário via i18n.
1. **i18n obrigatório** (`pt-BR` + `en` via react-i18next) — nenhuma string de UI hardcoded, nada de `alert()`.
2. **OpenAPI contract-first** — `openapi.yaml` é a fonte da verdade; o client/tipos são gerados, não escritos à mão.
3. **SOLID** — um hook por endpoint; componentes dependem de hooks, nunca de `axios` direto.
4. **Sem segredos no código**; **sem `any`**; dinheiro em centavos/string decimal, nunca float.

O Definition of Done e a justificativa completa estão no `AGENTS.md`.

## Visão geral

O Centavo é um app web de finanças pessoais. Topologia-alvo: **React (Vite) → BFF (Node/TS) → Spring Boot → Postgres**. Este repositório é a UI React (e, daqui pra frente, o BFF). O backend vive no repositório irmão `centavo-backend`. O texto da UI é português do Brasil (migrando para i18n).

## Comandos

```bash
npm run dev      # servidor de dev do Vite com HMR
npm run build    # tsc -b (typecheck) e depois vite build
npm run lint     # eslint no repo inteiro
npm run preview  # serve o build de produção
```

Ainda não há test runner configurado (Vitest + React Testing Library estão no roadmap do `AGENTS.md`).

## Arquitetura (atual)

- **Camada de dados** — TanStack Query + uma instância axios compartilhada em `src/services/api.ts`. Seus dois interceptors são a única fonte do comportamento de auth: o de request anexa `Authorization: Bearer <token>` do `localStorage` em toda rota exceto as `PUBLIC_ROUTES` (`/users/login`, `/users/register`); o de response, em `401`, chama `clearAuth()` e redireciona (hard) para `/login`.
- **Um hook por endpoint** — cada arquivo em `src/hooks/` embrulha um único `useQuery` (leitura) ou `useMutation` (escrita). Mutations invalidam as query keys relacionadas (`useCreateTransaction` → `['dashboard-summary']`). Adicione features como hooks; nunca chame `api` dos componentes.
- **Auth** — baseada em localStorage, sem context. `useAuth()` lê `user`; `src/utils/auth.ts` tem `isTokenValid()` (decodifica o `exp` do JWT) e `clearAuth()`. O login grava `token`/`user` no `localStorage` em `pages/Login/index.tsx`.
- **Roteamento** — `src/App.tsx`. `/login` + `/register` públicas; o resto aninhado sob `<PrivateRoute>` → `<AppLayout>` (`Sidebar` + `<Outlet>`).
- **Providers** — `src/main.tsx` embrulha em `QueryClientProvider` (+ devtools); o `<BrowserRouter>` está no `App.tsx`.

## Arquitetura-alvo (ver AGENTS.md §2)

O React chama **apenas o BFF**, nunca o Spring direto. O BFF (Fastify/NestJS/Hono) molda view-models, guarda a sessão e move a auth para um **cookie httpOnly** (fora do `localStorage`). As regras de negócio ficam no Spring.

## Convenções

- **Estrutura de arquivos** — componentes/páginas/layouts são cada um uma pasta com `index.tsx`, importada pelo nome da pasta.
- **Estilo** — classes utilitárias do Tailwind v4 inline; sem CSS modules. O `AppLayout` fixa a sidebar (`ml-64`) e o fundo da página.
- **Formulários** — react-hook-form. **Ícones** — lucide-react (SVGs → componentes via `vite-plugin-svgr`).
- **Logos de banco** — `src/utils/bank-utils.ts` mapeia nomes de conta para paths em `public/banks/` por substring; adicione um banco tanto em `BANK_LOGOS` quanto na cadeia do `getBankLogo`.
- **Prettier** — aspas simples, ponto e vírgula, tab de 2 espaços, trailing commas es5.
