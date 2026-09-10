import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextValue {
  showToast: (title: string, description?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((title: string, description?: string, type: ToastType = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div id="toast-portal-container" className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border bg-white/95 backdrop-blur-md transition-all transform translate-y-0"
            style={{
              borderColor: toast.type === 'success' ? '#86efac' : toast.type === 'error' ? '#fca5a5' : '#cbd5e1'
            }}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />}

            <div className="flex-1 text-sm">
              <p className="font-semibold text-slate-800">{toast.title}</p>
              {toast.description && <p className="text-slate-500 text-xs mt-0.5">{toast.description}</p>}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
