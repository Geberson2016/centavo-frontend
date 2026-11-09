import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { CategoryRequest, CategoryResponse } from '../api/types';

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCategory: CategoryRequest) => {
      const { data } = await api.post<CategoryResponse>(
        '/categories',
        newCategory
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}
