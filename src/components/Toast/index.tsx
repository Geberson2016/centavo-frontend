import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { CircleAlert, CircleCheck, X } from 'lucide-react';
import { ToastContext, type ToastVariant } from './context';

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

const AUTO_DISMISS_MS = 6000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const proximoId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((atuais) => atuais.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = 'error') => {
      const id = proximoId.current++;
      setToasts((atuais) => [...atuais, { id, message, variant }]);
      window.setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Fila de avisos. aria-live faz o leitor de tela anunciar sem roubar o foco. */}
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-80"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => {
          const erro = toast.variant === 'error';
          const Icon = erro ? CircleAlert : CircleCheck;
          return (
            <div
              key={toast.id}
              role={erro ? 'alert' : 'status'}
              className={`flex items-start gap-3 p-4 rounded-2xl shadow-lg border text-sm font-bold ${
                erro
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}
            >
              <Icon size={18} className="shrink-0 mt-0.5" />
              <span className="flex-1 leading-snug">{toast.message}</span>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

