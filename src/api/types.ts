// Apelidos dos tipos gerados a partir do openapi.yaml do backend (src/api/schema.ts).
// O schema.ts é gerado por `npm run api:generate` e nunca editado à mão; aqui só
// damos nomes curtos aos schemas que a UI usa.
import type { components } from './schema';

type Schemas = components['schemas'];

export type TransactionType = Schemas['TransactionType'];
export type AccountType = Schemas['AccountType'];
export type BudgetType = Schemas['BudgetType'];
export type ErrorCode = Schemas['ErrorCode'];

export type UserRequest = Schemas['UserRequest'];
export type UserRegisterResponse = Schemas['UserRegisterResponse'];
export type AuthRequest = Schemas['AuthRequest'];
export type UserResponse = Schemas['UserResponse'];

export type AccountRequest = Schemas['AccountRequest'];
export type AccountResponse = Schemas['AccountResponse'];
export type AccountSummaryResponse = Schemas['AccountSummaryResponse'];

export type CategoryRequest = Schemas['CategoryRequest'];
export type CategoryResponse = Schemas['CategoryResponse'];

export type TransactionRequest = Schemas['TransactionRequest'];
export type TransactionResponse = Schemas['TransactionResponse'];
export type RecentTransactionResponse = Schemas['RecentTransactionResponse'];

export type DashboardSummaryResponse = Schemas['DashboardSummaryResponse'];

export type Problem = Schemas['Problem'];

export {
  accountTypeValues,
  budgetTypeValues,
  errorCodeValues,
  transactionTypeValues,
} from './schema';
