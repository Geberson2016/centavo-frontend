import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { server } from '../../test/server';
import { renderWithProviders } from '../../test/render';
import { PrivateRoute } from '.';

function renderProtectedDashboard() {
  return renderWithProviders(
    <Routes>
      <Route path="/login" element={<p>tela de login</p>} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<p>conteúdo privado</p>} />
      </Route>
    </Routes>,
    { route: '/dashboard' }
  );
}

describe('PrivateRoute', () => {
  it('com sessão, mostra a rota privada', async () => {
    server.use(
      http.get('/bff/session', () =>
        HttpResponse.json({
          id: 1,
          name: 'Ana',
          email: 'ana@centavo.test',
          expiresAt: '2026-11-22T12:00:00Z',
        })
      )
    );

    renderProtectedDashboard();

    expect(screen.getByText('Carregando dados...')).toBeInTheDocument();
    expect(await screen.findByText('conteúdo privado')).toBeInTheDocument();
  });

  it('sem sessão (401), vai para o login', async () => {
    server.use(
      http.get('/bff/session', () =>
        HttpResponse.json({ status: 401, code: 'UNAUTHENTICATED' }, { status: 401 })
      )
    );

    renderProtectedDashboard();

    expect(await screen.findByText('tela de login')).toBeInTheDocument();
    expect(screen.queryByText('conteúdo privado')).not.toBeInTheDocument();
  });

  it('com o BFF fora do ar, avisa em vez de deslogar', async () => {
    server.use(
      http.get('/bff/session', () =>
        HttpResponse.json({ status: 502, code: 'UPSTREAM_UNAVAILABLE' }, { status: 502 })
      )
    );

    renderProtectedDashboard();

    expect(
      await screen.findByText('Erro ao conectar com o servidor.')
    ).toBeInTheDocument();
    expect(screen.queryByText('tela de login')).not.toBeInTheDocument();
  });
});
