import { AxiosError } from 'axios';
import { errorCodeValues, type ErrorCode, type Problem } from '../api/types';

// Formato de erro do backend (RFC 7807, application/problem+json) e codigos
// estaveis vem do contrato gerado (schemas Problem e ErrorCode do openapi.yaml).
// O contrato carrega o CODIGO; o texto que o usuario le sai do bundle de i18n.
export type { ErrorCode };

const CODIGOS = new Set<string>(errorCodeValues);

// Extrai o codigo do erro. Devolve null quando a resposta nao traz um codigo
// conhecido — inclusive quando nem chegou a haver resposta (rede fora, CORS).
export function extractErrorCode(error: unknown): ErrorCode | null {
  if (!(error instanceof AxiosError)) return null;

  const code = (error.response?.data as Partial<Problem> | undefined)?.code;
  return code && CODIGOS.has(code) ? (code as ErrorCode) : null;
}

// Chave de i18n para o codigo. Sem codigo reconhecido, cai na mensagem generica
// — nunca em texto cru vindo do servidor.
export function errorTranslationKey(error: unknown): string {
  const code = extractErrorCode(error);
  return code ? `errors.${code}` : 'errors.GENERIC';
}
