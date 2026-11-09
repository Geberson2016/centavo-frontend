import axios from 'axios';

// A UI fala só com o BFF, na mesma origem (proxy do Vite em dev). A sessão vai
// num cookie httpOnly que o browser manda sozinho: nenhum token passa pelo JS.
export const api = axios.create({ baseURL: '/bff' });

// Rotas em que 401 é resposta esperada (credencial errada, ainda sem sessão) e
// não sinal de sessão expirada.
const AUTH_ROUTES = ['/session', '/users/register'];

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 numa rota autenticada = sessão expirada ou derrubada: o BFF já apagou o
    // cookie, então volta para o login (hard, para limpar o cache das queries).
    const url: string = error.config?.url ?? '';
    const isAuthRoute = AUTH_ROUTES.some((route) => url.startsWith(route));

    if (error.response?.status === 401 && !isAuthRoute) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
