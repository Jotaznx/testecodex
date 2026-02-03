'use client';

import { useState } from 'react';
import { RoleGate } from '@/components/role-gate';
import { useFlavors } from '@/hooks/use-data';
import { useToast } from '@/components/toast';

export default function RiderStockPage() {
  const { data } = useFlavors();
  const { push } = useToast();
  const [stock, setStock] = useState<Record<string, number>>({});

  const toggleFlavor = (id: string) => {
    setStock((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = 4;
      }
      return next;
    });
  };

  const updateQty = (id: string, qty: number) => {
    setStock((prev) => ({ ...prev, [id]: qty }));
  };

  const handleSave = () => {
    push({ type: 'success', message: 'Estoque atualizado com sucesso!' });
  };

  return (
    <RoleGate role="motoboy">
      <div className="space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-slate-900">Sabores e Estoque</h1>
          <p className="mt-2 text-sm text-slate-600">
            Ative sabores disponíveis e ajuste as quantidades.
          </p>
        </div>
        <div className="space-y-3">
          {data?.flavors.map((flavor) => (
            <div
              key={flavor.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">{flavor.name}</p>
                <p className="text-xs text-slate-500">{flavor.tags.join(', ')}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleFlavor(flavor.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    stock[flavor.id]
                      ? 'bg-emerald-500 text-white'
                      : 'border border-slate-200 text-slate-600'
                  }`}
                >
                  {stock[flavor.id] ? 'Ativo' : 'Inativo'}
                </button>
                <input
                  type="number"
                  min={0}
                  value={stock[flavor.id] ?? 0}
                  onChange={(event) => updateQty(flavor.id, Number(event.target.value))}
                  className="w-20 rounded-2xl border border-slate-200 px-3 py-2 text-sm"
                  aria-label={`Quantidade para ${flavor.name}`}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleSave}
          className="rounded-2xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white"
        >
          Salvar alterações
        </button>
      </div>
    </RoleGate>
  );
}
