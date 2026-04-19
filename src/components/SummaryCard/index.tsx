import { Wallet, CreditCard, PiggyBank } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  detail: string;
  type: "emerald" | "rose" | "indigo";
}

export function SummaryCard({ title, value, detail, type }: SummaryCardProps) {
  const colors = {
    emerald: {
      text: "text-emerald-500",
      bg: "bg-emerald-50",
      icon: Wallet,
      arrow: "↑",
    },
    rose: {
      text: "text-rose-500",
      bg: "bg-rose-50",
      icon: CreditCard,
      arrow: "↓",
    },
    indigo: {
      text: "text-[#4f46e5]",
      bg: "bg-indigo-50",
      icon: PiggyBank,
      arrow: "",
    },
  };

  const config = colors[type];
  const Icon = config.icon;

  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col justify-between h-40 ">
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
          {title}
        </p>

        <div
          className={`rounded-xl w-10 h-10 flex items-center justify-center ${config.bg} ${config.text}`}
        >
          <Icon size={20} strokeWidth={2.5} />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className={`text-3xl font-black tracking-tighter ${config.text}`}>
            {value}
          </h3>
          <span className={`text-xl font-bold ${config.text}`}>
            {config.arrow}
          </span>
        </div>
      </div>
      <p className="text-[11px] text-slate-400 font-bold leading-tight uppercase">
        {detail}
      </p>
    </div>
  );
}
