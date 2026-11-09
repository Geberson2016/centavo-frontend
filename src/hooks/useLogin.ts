import { useMutation } from '@tanstack/react-query';
import { api } from '../services/api';
import type { AuthRequest, UserResponse } from '../api/types';

export function useLogin() {
  return useMutation({
    mutationFn: async (credentials: AuthRequest) => {
      const { data } = await api.post<UserResponse>('/users/login', credentials);
      return data;
    },
  });
}
