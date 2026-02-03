'use client';

import { RoleGate } from '@/components/role-gate';

export default function AdminDashboardPage() {
  return (
    <RoleGate role="admin">
      <div className="space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">
            KPIs do dia e monitoramento geral do rodízio itinerante.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: 'Pedidos hoje', value: 86 },
            { label: 'Ticket médio', value: 'R$ 39' },
            { label: 'ETA médio', value: '15 min' }
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
