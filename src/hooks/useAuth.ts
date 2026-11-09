import { useSession } from './useSession';

// Usuário logado, lido da sessão do BFF (não mais do localStorage).
export function useAuth() {
  const { data: user } = useSession();
  return { user };
}
