import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { SummaryCard } from '../../components/SummaryCard';
import { AccountCard } from '../../components/AccountCard';
import { TransactionsTable } from '../../components/TransactionsTable';
import { useSummary } from '../../hooks/useSummary';
import { useEffect, useRef, useState } from 'react';
import { useAccountSummary } from '../../hooks/useAccountSummary';
import { useRecentTransactions } from '../../hooks/useRecentTransactions';

export function Dashboard() {
  const {
    data: summary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useSummary();
  const {
    data: transactions = [],
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
  } = useRecentTransactions();

  const formatCurrency = (value: number = 0) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const { data: accounts } = useAccountSummary();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'right' ? 280 : -280,
        behavior: 'smooth',
      });
    }
  };

  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const check = () => setShowButtons(el.scrollWidth > el.clientWidth);
    check();

    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [accounts]);

  if (isTransactionsLoading)
    return (
      <div className="p-10 text-slate-500 font-bold">Carregando dados...</div>
    );
  if (isTransactionsError)
    return (
      <div className="p-10 text-red-500 font-bold">
        Erro ao conectar com o servidor.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Dashboard
        </h1>
        <a
          href="/transactions"
          className="flex bg-slate-900 text-white px-5 py-2.5 rounded-xl 
          items-center gap-2 font-bold text-sm shadow-indigo-200 shadow-lg hover:bg-slate-800 transition-all active:scale-95"
        >
          <Plus size={18} strokeWidth={3} />
          Add transaction
        </a>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <SummaryCard
          title="Saldo Total"
          value={formatCurrency(summary?.totalBalance)}
          detail="Histórico acumulado"
          type="wallet"
        />
        <SummaryCard
          title="Fatura do Mês"
          value={formatCurrency(summary?.creditCardBill)}
          detail="Cartão de crédito"
          type="credit"
        />
        <SummaryCard
          title="Saldo do Mês"
          value={formatCurrency(summary?.monthlySavings)}
          detail="Receitas - Despesas"
          type="piggyBank"
        />
        <SummaryCard
          title="Despesas"
          value={formatCurrency(summary?.totalExpense)}
          detail="Mês atual"
          type="expense"
        />
        <SummaryCard
          title="Receita"
          value={formatCurrency(summary?.totalRevenue)}
          detail="Mês atual"
          type="revenue"
        />
        <SummaryCard
          title="Receita Prevista"
          value={formatCurrency(summary?.scheduledRevenue)}
          detail="Agendamentos futuros"
          type="revenue"
        />
        <SummaryCard
          title="Despesa Prevista"
          value={formatCurrency(summary?.scheduledExpense)}
          detail="Agendamentos futuros"
          type="expense"
        />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-black text-slate-800 mb-6 tracking-tight">
          My Accounts
        </h2>
        <div className="relative">
          {showButtons && (
            <button
              onClick={() => scroll('left')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 rounded-full p-1.5 shadow-sm hover:bg-slate-50 transition-all"
            >
              <ChevronLeft size={18} className="text-slate-600" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
          >
            {accounts?.map((account) => (
              <AccountCard
                key={account.accountId}
                accountName={account.accountName}
                accountType={account.accountType}
                totalRevenue={account.totalRevenue}
                totalExpense={account.totalExpense}
              />
            ))}
          </div>

          {showButtons && (
            <button
              onClick={() => scroll('right')}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 rounded-full p-1.5 shadow-sm hover:bg-slate-50 transition-all"
            >
              <ChevronRight size={18} className="text-slate-600" />
            </button>
          )}
        </div>
      </section>

      <section>
        <TransactionsTable
          transactions={transactions}
          isLoading={isTransactionsLoading}
          isError={isTransactionsError}
        />
      </section>
    </div>
  );
}
