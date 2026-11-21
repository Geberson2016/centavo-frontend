import { setupServer } from 'msw/node';

// BFF falso dos testes. Cada teste declara as rotas que usa com server.use(...).
export const server = setupServer();
