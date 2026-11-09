import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '../services/api';
import type { SessionUser } from '../api/types';

export const SESSION_QUERY_KEY = ['session'];

// Usuário da sessão atual (cookie httpOnly gerenciado pelo BFF). 401 = sem sessão.
export function useSession() {
  return useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get<SessionUser>('/session');
      return data;
    },
    // 401 não melhora tentando de novo; outros erros (BFF fora) seguem o padrão.
    retry: (failureCount, error) =>
      !isUnauthenticated(error) && failureCount < 3,
    staleTime: 5 * 60 * 1000,
  });
}

export function isUnauthenticated(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 401;
}
