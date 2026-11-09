import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import type { CategoryResponse } from '../api/types';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get<CategoryResponse[]>('/categories');
      return data;
    },
  });
}
