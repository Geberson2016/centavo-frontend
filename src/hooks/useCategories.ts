import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export interface Category {
  id: number;
  name: string;
  type: 'RECEITA' | 'DESPESA';
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get<Category[]>('/categories');
      return data;
    },
  });
}