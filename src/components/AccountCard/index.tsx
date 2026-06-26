import { TrendingUp, TrendingDown, CreditCard, Wallet } from 'lucide-react';

interface AccountCardProps {
  accountName: string;
  accountType: string;
  totalRevenue: number;
  totalExpense: number;
}

const ACCOUNT_TYPE_CONFIG: Record<
  string,
  { label: string; icon: React.ElementType; color: string; bg: string }
> = {
  CARTAO_CREDITO: {
    label: 'Cartão de Crédito',
    icon: CreditCard,
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
  CORRENTE: {
    label: 'Conta Corrente',
    icon: Wallet,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  POUPANCA: {
    label: 'Poupança',
    icon: Wallet,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  INVESTIMENTO: {
    label: 'Investimento',
    icon: TrendingUp,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  DINHEIRO: {
    label: 'Dinheiro',
    icon: Wallet,
    color: 'text-slate-600',
    bg: 'bg-slate-100',
  },
};

const formatCurrency = (value: number = 0) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    value
  );

export function AccountCard({
  accountName,
  accountType,
  totalRevenue,
  totalExpense,
}: AccountCardProps) {
  const config = ACCOUNT_TYPE_CONFIG[accountType] ?? {
    label: accountType,
    icon: Wallet,
    color: 'text-slate-600',
    bg: 'bg-slate-100',
  };

  const Icon = config.icon;

  return (
    <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 min-w-[260px]">
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2 rounded-lg ${config.bg} ${config.color}`}>
          <Icon size={18} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">{accountName}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">
            {config.label}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-emerald-500">
          <TrendingUp size={14} />
          <span className="text-[11px] font-bold uppercase">Receita</span>
        </div>
        <span className="text-sm font-black text-emerald-500">
          {formatCurrency(totalRevenue)}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-rose-500">
          <TrendingDown size={14} />
          <span className="text-[11px] font-bold uppercase">Despesa</span>
        </div>
        <span className="text-sm font-black text-rose-500">
          {formatCurrency(totalExpense)}
        </span>
      </div>
    </div>
  );
}
