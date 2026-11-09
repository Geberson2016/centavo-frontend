import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SummaryCard } from '../../components/SummaryCard';
import { AccountCard } from '../../components/AccountCard';
import { TransactionsTable } from '../../components/TransactionsTable';
import { useEffect, useRef, useState } from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import { useTranslation } from 'react-i18next';

export function Dashboard() {
  const { t, i18n } = useTranslation();
  // Uma chamada só: o BFF agrega resumo, lançamentos recentes e contas.
  const { data: dashboard, isLoading, isError } = useDashboard();
  const summary = dashboard?.summary;
  const transactions = dashboard?.recentTransactions ?? [];
  const accounts = dashboard?.accounts;

  const formatCurrency = (value: number = 0) => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

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
  const [showAllCards, setShowAllCards] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const check = () => setShowButtons(el.scrollWidth > el.clientWidth);
    check();

    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [accounts]);

  // Sem o resumo os cards renderizariam valores vazios como se fossem zero, o que
  // num app de finanças é pior que avisar.
  if (isLoading)
    return (
      <div className="p-10 text-slate-500 font-bold">{t('common.loading')}</div>
    );
  if (isError)
    return (
      <div className="p-10 text-red-500 font-bold">
        {t('common.serverError')}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          {t('dashboard.title')}
        </h1>
        <a
          href="/transactions"
          className="flex bg-slate-900 text-white px-5 py-2.5 rounded-xl 
          items-center gap-2 font-bold text-sm shadow-indigo-200 shadow-lg hover:bg-slate-800 transition-all active:scale-95"
        >
          <Plus size={18} strokeWidth={3} />
          {t('dashboard.addTransaction')}
        </a>
      </header>

      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            title={t('dashboard.cards.totalBalance')}
            value={formatCurrency(summary?.totalBalance)}
            detail={t('dashboard.cards.totalBalanceDetail')}
            type="wallet"
          />
          <SummaryCard
            title={t('dashboard.cards.creditCardBill')}
            value={formatCurrency(summary?.creditCardBill)}
            detail={t('dashboard.cards.creditCardBillDetail')}
            type="credit"
          />
          <SummaryCard
            title={t('dashboard.cards.monthlySavings')}
            value={formatCurrency(summary?.monthlySavings)}
            detail={t('dashboard.cards.monthlySavingsDetail')}
            type="piggyBank"
          />

          {showAllCards && (
            <>
              <SummaryCard
                title={t('dashboard.cards.expense')}
                value={formatCurrency(summary?.totalExpense)}
                detail={t('dashboard.cards.currentMonth')}
                type="expense"
              />
              <SummaryCard
                title={t('dashboard.cards.revenue')}
                value={formatCurrency(summary?.totalRevenue)}
                detail={t('dashboard.cards.currentMonth')}
                type="revenue"
              />
              <SummaryCard
                title={t('dashboard.cards.scheduledRevenue')}
                value={formatCurrency(summary?.scheduledRevenue)}
                detail={t('dashboard.cards.scheduledDetail')}
                type="revenue"
              />
              <SummaryCard
                title={t('dashboard.cards.scheduledExpense')}
                value={formatCurrency(summary?.scheduledExpense)}
                detail={t('dashboard.cards.scheduledDetail')}
                type="expense"
              />
            </>
          )}
        </div>

        <button
          onClick={() => setShowAllCards(!showAllCards)}
          className="mt-4 text-xs font-bold text-indigo-600 hover:underline"
        >
          {showAllCards ? 'Ver menos' : 'Ver todos os indicadores'}
        </button>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-black text-slate-800 mb-6 tracking-tight">
          {t('dashboard.myAccounts')}
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
            {accounts && accounts.length === 0 ? (
              <Link
                to="/accounts"
                className="bg-white border-2 border-dashed border-slate-200 rounded-[24px] min-w-[260px] h-[140px] flex flex-col items-center justify-center gap-2 hover:border-indigo-400 hover:bg-indigo-50 transition-all group"
              >
                <div className="p-2 rounded-full bg-slate-100 group-hover:bg-indigo-100 transition-colors">
                  <Plus
                    size={18}
                    className="text-slate-400 group-hover:text-indigo-600 transition-colors"
                  />
                </div>
                <span className="text-xs font-black text-slate-400 group-hover:text-indigo-600 uppercase tracking-wider transition-colors">
                  {t('dashboard.createFirstAccount')}
                </span>
              </Link>
            ) : (
              accounts?.map((account) => (
                <AccountCard
                  key={account.accountId}
                  accountName={account.accountName}
                  accountType={account.accountType}
                  totalRevenue={account.totalRevenue}
                  totalExpense={account.totalExpense}
                />
              ))
            )}
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
          isLoading={isLoading}
          isError={isError}
        />
      </section>
    </div>
  );
}
