import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../components/Toast/context';
import { errorTranslationKey } from '../utils/apiError';

// Traduz uma falha da API para mensagem localizada e mostra no toast.
// `fallbackKey` cobre o caso de erro sem codigo conhecido, permitindo uma
// mensagem mais util que a generica (ex.: "nao foi possivel criar a conta").
export function useApiErrorToast() {
  const { t } = useTranslation();
  const { showToast } = useToast();

  return useCallback(
    (error: unknown, fallbackKey?: string) => {
      const chave = errorTranslationKey(error);
      const semCodigo = chave === 'errors.GENERIC';
      showToast(t(semCodigo && fallbackKey ? fallbackKey : chave));
    },
    [showToast, t]
  );
}
