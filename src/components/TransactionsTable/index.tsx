import { TrendingUp, TrendingDown } from 'lucide-react';
import type { RecentTransaction } from '../../hooks/useRecentTransactions';

interface TransactionsTableProps {
  transactions: RecentTransaction[];
  isLoading?: boolean;
  isError?: boolean;
}

export function TransactionsTable({
  transactions,
  isLoading,
  isError,
}: TransactionsTableProps) {
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  const isFuture = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();
    return (
      date.getMonth() > today.getMonth() ||
      date.getFullYear() > today.getFullYear()
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex justify-between items-center">
        <div>
          <h3 className="font-black text-slate-800 tracking-tight">
            Recent Transactions
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Últimos 30 dias
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="p-10 text-center text-slate-400 font-bold text-sm">
          Carregando transações...
        </div>
      )}

      {isError && (
        <div className="p-10 text-center text-red-400 font-bold text-sm">
          Erro ao carregar transações.
        </div>
      )}

      {!isLoading && !isError && transactions?.length === 0 && (
        <div className="p-10 text-center text-slate-400 font-bold text-sm">
          Nenhuma transação nos últimos 30 dias.
        </div>
      )}

      {!isLoading && !isError && transactions && transactions.length > 0 && (
        <table className="w-full">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Description
              </th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Category
              </th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Date
              </th>
              <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((t, index) => {
              const isRevenue = t.type === 'RECEITA';
              const Icon = isRevenue ? TrendingUp : TrendingDown;

              return (
                <tr
                  key={index}
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-xl group-hover:scale-110 transition-transform ${
                          isRevenue
                            ? 'bg-emerald-50 text-emerald-500'
                            : 'bg-rose-50 text-rose-500'
                        }`}
                      >
                        <Icon size={18} strokeWidth={2.5} />
                      </div>
                      <span className="font-bold text-sm text-slate-700">
                        {t.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 uppercase">
                      {t.categoryName}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 text-xs font-bold ${isFuture(t.date) ? 'text-rose-400' : 'text-slate-400'}`}
                  >
                    {formatDate(t.date)}
                  </td>
                  <td
                    className={`px-6 py-4 text-right font-black text-sm ${isRevenue ? 'text-emerald-500' : 'text-rose-500'}`}
                  >
                    {isRevenue
                      ? `+ R$ ${formatCurrency(t.value)}`
                      : `- R$ ${formatCurrency(t.value)}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
