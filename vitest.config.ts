import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// Testes de componente e hook em jsdom. A rede é simulada pelo MSW (src/test/server.ts):
// nenhuma chamada sai da máquina e requisição sem handler faz o teste falhar.
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: 'jsdom',
    // Mesma origem do Vite em dev; as chamadas relativas a /bff resolvem contra ela.
    environmentOptions: { jsdom: { url: 'http://localhost:5173' } },
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    clearMocks: true,
    restoreMocks: true,
  },
});
