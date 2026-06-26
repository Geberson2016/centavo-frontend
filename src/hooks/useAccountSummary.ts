import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

interface AccountSummary {
  accountId: number;
  accountName: string;
  accountType: string;
  totalRevenue: number;
  totalExpense: number;
}

export function useAccountSummary() {
  return useQuery<AccountSummary[]>({
    queryKey: ['accountSummary'],
    queryFn: async () => {
      const response = await api.get('/accounts/accountSummary');
      return response.data;
    },
  });
}
