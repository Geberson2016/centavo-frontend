import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBR from './pt-BR.json';
import en from './en.json';

// Idioma padrao do produto. O 'en' existe para cumprir a politica de i18n
// (AGENTS.md secao 1.2): nenhum texto de usuario cravado no codigo.
export const DEFAULT_LANGUAGE = 'pt-BR';

export const resources = {
  'pt-BR': { translation: ptBR },
  en: { translation: en },
} as const;

export type AppLanguage = keyof typeof resources;

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    // O React ja escapa o que renderiza; escapar de novo corromperia acentos.
    escapeValue: false,
  },
});

export default i18n;
