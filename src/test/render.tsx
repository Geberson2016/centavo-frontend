import type { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18n from '../i18n';
import { ToastProvider } from '../components/Toast';

// QueryClient novo por teste (sem cache compartilhado). Sem retry por padrão, e sem
// espera entre tentativas quando um hook liga o retry por conta própria (useSession).
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, retryDelay: 0 },
      mutations: { retry: false },
    },
  });
}

export function createWrapper(queryClient = createTestQueryClient()) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>{children}</ToastProvider>
        </QueryClientProvider>
      </I18nextProvider>
    );
  };
}

// Renderiza com os mesmos providers do main.tsx, mais um router em memória na rota pedida.
export function renderWithProviders(
  ui: ReactElement,
  { route = '/' }: { route?: string } = {}
) {
  const queryClient = createTestQueryClient();
  const Wrapper = createWrapper(queryClient);

  return {
    user: userEvent.setup(),
    queryClient,
    ...render(
      <Wrapper>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Wrapper>
    ),
  };
}
