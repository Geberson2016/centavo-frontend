import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import type { DashboardSummaryResponse } from '../api/types';

export function useSummary() {
  return useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async () => {
      const { data } = await api.get<DashboardSummaryResponse>(
        '/dashboard/summary'
      );
      return data;
    },
  });
}
