import { useMutation } from '@tanstack/react-query';
import { api } from '../services/api';

interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: async (credentials: AuthRequest): Promise<AuthResponse> => {
      const response = await api.post('/users/login', credentials);
      return response.data;
    },
  });
}