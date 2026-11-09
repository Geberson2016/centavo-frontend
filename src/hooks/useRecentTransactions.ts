import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import type { RecentTransactionResponse } from '../api/types';

export function useRecentTransactions() {
  return useQuery({
    queryKey: ['recentTransactions'],
    queryFn: async () => {
      const { data } = await api.get<RecentTransactionResponse[]>(
        '/transactions/recent'
      );
      return data;
    },
  });
}
