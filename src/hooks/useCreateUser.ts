import { useMutation } from '@tanstack/react-query';
import { api } from '../services/api';

// Espelha UserRequest.java: 'age' nao existe no backend (nem no DTO nem na
// entidade) e 'phone' e opcional — so nao quebrava porque o onSubmit era `any`.
interface UserRequest {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export function useCreateUser() {
  return useMutation({
    mutationFn: async (newUser: UserRequest) => {
      return api.post('/users/register', newUser);
    },
  });
}