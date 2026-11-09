import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import type { AccountResponse } from '../api/types';

export function useAccounts() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const { data } = await api.get<AccountResponse[]>('/accounts');
      return data;
    },
  });
}
