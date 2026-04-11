import { LayoutDashboard, ReceiptText, Wallet, Tags, Users, ChevronDown } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#1e2235] h-screen text-slate-400 flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">C</div>
        <span className="text-xl font-bold text-white tracking-tight">Centavo</span>
      </div>

      <div className="px-4 mb-6">
        <div className="bg-[#2d324a] p-3 rounded-xl border border-slate-700 flex items-center justify-between cursor-pointer">
          <div className="flex flex-col">
            <span className="text-white text-[11px] font-black uppercase">Janeide</span>
            <span className="text-[10px] text-slate-500 font-bold">User ID: 9</span>
          </div>
          <ChevronDown size={14} className="text-slate-500" />
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#2d324a] text-white shadow-lg transition-all">
          <LayoutDashboard size={20} />
          <span className="font-bold text-sm text-indigo-200">Dashboard</span>
        </button>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all">
          <ReceiptText size={20} />
          <span className="font-medium text-sm">Transactions</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all">
          <Wallet size={20} />
          <span className="font-medium text-sm">Accounts</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all">
          <Tags size={20} />
          <span className="font-medium text-sm">Categories</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all">
          <Users size={20} />
          <span className="font-medium text-sm">Users</span>
        </button>
      </nav>
      
      <div className="p-6 border-t border-slate-800 flex items-center gap-3">
         <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
         </div>
         <span className="text-white font-bold text-sm tracking-tight">Centavo</span>
      </div>
    </aside>
  );
}