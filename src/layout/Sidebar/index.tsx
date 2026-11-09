import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ReceiptText,
  Wallet,
  Tags,
  Users,
  LogOut,
} from 'lucide-react';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { useLogout } from '../../hooks/useLogout';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

export function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout(undefined, { onSettled: () => navigate('/login') });
  };

  const { user } = useAuth();

  return (
    <aside className="w-64 bg-slate-900 h-screen text-slate-400 flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <img src={logoImg} className="w-52" alt={t('common.logoAlt')} />
      </div>

      <div className="px-4 mb-6">
        <div className="bg-[#2d324a] p-3 rounded-xl border border-slate-700 flex items-center justify-between cursor-pointer">
          <div className="flex flex-col">
            <span className="text-white text-sm font-bold">{user?.name}</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <NavItem
          to="/dashboard"
          icon={LayoutDashboard}
          label={t('nav.dashboard')}
          active={location.pathname === '/dashboard'}
        />
        <NavItem
          to="/transactions"
          icon={ReceiptText}
          label={t('nav.transactions')}
          active={location.pathname === '/transactions'}
        />
        <NavItem
          to="/accounts"
          icon={Wallet}
          label={t('nav.accounts')}
          active={location.pathname === '/accounts'}
        />
        <NavItem
          to="/categories"
          icon={Tags}
          label={t('nav.categories')}
          active={location.pathname === '/categories'}
        />
        <NavItem
          to="/users"
          icon={Users}
          label={t('nav.users')}
          active={location.pathname === '/users'}
        />
      </nav>

      <div className="p-4 border-t border-slate-800 flex items-center gap-3 justify-between">
        <LanguageSwitcher tone="dark" />
        <button
          onClick={handleLogout}
          title={t('nav.logout')}
          aria-label={t('nav.logout')}
          className="text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
        >
          <NavItem icon={LogOut} />
        </button>
      </div>
    </aside>
  );
}

interface NavItemProps {
  to?: string;
  icon: React.ElementType;
  label?: string;
  active?: boolean;
}

function NavItem({ to, icon: Icon, label, active }: NavItemProps) {
  const conteudo = (
    <>
      <Icon size={20} />
      {label && <span className="text-sm">{label}</span>}
    </>
  );

  const classe = `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
    active
      ? 'bg-[#2d324a] text-white shadow-lg font-bold'
      : 'hover:bg-slate-800 hover:text-slate-200'
  }`;

  // Sem destino o item e apenas visual — e o caso do botao de sair, que ja
  // tem o seu proprio <button> em volta. Aninhar um Link ali seria invalido.
  if (!to) {
    return <span className={classe}>{conteudo}</span>;
  }

  return (
    <Link to={to} className={classe}>
      {conteudo}
    </Link>
  );
}
