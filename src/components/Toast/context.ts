import { createContext, useContext } from 'react';

export type ToastVariant = 'error' | 'success';

export interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast precisa estar dentro de um ToastProvider');
  }
  return context;
}
