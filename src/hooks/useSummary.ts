import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

interface DashboardSummary {
  totalBalance: number;
  creditCardBill: number;
  monthlySavings: number;
  totalExpense: number;
  totalRevenue: number;
  scheduledRevenue: number;
  scheduledExpense: number;
}

export function useSummary() {
  return useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async () => {
      const { data } = await api.get<DashboardSummary>('/dashboard/summary');
      return data;
    },
  });
}
