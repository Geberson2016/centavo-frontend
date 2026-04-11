import { ArrowUpCircle, ArrowDownCircle, Utensils, Car, ShoppingBag } from 'lucide-react';

export function TransactionsTable() {
  const transactions = [
    { id: 1, desc: 'Restaurante Sabor', cat: 'Alimentação', date: '09 Abr 2026', value: -85.50, icon: Utensils, color: 'text-orange-500' },
    { id: 2, desc: 'Salário Mensal', cat: 'Renda', date: '05 Abr 2026', value: 5500.00, icon: ArrowUpCircle, color: 'text-emerald-500' },
    { id: 3, desc: 'Posto de Gasolina', cat: 'Transporte', date: '04 Abr 2026', value: -220.00, icon: Car, color: 'text-blue-500' },
    { id: 4, desc: 'Supermercado', cat: 'Alimentação', date: '02 Abr 2026', value: -450.20, icon: ShoppingBag, color: 'text-purple-500' },
  ];

  return (
    <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex justify-between items-center">
        <h3 className="font-black text-slate-800 tracking-tight">Recent Transactions</h3>
        <button className="text-indigo-600 font-bold text-xs hover:underline">View All</button>
      </div>
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-[10px] font-black text-slate-400 uppercase">Description</th>
            <th className="px-6 py-3 text-left text-[10px] font-black text-slate-400 uppercase">Category</th>
            <th className="px-6 py-3 text-left text-[10px] font-black text-slate-400 uppercase">Date</th>
            <th className="px-6 py-3 text-right text-[10px] font-black text-slate-400 uppercase">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-slate-100 ${t.color}`}>
                    <t.icon size={18} />
                  </div>
                  <span className="font-bold text-sm text-slate-700">{t.desc}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-[11px] font-black px-2 py-1 rounded-md bg-slate-100 text-slate-500 uppercase">{t.cat}</span>
              </td>
              <td className="px-6 py-4 text-xs font-bold text-slate-400">{t.date}</td>
              <td className={`px-6 py-4 text-right font-black text-sm ${t.value > 0 ? 'text-emerald-500' : 'text-slate-700'}`}>
                {t.value > 0 ? `+ R$ ${t.value.toFixed(2)}` : `- R$ ${Math.abs(t.value).toFixed(2)}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}