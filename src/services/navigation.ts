// Navegação "hard" (recarrega a página e descarta o cache das queries). Fica isolada
// aqui para os testes poderem substituí-la: o jsdom não implementa location.href.
export function redirectToLogin() {
  window.location.href = '/login';
}
