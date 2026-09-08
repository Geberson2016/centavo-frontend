import { AxiosError } from 'axios';

// Formato de erro do backend (RFC 7807, application/problem+json).
// O contrato carrega o CODIGO; o texto que o usuario le sai do bundle de i18n.
export interface ProblemDetail {
  code?: string;
  status?: number;
  detail?: string;
  errors?: Array<{ field: string; message?: string; accepted?: string[] }>;
}

// Codigos estaveis publicados pelo backend (ErrorCode.java).
export const ERROR_CODES = [
  'ACCOUNT_NOT_FOUND',
  'CATEGORY_NOT_FOUND',
  'TRANSACTION_NOT_FOUND',
  'EMAIL_ALREADY_EXISTS',
  'TRANSACTION_CATEGORY_TYPE_MISMATCH',
  'INVALID_CREDENTIALS',
  'VALIDATION_ERROR',
  'INTERNAL_ERROR',
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

const CODIGOS = new Set<string>(ERROR_CODES);

// Extrai o codigo do erro. Devolve null quando a resposta nao traz um codigo
// conhecido — inclusive quando nem chegou a haver resposta (rede fora, CORS).
export function extractErrorCode(error: unknown): ErrorCode | null {
  if (!(error instanceof AxiosError)) return null;

  const code = (error.response?.data as ProblemDetail | undefined)?.code;
  return code && CODIGOS.has(code) ? (code as ErrorCode) : null;
}

// Chave de i18n para o codigo. Sem codigo reconhecido, cai na mensagem generica
// — nunca em texto cru vindo do servidor.
export function errorTranslationKey(error: unknown): string {
  const code = extractErrorCode(error);
  return code ? `errors.${code}` : 'errors.GENERIC';
}
