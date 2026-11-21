import { AxiosError, AxiosHeaders, type AxiosResponse } from 'axios';
import { describe, expect, it } from 'vitest';
import { errorTranslationKey, extractErrorCode } from './apiError';

function httpError(status: number, data: unknown) {
  const config = { headers: new AxiosHeaders() };
  const response = {
    status,
    statusText: '',
    headers: {},
    config,
    data,
  } as AxiosResponse;
  return new AxiosError('falhou', 'ERR_BAD_RESPONSE', config, null, response);
}

describe('extractErrorCode / errorTranslationKey', () => {
  it('usa o code RFC 7807 conhecido', () => {
    const error = httpError(409, { status: 409, code: 'EMAIL_ALREADY_EXISTS' });

    expect(extractErrorCode(error)).toBe('EMAIL_ALREADY_EXISTS');
    expect(errorTranslationKey(error)).toBe('errors.EMAIL_ALREADY_EXISTS');
  });

  it('reconhece os codes próprios do BFF', () => {
    expect(
      extractErrorCode(httpError(502, { code: 'UPSTREAM_UNAVAILABLE' }))
    ).toBe('UPSTREAM_UNAVAILABLE');
    expect(extractErrorCode(httpError(401, { code: 'UNAUTHENTICATED' }))).toBe(
      'UNAUTHENTICATED'
    );
  });

  it('code fora do contrato cai na mensagem genérica', () => {
    const error = httpError(400, { code: 'SOMETHING_NEW' });

    expect(extractErrorCode(error)).toBeNull();
    expect(errorTranslationKey(error)).toBe('errors.GENERIC');
  });

  it('nunca usa texto cru do servidor como mensagem', () => {
    const error = httpError(500, { detail: 'relation "users" does not exist' });

    expect(errorTranslationKey(error)).toBe('errors.GENERIC');
  });

  it('sem resposta (rede fora) ou erro que não é do axios: genérica', () => {
    expect(errorTranslationKey(new AxiosError('Network Error'))).toBe(
      'errors.GENERIC'
    );
    expect(errorTranslationKey(new Error('boom'))).toBe('errors.GENERIC');
  });
});
