import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

interface TransactionRequest {
  description: string;
  value: number;
  date: string;
  accountId: number;
  categoryId: number;
  type: 'INCOME' | 'EXPENSE';
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTransaction: TransactionRequest) => {
      return api.post('/transactions', newTransaction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
    },
  });
}