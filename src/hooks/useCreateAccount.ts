import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export type AccountType = 'CORRENTE' | 'POUPANCA' | 'INVESTIMENTO' | 'DINHEIRO' | 'CARTAO_CREDITO';

interface AccountRequest {
  name: string;
  type: AccountType;
  userId: number;
}

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newAccount: AccountRequest) => {
      return api.post('/accounts', newAccount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
}