import { ArrowUpRight, ArrowDownRight, CreditCard, PiggyBank, Wallet } from 'lucide-react';

export function SummaryCard({ title, value, detail, type }: any) {
  const colors: any = {
    emerald: { text: 'text-emerald-500', bg: 'bg-emerald-50', icon: Wallet, arrow: '↑' },
    rose: { text: 'text-rose-500', bg: 'bg-rose-50', icon: CreditCard, arrow: '↓' },
    indigo: { text: 'text-[#4f46e5]', bg: 'bg-indigo-50', icon: PiggyBank, arrow: '' }
  };
  
  const config = colors[type];
  const Icon = config.icon;

  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col justify-between h-40 relative overflow-hidden">
      <div className={`absolute top-5 right-5 p-2 rounded-xl ${config.bg} ${config.text}`}>
        <Icon size={20} strokeWidth={2.5} />
      </div>

      <div>
        <div className="flex justify-between items-start mb-1">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{title}</p>
        </div>
        <div className="flex items-center gap-2">
          <h3 className={`text-3xl font-black tracking-tighter ${config.text}`}>{value}</h3>
          <span className={`text-xl font-bold ${config.text}`}>{config.arrow}</span>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-[11px] text-slate-400 font-bold leading-tight uppercase">
          {detail}
        </p>
      </div>
    </div>
  );
}

export function AccountCard({ bank, type, value, label }: any) {
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
      <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-slate-100 text-slate-500 uppercase">
        {label}
      </span>
    </div>
  );
}