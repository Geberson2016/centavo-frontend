import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import type { AccountSummaryResponse } from '../api/types';

export function useAccountSummary() {
  return useQuery({
    queryKey: ['accountSummary'],
    queryFn: async () => {
      const { data } = await api.get<AccountSummaryResponse[]>(
        '/accounts/accountSummary'
      );
      return data;
    },
  });
}
