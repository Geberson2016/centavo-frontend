import { Utensils, Car, ShoppingBag, ArrowUpCircle, Search } from 'lucide-react';

interface Transaction {
  id: number;
  desc: string;
  cat: string;
  date: string;
  value: number;
  icon: any;
  color: string;
}

export function TransactionsTable() {
  const transactions: Transaction[] = [
    { id: 1, desc: 'Restaurante Sabor', cat: 'Alimentação', date: '09 Abr 2026', value: -85.50, icon: Utensils, color: 'text-orange-500' },
    { id: 2, desc: 'Salário Mensal', cat: 'Renda', date: '05 Abr 2026', value: 5500.00, icon: ArrowUpCircle, color: 'text-emerald-500' },
    { id: 3, desc: 'Posto de Gasolina', cat: 'Transporte', date: '04 Abr 2026', value: -220.00, icon: Car, color: 'text-blue-500' },
    { id: 4, desc: 'Supermercado', cat: 'Alimentação', date: '02 Abr 2026', value: -450.20, icon: ShoppingBag, color: 'text-purple-500' },
  ];

  return (
    <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
      {/* Header da Tabela */}
      <div className="p-6 border-b border-slate-50 flex justify-between items-center">
        <div>
          <h3 className="font-black text-slate-800 tracking-tight">Recent Transactions</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Últimos 30 dias</p>
        </div>
        <div className="flex gap-2">
           <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
              <Search size={18} />
           </button>
           <button className="text-indigo-600 font-black text-xs hover:bg-indigo-50 px-3 py-2 rounded-lg transition-all">
             View All
           </button>
        </div>
      </div>

      <table className="w-full">
        <thead className="bg-slate-50/50">
          <tr>
            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
            <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-slate-100 ${t.color} group-hover:scale-110 transition-transform`}>
                    <t.icon size={18} strokeWidth={2.5} />
                  </div>
                  <span className="font-bold text-sm text-slate-700">{t.desc}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 uppercase">
                  {t.cat}
                </span>
              </td>
              <td className="px-6 py-4 text-xs font-bold text-slate-400">
                {t.date}
              </td>
              <td className={`px-6 py-4 text-right font-black text-sm ${t.value > 0 ? 'text-emerald-500' : 'text-slate-700'}`}>
                {t.value > 0 ? `+ R$ ${t.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : `- R$ ${Math.abs(t.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}