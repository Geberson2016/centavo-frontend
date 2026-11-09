import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { AuthRequest, SessionUser } from '../api/types';
import { SESSION_QUERY_KEY } from './useSession';

// Abre a sessão no BFF. O cookie vem na resposta; o corpo traz só o usuário.
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: AuthRequest) => {
      const { data } = await api.post<SessionUser>('/session', credentials);
      return data;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(SESSION_QUERY_KEY, user);
    },
  });
}
