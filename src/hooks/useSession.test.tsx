import { renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { server } from '../test/server';
import { createWrapper } from '../test/render';
import { isUnauthenticated, useSession } from './useSession';

const sessionUser = {
  id: 1,
  name: 'Ana',
  email: 'ana@centavo.test',
  expiresAt: '2026-11-22T12:00:00Z',
};

// Conta quantas vezes o GET /bff/session chegou ao "BFF".
function sessionRoute(respond: () => Response) {
  const calls = { count: 0 };
  server.use(
    http.get('/bff/session', () => {
      calls.count += 1;
      return respond();
    })
  );
  return calls;
}

describe('useSession', () => {
  it('devolve o usuário da sessão', async () => {
    sessionRoute(() => HttpResponse.json(sessionUser));

    const { result } = renderHook(() => useSession(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(sessionUser);
  });

  it('401 é "sem sessão" e não tenta de novo', async () => {
    const calls = sessionRoute(() =>
      HttpResponse.json(
        { status: 401, code: 'UNAUTHENTICATED' },
        { status: 401 }
      )
    );

    const { result } = renderHook(() => useSession(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(isUnauthenticated(result.current.error)).toBe(true);
    expect(calls.count).toBe(1);
  });

  it('BFF fora do ar não é "sem sessão" e tenta de novo', async () => {
    const calls = sessionRoute(() =>
      HttpResponse.json(
        { status: 502, code: 'UPSTREAM_UNAVAILABLE' },
        { status: 502 }
      )
    );

    const { result } = renderHook(() => useSession(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(isUnauthenticated(result.current.error)).toBe(false);
    expect(calls.count).toBe(4);
  });
});
