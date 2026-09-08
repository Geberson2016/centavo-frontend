// Regras de escolha de idioma, sem efeito colateral e sem depender de globais:
// tudo entra por parametro para poder ser testado isoladamente.

export const SUPPORTED_LANGUAGES = ['pt-BR', 'en'] as const;

export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: AppLanguage = 'pt-BR';

export const LANGUAGE_STORAGE_KEY = 'language';

export function isSupportedLanguage(value: string | null): value is AppLanguage {
  return !!value && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

// Aceita um 'pt-PT' ou 'en-GB' do navegador e cai no idioma equivalente que
// existe no produto, comparando so a parte base da tag.
function matchByBaseTag(candidate: string): AppLanguage | null {
  const base = candidate.split('-')[0].toLowerCase();
  return (
    SUPPORTED_LANGUAGES.find(
      (language) => language.split('-')[0].toLowerCase() === base
    ) ?? null
  );
}

// Ordem de decisao: escolha salva > idioma do navegador > padrao.
export function resolveLanguage(
  stored: string | null,
  browserLanguages: readonly string[] = []
): AppLanguage {
  if (isSupportedLanguage(stored)) return stored;

  for (const candidate of browserLanguages) {
    if (!candidate) continue;
    if (isSupportedLanguage(candidate)) return candidate;
    const equivalent = matchByBaseTag(candidate);
    if (equivalent) return equivalent;
  }

  return DEFAULT_LANGUAGE;
}
