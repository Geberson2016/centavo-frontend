import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export interface RecentTransaction {
  description: string;
  categoryName: string;
  date: string;
  value: number;
  type: 'RECEITA' | 'DESPESA';
}

export function useRecentTransactions() {
  return useQuery<RecentTransaction[]>({
    queryKey: ['recentTransactions'],
    queryFn: async () => {
      const response = await api.get('/transactions/recent');
      return response.data;
    },
  });
}
