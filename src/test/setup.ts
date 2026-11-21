import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import i18n from '../i18n';
import { server } from './server';

beforeAll(async () => {
  // Chamada ao BFF sem handler é erro de teste, não rede de verdade.
  server.listen({ onUnhandledFrame: 'error' });
  // Idioma fixo: o jsdom anuncia en-US, e os textos esperados nos testes são pt-BR.
  await i18n.changeLanguage('pt-BR');
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
