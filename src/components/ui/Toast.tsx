"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { IconButton } from './Button';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).substring(7);
    const toast: Toast = { id, type, title, message };
    
    setToasts((prev) => [...prev, toast]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-accent-green" />,
    error: <XCircle className="w-5 h-5 text-accent-red" />,
    warning: <AlertCircle className="w-5 h-5 text-accent-orange" />,
    info: <Info className="w-5 h-5 text-accent-blue" />
  };

  return (
    <div className="bg-bg-secondary rounded-[var(--radius-md)] shadow-[var(--shadow-xl)] p-4 flex gap-3 animate-slideInRight">
      <div className="flex-shrink-0 mt-0.5">
        {icons[toast.type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-body font-semibold text-text-primary mb-1">
          {toast.title}
        </p>
        {toast.message && (
          <p className="text-body-sm text-text-secondary">
            {toast.message}
          </p>
        )}
      </div>
      <IconButton
        icon={<X className="w-4 h-4" />}
        label="Close"
        onClick={onClose}
        className="flex-shrink-0"
      />
    </div>
  );
}
