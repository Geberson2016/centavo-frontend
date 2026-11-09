import { useMutation } from '@tanstack/react-query';
import { api } from '../services/api';
import type { UserRegisterResponse, UserRequest } from '../api/types';

export function useCreateUser() {
  return useMutation({
    mutationFn: async (newUser: UserRequest) => {
      const { data } = await api.post<UserRegisterResponse>(
        '/users/register',
        newUser
      );
      return data;
    },
  });
}
