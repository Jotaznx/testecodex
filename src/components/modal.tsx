'use client';

import { clsx } from 'clsx';

export function Modal({
  open,
  title,
  onClose,
  children
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className={clsx(
              'rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600',
              'hover:border-brand-300 hover:text-brand-600'
            )}
          >
            Fechar
          </button>
        </div>
        <div className="mt-4 space-y-3">{children}</div>
      </div>
    </div>
  );
}
