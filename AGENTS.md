# AGENTS.md — Centavo Frontend

**Este arquivo é o regramento obrigatório deste repositório.** Todo código (escrito por humano ou agente) precisa cumpri-lo. O `CLAUDE.md` é o guia de operação do Claude Code e aponta para cá. Um `AGENTS.md` irmão, com as mesmas convenções compartilhadas, vive em `centavo-backend` — mantenha as seções compartilhadas sincronizadas.

O Centavo é um app de finanças pessoais: **React (Vite) → BFF (Node/TS) → Spring Boot → Postgres**. Este repositório é a UI React e, daqui pra frente, o **BFF** (ver [Arquitetura-alvo](#arquitetura-alvo)).

---

## 0. Política de idioma (obrigatória em todo o projeto)

- **Inglês** — APENAS o código em si (identificadores: nomes de variáveis, funções, classes, tipos, enums) e configurações/identificadores técnicos (chaves de `docker-compose`, nomes de variáveis de `.env`, paths/`operationId`/nomes de schema no OpenAPI).
- **Português** — TODO o resto de texto humano: comentários no código, mensagens de commit, este `AGENTS.md`, o `CLAUDE.md`, `README`, seções de roadmap, descrições/summaries de endpoints no OpenAPI, ADRs e qualquer `plano.md` / documento de planejamento.
- **Copy do app para o usuário final** — sempre via **i18n** (ver §1.2), nunca hardcoded.
- Mensagens de commit seguem Conventional Commits: o prefixo é técnico (`feat:`, `fix:`, `chore:`…), o texto após o prefixo é em português.
- **Documentos de planejamento** (planos, roadmaps de execução) vivem em `centavo-frontend/docs/planos/` (local único, cross-repo), em português, com nome descritivo.

---

## 1. Convenções inegociáveis (todo o projeto)

São obrigatórias. Uma mudança que viole qualquer uma delas não está "pronta".

### 1.1 Código em inglês
Identificadores, tipos, enums, nomes de arquivos/pastas e chaves de configuração ficam em **inglês**. Nada de `RECEITA`/`DESPESA` como valor de enum no código. Comentários, por outro lado, são em português (§0).
> Violação atual a corrigir: `type: 'RECEITA' | 'DESPESA'` nos hooks (ver a tabela PT→EN em `centavo-backend/AGENTS.md`).

### 1.2 i18n é obrigatório (pt-BR + en)
- Nenhuma string visível ao usuário fica hardcoded no JSX. Todo label, mensagem e erro passa pela camada de i18n (**react-i18next**, locale padrão `pt-BR`, mais `en`).
- Erros do backend chegam como **códigos estáveis** (ex.: `ACCOUNT_NOT_FOUND`), nunca como frases prontas. O frontend mapeia código → mensagem localizada.
- Nunca use `alert()` para feedback. Use um componente de toast/erro inline alimentado por chaves de i18n.

### 1.3 API contract-first (OpenAPI)
- `openapi.yaml` é a **fonte única da verdade** de todo contrato FE↔BFF e BFF↔Spring, versionado no git.
- O client e os tipos TypeScript são **gerados** a partir do spec (ex.: `openapi-typescript` / `openapi-generator typescript-fetch`). Não escreva interfaces de request/response à mão quando o spec existir — importe os tipos gerados.
- Não se consome endpoint que não esteja no spec. Mudança de contrato que quebra compatibilidade exige bump de versão.

### 1.4 SOLID (aplicado ao frontend)
- **SRP** — um hook por endpoint/responsabilidade (já é o padrão); separe componentes "de apresentação" (só renderizam) dos "container" (dados + estado).
- **DIP** — componentes dependem de hooks/abstrações, nunca de `axios`/`fetch` direto. Todo acesso de rede passa pelo client gerado, embrulhado em hooks.
- **ISP/LSP** — contratos de props e tipos pequenos e precisos. Nada de `any` (§1.6).

### 1.5 Sem segredos no código-fonte
Configuração vem do ambiente (`import.meta.env`, tipado). Forneça um `.env.example` versionado; nunca commite valores reais. O `.env` fica no gitignore.

### 1.6 Type safety
`any` é proibido (inclusive `data: any` em handlers de formulário — tipe o modelo do form). Prefira tipos gerados e unions discriminadas. Dinheiro nunca é `float` em JS: represente valores monetários como **centavos** inteiros ou string decimal ponta a ponta, casando com o `BigDecimal` do backend.

### 1.7 Definition of Done
- [ ] Código em inglês; nenhuma string de usuário hardcoded (chaves de i18n adicionadas em **ambos** os bundles `pt-BR` e `en`).
- [ ] Tipos gerados a partir do / consistentes com o `openapi.yaml`; sem `any`.
- [ ] `npm run lint` e `npm run build` (tsc) passam limpos.
- [ ] Nova lógica coberta por teste (Vitest + React Testing Library — ver roadmap).
- [ ] Mensagem de commit em Conventional Commits, texto em português.

---

## 2. Arquitetura & convenções do frontend

### Estado atual (como está construído)
- **Roteamento** — `src/App.tsx`; `/login`, `/register` públicas; o resto aninhado sob `<PrivateRoute>` (protege via `isTokenValid()`) → `<AppLayout>` (`Sidebar` fixa + `<Outlet>`).
- **Camada de dados** — TanStack Query. Todo acesso ao servidor passa pela instância axios compartilhada em `src/services/api.ts`, cujos interceptors são a única fonte do comportamento de auth (token Bearer do `localStorage`; em `401` → `clearAuth()` + redirect para `/login`).
- **Hooks** — um arquivo por endpoint em `src/hooks/`, embrulhando um único `useQuery`/`useMutation`. Mutations invalidam as query keys relacionadas (ex.: `useCreateTransaction` invalida `['dashboard-summary']`). Adicione features aqui, nunca chame `api` direto dos componentes.
- **Auth** — baseada em localStorage, sem context. `useAuth()` lê `user`; `src/utils/auth.ts` tem `isTokenValid()` (decodifica o `exp` do JWT) e `clearAuth()`.
- **Estrutura** — cada componente/página/layout é uma pasta com um `index.tsx`.
- **Estilo** — classes utilitárias do Tailwind v4 inline. **Formulários** — react-hook-form. **Ícones** — lucide-react (SVGs viram componentes via `vite-plugin-svgr`).

### Arquitetura-alvo
```
React (Vite)  ──/bff──▶  BFF (Node/TS: Fastify | NestJS | Hono)  ──/api/v1──▶  Spring Boot  ──▶  Postgres
```
- O app React chama **apenas o BFF**, nunca o Spring direto.
- **Responsabilidades do BFF**: agregar/moldar view-models para as telas, guardar a sessão, cuidar da troca de token de auth, adaptar o contrato do Spring ao que a UI precisa. **Nenhuma regra de negócio** vive no BFF — o Spring é a fonte da verdade do domínio.
- Ambos os saltos (`FE↔BFF`, `BFF↔Spring`) são descritos pelo `openapi.yaml` e usam clients gerados.
- **Migração de auth**: tirar o JWT do `localStorage` (exposto a XSS) para uma **sessão em cookie httpOnly, Secure, gerenciada pelo BFF**. O `utils/auth.ts` / o interceptor de resposta mudam de acordo.

---

## 3. Roadmap & recomendações (projeto novo — ideias a adotar)

Agrupadas por prioridade. Nada aqui está construído ainda; são as direções aprovadas.

**Fundações obrigatórias**
- **Serviço BFF** (Fastify/NestJS/Hono) — novo pacote/repo; ver §2 arquitetura-alvo.
- **OpenAPI contract-first** — escrever o `openapi.yaml`, gerar o client TS, apagar as interfaces feitas à mão.
- **i18n** — `react-i18next`, bundles `pt-BR` + `en`, extrair todas as strings atuais.
- **Endurecimento de auth** — sessão em cookie httpOnly via BFF; adicionar fluxo de refresh token; abandonar o token no localStorage.
- **Sistema de erro/toast** — substituir o `alert()`; renderizar os *códigos* de erro do backend via i18n.

**Ferramental / DX**
- **Vitest + React Testing Library** para testes de unidade/componente; **Playwright** para uns smoke tests E2E (login → dashboard).
- **CI (GitHub Actions)** — lint + typecheck + build + test no PR, para FE e BFF.
- **Docker Compose** do stack completo (postgres + spring + bff + web) para dev local com um comando.
- **Pre-commit hooks** (husky + lint-staged) rodando eslint/prettier.
- **Path aliases** (`@/…`) via tsconfig + Vite para matar os imports `../../..`.
- **Env tipado** — um `src/env.ts` que valida `import.meta.env` (ex.: com zod) na inicialização.

**Ideias de produto (o backend já dá indícios delas)**
- Transações recorrentes & lançamentos agendados (o dashboard já mostra valores "agendados").
- Orçamentos por categoria (`BudgetType` FIXED/VARIABLE já modelado) com UI de progresso.
- Relatórios/exportações (CSV/PDF), filtros por período, múltiplas contas/múltiplas moedas.
- Seed de categorias para novos usuários.
