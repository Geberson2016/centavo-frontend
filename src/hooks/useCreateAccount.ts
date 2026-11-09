import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { AccountRequest, AccountResponse } from '../api/types';
import { DASHBOARD_QUERY_KEY } from './useDashboard';

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newAccount: AccountRequest) => {
      const { data } = await api.post<AccountResponse>('/accounts', newAccount);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      // A conta nova aparece nos cards do dashboard.
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY });
    },
  });
}
