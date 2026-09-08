import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, type AppLanguage } from '../../i18n';

interface LanguageSwitcherProps {
  // 'dark' para fundo escuro (Sidebar e rodape), 'light' para fundo claro.
  tone?: 'dark' | 'light';
}

export function LanguageSwitcher({ tone = 'dark' }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();

  const atual = (
    SUPPORTED_LANGUAGES.includes(i18n.language as AppLanguage)
      ? i18n.language
      : i18n.resolvedLanguage
  ) as AppLanguage;

  const escuro = tone === 'dark';

  return (
    // group faz o papel de radiogroup para leitor de tela; aria-current marca o ativo.
    <div
      role="group"
      aria-label={t('language.label')}
      className={`flex items-center gap-1 rounded-lg p-0.5 ${
        escuro ? 'bg-slate-800' : 'bg-slate-100'
      }`}
    >
      {SUPPORTED_LANGUAGES.map((idioma) => {
        const ativo = idioma === atual;
        return (
          <button
            key={idioma}
            type="button"
            onClick={() => i18n.changeLanguage(idioma)}
            aria-current={ativo ? 'true' : undefined}
            title={t(`language.${idioma}`)}
            className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-colors ${
              ativo
                ? escuro
                  ? 'bg-slate-600 text-white'
                  : 'bg-white text-slate-800 shadow-sm'
                : escuro
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            {t(`language.${idioma}Short`)}
          </button>
        );
      })}
    </div>
  );
}
