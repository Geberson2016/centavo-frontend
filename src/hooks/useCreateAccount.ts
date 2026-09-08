import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export type AccountType = 'CHECKING' | 'SAVINGS' | 'INVESTMENT' | 'CASH' | 'CREDIT_CARD';

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