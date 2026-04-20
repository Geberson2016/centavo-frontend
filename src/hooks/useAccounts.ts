import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export interface Account {
  id: number;
  name: string;
  type: string;
}

export function useAccounts() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const { data } = await api.get<Account[]>('/accounts');
      return data;
    },
  });
}