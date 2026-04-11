import { ArrowUpRight, CreditCard } from 'lucide-react';

interface AccountCardProps {
  bank: string;
  type: 'Bank' | 'Credit';
  value: string;
  label: string;
}

export function AccountCard({ bank, type, value, label }: AccountCardProps) {
  return (
    <div className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-100 min-w-[240px]">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${type === 'Bank' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-500'}`}>
          {type === 'Bank' ? <ArrowUpRight size={18} /> : <CreditCard size={18} />}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">{bank}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">{type}</p>
        </div>
      </div>
      <h4 className="text-xl font-black text-slate-800 mb-2">{value}</h4>
      <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-slate-100 text-slate-500 uppercase">{label}</span>
    </div>
  );
}