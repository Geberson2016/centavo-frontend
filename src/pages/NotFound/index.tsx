import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OctagonAlert, ArrowLeft } from 'lucide-react';

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="bg-rose-100 p-6 rounded-full text-rose-500 mb-6 animate-bounce">
        <OctagonAlert size={64} strokeWidth={1.5} />
      </div>
      
      <h1 className="text-6xl font-black text-slate-800 mb-2 tracking-tighter">{t('notFound.code')}</h1>
      <h2 className="text-2xl font-bold text-slate-700 mb-4">{t('notFound.title')}</h2>
      
      <p className="text-slate-400 max-w-md mb-8 font-medium">
        {t('notFound.message')}
      </p>

      <Link 
        to="/dashboard" 
        className="flex items-center gap-2 bg-[#4f46e5] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
      >
        <ArrowLeft size={18} />
        {t('notFound.back')}
      </Link>
    </div>
  );
}