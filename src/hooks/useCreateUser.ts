import { useMutation } from '@tanstack/react-query';
import { api } from '../services/api';

interface UserRequest {
  name: string;
  email: string;
  phone: string;
  age: number;
  password: string;
}

export function useCreateUser() {
  return useMutation({
    mutationFn: async (newUser: UserRequest) => {
      return api.post('/users/register', newUser);
    },
  });
}