"use client";

import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md animate-in slide-in-from-right fade-in duration-300 ${
      type === 'success' 
        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
        : 'bg-red-500/10 border-red-500/20 text-red-400'
    }`}>
      {type === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
      <span className="font-medium text-sm">{message}</span>
      <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors ml-2">
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;
