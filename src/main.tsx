import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // Importando os caras
import App from './App'
import './index.css'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import { ToastProvider } from './components/Toast'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

// Limpeza única: antes do BFF o JWT ficava no localStorage. Agora a sessão é um
// cookie httpOnly; o token antigo não deve ficar exposto no browser.
try {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
} catch {
  // localStorage indisponível (modo privativo, cookies bloqueados).
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <App />
        </ToastProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </I18nextProvider>
  </React.StrictMode>,
)