# CLAUDE.md

Este arquivo orienta o Claude Code (claude.ai/code) ao trabalhar neste repositório.

## ⚠️ Leia o AGENTS.md primeiro — ele é obrigatório

**O [`AGENTS.md`](./AGENTS.md) é o regramento obrigatório.** Toda mudança precisa cumpri-lo. Versão curta das regras inegociáveis:

0. **Política de idioma** — inglês só no código e em configs (identificadores, chaves de `.env`/`docker-compose`, paths/schemas do OpenAPI). **Todo o resto em português**: comentários, commits, docs, `AGENTS.md`, `CLAUDE.md`, README, roadmap, ADRs, descrições de endpoints, `plano.md`. Copy do usuário via i18n.
1. **i18n obrigatório** (`pt-BR` + `en` via react-i18next) — nenhuma string de UI hardcoded, nada de `alert()`.
2. **OpenAPI contract-first** — `openapi.yaml` é a fonte da verdade; o client/tipos são gerados, não escritos à mão.
3. **SOLID** — um hook por endpoint; componentes dependem de hooks, nunca de `axios` direto.
4. **Sem segredos no código**; **sem `any`**; dinheiro em centavos/string decimal, nunca float.
5. **Fluxo no GitHub** — nada direto na `main`: issue → branch → PR, e quem faz o merge é o Geberson (ver `AGENTS.md §0.1` e `../docs/processo/fluxo-de-trabalho.md`).

O Definition of Done e a justificativa completa estão no `AGENTS.md`.

## Visão geral

O Centavo é um app web de finanças pessoais. Topologia-alvo: **React (Vite) → BFF (Node/TS) → Spring Boot → Postgres**. Este repositório é a UI React. O BFF vive no repositório irmão `centavo-bff` (Fastify) e o backend no `centavo-backend`. O texto da UI é português do Brasil (migrando para i18n).

## Comandos

```bash
npm run dev      # servidor de dev do Vite com HMR
npm run build    # tsc -b (typecheck) e depois vite build
npm run lint     # eslint no repo inteiro
npm run preview  # serve o build de produção
npm run api:generate  # regenera src/api/schema.ts a partir do openapi.yaml do backend
npm run api:check     # regenera e falha se o schema.ts versionado estiver desatualizado
npm test              # Vitest (uma vez); npm run test:watch fica observando
```

## Testes

- **Vitest + React Testing Library** em jsdom (`vitest.config.ts`). O teste fica ao lado do código: `Login.test.tsx` na pasta `pages/Login/`, `apiError.test.ts` ao lado do `apiError.ts`.
- **Rede**: o BFF é simulado pelo **MSW** (`src/test/server.ts`). Cada teste declara as rotas que usa com `server.use(http.get('/bff/...', ...))`. Chamada sem handler **falha** o teste (`onUnhandledFrame: 'error'`), então nada sai para a rede.
- **Render**: `renderWithProviders(ui, { route })` (`src/test/render.tsx`) monta i18n, TanStack Query (cliente novo por teste, sem retry), toasts e um `MemoryRouter`. Para hooks, `renderHook(..., { wrapper: createWrapper() })`.
- **Idioma** fixo em `pt-BR` no setup; procure elementos pelo texto traduzido ou pelo papel (`getByRole`, `getByLabelText`).
- O redirecionamento "hard" para `/login` mora em `services/navigation.ts` para poder ser trocado por `vi.mock` (o jsdom não navega).
- `i18n/bundles.test.ts` garante que `pt-BR` e `en` têm as mesmas chaves e que todo `ErrorCode` do contrato tem mensagem.

## Arquitetura (atual)

- **Camada de dados** — TanStack Query + uma instância axios compartilhada em `src/services/api.ts` com `baseURL: '/bff'`. A UI fala **só com o BFF** (`centavo-bff`), na mesma origem: o Vite faz proxy de `/bff` para `BFF_URL` (padrão `http://localhost:3000`, ver `.env.example`). Não há token no JS: a sessão é um cookie httpOnly que o browser manda sozinho. O interceptor de resposta, em `401` fora das rotas de auth (`/session`, `/users/register`), redireciona (hard) para `/login`.
- **Tipos da API** — gerados pelo `openapi-typescript` a partir do contrato do BFF, `../centavo-bff/openapi.yaml` (outro caminho via env `OPENAPI_SPEC`) em `src/api/schema.ts`, que é versionado e **nunca editado à mão**. A UI importa de `src/api/types.ts`, que dá nomes curtos aos schemas (`AccountResponse`, `TransactionRequest`…) e reexporta os arrays dos enums (`accountTypeValues`, `errorCodeValues`…). Mudou o contrato do BFF? Rode `npm run api:generate` e commite o `schema.ts` junto.
- **Um hook por endpoint** — cada arquivo em `src/hooks/` embrulha um único `useQuery` (leitura) ou `useMutation` (escrita). Mutations invalidam as query keys relacionadas (`useCreateTransaction` → `['dashboard']`). O Dashboard usa um único `useDashboard()` (`GET /bff/dashboard`, agregado pelo BFF). Adicione features como hooks; nunca chame `api` dos componentes.
- **Auth** — sessão do BFF em cookie httpOnly (nada no `localStorage`). `useSession()` (`GET /bff/session`) é a fonte de verdade de "está logado"; `useAuth()` devolve o `user` dela. `useLogin()` (`POST /bff/session`) já popula a query da sessão; `useLogout()` (`DELETE /bff/session`) limpa o cache. O `<PrivateRoute>` manda para `/login` só em 401; com o BFF fora do ar, mostra erro em vez de deslogar.
- **Roteamento** — `src/App.tsx`. `/login` + `/register` públicas; o resto aninhado sob `<PrivateRoute>` → `<AppLayout>` (`Sidebar` + `<Outlet>`).
- **Providers** — `src/main.tsx` embrulha em `QueryClientProvider` (+ devtools); o `<BrowserRouter>` está no `App.tsx`.

## Arquitetura (ver AGENTS.md §2)

O React chama **apenas o BFF**, nunca o Spring direto. O BFF (`centavo-bff`, Fastify) molda view-models, guarda a sessão em **cookie httpOnly** e repassa ao Spring. As regras de negócio ficam no Spring. Para rodar local: o stack inteiro sobe pelo `docker compose` do repositório irmão `centavo-infra` (UI em `http://localhost:4173`, servida por nginx a partir do `Dockerfile` daqui, com `nginx/default.conf.template` fazendo o proxy de `/bff`). Com hot reload: suba só `postgres backend` no compose, rode o BFF (`npm run dev` no `centavo-bff`) e este front (`npm run dev`, `localhost:5173`).

## Convenções

- **Estrutura de arquivos** — componentes/páginas/layouts são cada um uma pasta com `index.tsx`, importada pelo nome da pasta.
- **Estilo** — classes utilitárias do Tailwind v4 inline; sem CSS modules. O `AppLayout` fixa a sidebar (`ml-64`) e o fundo da página.
- **Formulários** — react-hook-form. **Ícones** — lucide-react (SVGs → componentes via `vite-plugin-svgr`).
- **Logos de banco** — `src/utils/bank-utils.ts` mapeia nomes de conta para paths em `public/banks/` por substring; adicione um banco tanto em `BANK_LOGOS` quanto na cadeia do `getBankLogo`.
- **Prettier** — aspas simples, ponto e vírgula, tab de 2 espaços, trailing commas es5.
