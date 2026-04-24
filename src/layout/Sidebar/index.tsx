import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ReceiptText,
  Wallet,
  Tags,
  Users,
  ChevronDown,
} from "lucide-react";
import logoImg from "../../assets/logo.svg";

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 h-screen text-slate-400 flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <img src={logoImg} className="w-52" alt="Centavo Logo" />
      </div>

      <div className="px-4 mb-6">
        <div className="bg-[#2d324a] p-3 rounded-xl border border-slate-700 flex items-center justify-between cursor-pointer">
          <div className="flex flex-col">
            <span className="text-white text-[11px] font-black uppercase">
              Janeide
            </span>
            <span className="text-[10px] text-slate-500 font-bold">
              User ID: 9
            </span>
          </div>
          <ChevronDown size={14} className="text-slate-500" />
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <NavItem
          to="/dashboard"
          icon={LayoutDashboard}
          label="Dashboard"
          active={location.pathname === "/dashboard"}
        />
        <NavItem
          to="/transactions"
          icon={ReceiptText}
          label="Transactions"
          active={location.pathname === "/transactions"}
        />
        <NavItem
          to="/accounts"
          icon={Wallet}
          label="Accounts"
          active={location.pathname === "/accounts"}
        />
        <NavItem
          to="/categories"
          icon={Tags}
          label="Categories"
          active={location.pathname === "/categories"}
        />
        <NavItem
          to="/users"
          icon={Users}
          label="Users"
          active={location.pathname === "/users"}
        />
      </nav>

      <div className="p-6 border-t border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
        </div>
        <span className="text-white font-bold text-sm tracking-tight">
          Centavo
        </span>
      </div>
    </aside>
  );
}

function NavItem({ to, icon: Icon, label, active }: any) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active
          ? "bg-[#2d324a] text-white shadow-lg font-bold"
          : "hover:bg-slate-800 hover:text-slate-200"
      }`}
    >
      <Icon size={20} />
      <span className="text-sm">{label}</span>
    </Link>
  );
}
