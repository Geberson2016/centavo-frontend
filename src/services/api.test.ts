import { http, HttpResponse } from 'msw';
import { describe, expect, it, vi } from 'vitest';
import { server } from '../test/server';
import { api } from './api';
import { redirectToLogin } from './navigation';

vi.mock('./navigation', () => ({ redirectToLogin: vi.fn() }));

const unauthenticated = () =>
  HttpResponse.json(
    { status: 401, code: 'UNAUTHENTICATED' },
    { status: 401, headers: { 'Content-Type': 'application/problem+json' } }
  );

describe('cliente da API (axios → /bff)', () => {
  it('chama o BFF pela mesma origem, sob /bff', async () => {
    server.use(http.get('/bff/accounts', () => HttpResponse.json([])));

    const { data } = await api.get('/accounts');

    expect(data).toEqual([]);
  });

  it('401 numa rota autenticada manda para o login', async () => {
    server.use(http.get('/bff/accounts', unauthenticated));

    await expect(api.get('/accounts')).rejects.toMatchObject({
      response: { status: 401 },
    });
    expect(redirectToLogin).toHaveBeenCalledOnce();
  });

  it.each(['/session', '/users/register'])(
    '401 em %s é resposta esperada e não redireciona',
    async (path) => {
      server.use(http.post(`/bff${path}`, unauthenticated));

      await expect(api.post(path, {})).rejects.toMatchObject({
        response: { status: 401 },
      });
      expect(redirectToLogin).not.toHaveBeenCalled();
    }
  );

  it('BFF fora do ar (502) não derruba a sessão', async () => {
    server.use(
      http.get('/bff/accounts', () =>
        HttpResponse.json(
          { status: 502, code: 'UPSTREAM_UNAVAILABLE' },
          { status: 502 }
        )
      )
    );

    await expect(api.get('/accounts')).rejects.toMatchObject({
      response: { status: 502 },
    });
    expect(redirectToLogin).not.toHaveBeenCalled();
  });
});
