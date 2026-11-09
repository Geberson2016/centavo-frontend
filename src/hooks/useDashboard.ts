import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import type { DashboardView } from '../api/types';

export const DASHBOARD_QUERY_KEY = ['dashboard'];

// Resumo do mês, lançamentos recentes e resumo por conta, agregados pelo BFF
// numa chamada só.
export function useDashboard() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get<DashboardView>('/dashboard');
      return data;
    },
  });
}
