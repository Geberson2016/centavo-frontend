import { Plus } from "lucide-react";
import { SummaryCard } from "../../components/SummaryCard";
import { AccountCard } from "../../components/AccountCard";
import { TransactionsTable } from "../../components/TransactionsTable";
import { useSummary } from "../../hooks/useSummary";

export function Dashboard() {
  const { data: summary, isLoading, isError } = useSummary();

  const formatCurrency = (value: number = 0) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  if (isLoading)
    return (
      <div className="p-10 text-slate-500 font-bold">Carregando dados...</div>
    );
  if (isError)
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
          title="Balanço Total"
          value={formatCurrency(summary?.totalBalance)}
          detail="Total acumulado"
          type="emerald"
        />
        <SummaryCard
          title="Extrato do cartão de crédito"
          value={formatCurrency(summary?.creditCardBill)}
          detail="Nubank credito"
          type="rose"
        />
        <SummaryCard
          title="Poupança Mensal"
          value={formatCurrency(summary?.monthlySavings)}
          detail="Saldo Positivo"
          type="indigo"
        />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-black text-slate-800 mb-6 tracking-tight">
          My Accounts
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          <AccountCard
            bank="Nubank Debito"
            type="Bank"
            value="R$ 15.480,22"
            label="CONTA CORRENTE"
          />
          <AccountCard
            bank="Nubank credito"
            type="Credit"
            value="R$ 3.150,80"
            label="CARTAO CREDITO"
          />
          <AccountCard
            bank="Mercado Pago credito"
            type="Credit"
            value="R$ 250,20"
            label="CARTAO CREDITO"
          />
        </div>
      </section>

      <section>
        <TransactionsTable />
      </section>
    </div>
  );
}
