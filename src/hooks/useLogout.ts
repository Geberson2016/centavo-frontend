import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

// Encerra a sessão no BFF (apaga o cookie) e limpa os dados em cache.
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.delete('/session');
    },
    // Mesmo se a chamada falhar, o usuário sai: o cache do app é descartado.
    onSettled: () => {
      queryClient.clear();
    },
  });
}
