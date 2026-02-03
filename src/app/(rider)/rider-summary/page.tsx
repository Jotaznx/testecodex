'use client';

import { RoleGate } from '@/components/role-gate';

export default function RiderSummaryPage() {
  return (
    <RoleGate role="motoboy">
      <div className="space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-slate-900">Resumo do turno</h1>
          <p className="mt-2 text-sm text-slate-600">
            Métricas do turno atual e avaliações recentes.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: 'Pedidos concluídos', value: 12 },
            { label: 'Total em vendas', value: 'R$ 480' },
            { label: 'Avaliação média', value: '4.9' }
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase text-slate-400">{item.label}</p>
              <p className="text-lg font-semibold text-slate-800">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </RoleGate>
  );
}
