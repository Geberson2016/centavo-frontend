import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { server } from '../../test/server';
import { renderWithProviders } from '../../test/render';
import { SESSION_QUERY_KEY } from '../../hooks/useSession';
import { redirectToLogin } from '../../services/navigation';
import { Login } from '.';

vi.mock('../../services/navigation', () => ({ redirectToLogin: vi.fn() }));

const sessionUser = {
  id: 1,
  name: 'Ana',
  email: 'ana@centavo.test',
  expiresAt: '2026-11-22T12:00:00Z',
};

function renderLogin() {
  return renderWithProviders(
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<p>painel</p>} />
    </Routes>,
    { route: '/login' }
  );
}

async function submit(user: ReturnType<typeof renderLogin>['user'], password: string) {
  await user.type(screen.getByLabelText('E-mail'), 'ana@centavo.test');
  await user.type(screen.getByLabelText('Senha'), password);
  await user.click(screen.getByRole('button', { name: 'ENTRAR' }));
}

describe('Login', () => {
  it('abre a sessão no BFF e vai para o painel', async () => {
    let body: unknown;
    server.use(
      http.post('/bff/session', async ({ request }) => {
        body = await request.json();
        return HttpResponse.json(sessionUser);
      })
    );

    const { user, queryClient } = renderLogin();
    await submit(user, 'secret123');

    expect(await screen.findByText('painel')).toBeInTheDocument();
    expect(body).toEqual({ email: 'ana@centavo.test', password: 'secret123' });
    // A sessão já fica em cache: o PrivateRoute não precisa perguntar de novo ao BFF.
    expect(queryClient.getQueryData(SESSION_QUERY_KEY)).toEqual(sessionUser);
  });

  it('senha errada mostra o aviso traduzido e continua no login', async () => {
    server.use(
      http.post('/bff/session', () =>
        HttpResponse.json(
          { status: 401, code: 'INVALID_CREDENTIALS' },
          { status: 401, headers: { 'Content-Type': 'application/problem+json' } }
        )
      )
    );

    const { user } = renderLogin();
    await submit(user, 'wrong-password');

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'E-mail ou senha inválidos.'
    );
    expect(screen.queryByText('painel')).not.toBeInTheDocument();
    expect(redirectToLogin).not.toHaveBeenCalled();
  });

  it('BFF fora do ar não é confundido com senha errada', async () => {
    server.use(
      http.post('/bff/session', () =>
        HttpResponse.json(
          { status: 502, code: 'UPSTREAM_UNAVAILABLE' },
          { status: 502, headers: { 'Content-Type': 'application/problem+json' } }
        )
      )
    );

    const { user } = renderLogin();
    await submit(user, 'secret123');

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Serviço indisponível no momento. Tente novamente em instantes.'
    );
  });
});
