import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBR from './pt-BR.json';
import en from './en.json';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  resolveLanguage,
} from './language';

export {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  isSupportedLanguage,
  type AppLanguage,
} from './language';

export const resources = {
  'pt-BR': { translation: ptBR },
  en: { translation: en },
} as const;

function readStoredLanguage(): string | null {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch {
    // localStorage indisponivel (modo privativo, cookies bloqueados).
    return null;
  }
}

// Mantem o atributo lang e o titulo da aba junto com o idioma ativo: o lang e de
// onde leitor de tela e corretor ortografico tiram a pronuncia correta.
function syncDocument(language: string) {
  document.documentElement.lang = language;
  const title = i18n.t('common.pageTitle');
  if (title) document.title = title;
}

i18n.use(initReactI18next).init({
  resources,
  lng: resolveLanguage(readStoredLanguage(), navigator.languages ?? []),
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  interpolation: {
    // O React ja escapa o que renderiza; escapar de novo corromperia acentos.
    escapeValue: false,
  },
});

syncDocument(i18n.language);

i18n.on('languageChanged', (language) => {
  syncDocument(language);
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Sem persistencia a escolha vale so para esta sessao — nao e motivo de erro.
  }
});

export default i18n;
