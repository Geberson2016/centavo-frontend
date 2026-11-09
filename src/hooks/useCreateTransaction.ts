import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { TransactionRequest, TransactionResponse } from '../api/types';

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTransaction: TransactionRequest) => {
      const { data } = await api.post<TransactionResponse>(
        '/transactions',
        newTransaction
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
    },
  });
}
