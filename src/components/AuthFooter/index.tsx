import { useTranslation } from 'react-i18next';
import logoImg from "../../assets/logo.svg";

export function AuthFooter() {
  const { t } = useTranslation();

  return (
    <footer className="w-full py-6 mt-auto border-t border-slate-200 bg-slate-900 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <img src={logoImg} className="w-52" alt={t('common.logoAlt')} />
          <span className="text-sm font-black tracking-tighter text-slate-400 uppercase">
            {t('footer.tagline')}
          </span>
        </div>

        <nav className="flex gap-6">
          <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
            {t('footer.terms')}
          </a>
          <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
            {t('footer.privacy')}
          </a>
          <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
            {t('footer.support')}
          </a>
        </nav>
      </div>
    </footer>
  );
}