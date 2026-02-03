'use client';

import { useState } from 'react';
import { RoleGate } from '@/components/role-gate';
import { useRoutes } from '@/hooks/use-data';
import { useToast } from '@/components/toast';

export default function RiderDashboardPage() {
  const { data } = useRoutes();
  const { push } = useToast();
  const [active, setActive] = useState(false);
  const [routeId, setRouteId] = useState('');

  const toggleShift = () => {
    setActive((prev) => !prev);
    push({
      type: 'success',
      message: active ? 'Turno encerrado.' : 'Turno iniciado!'
    });
  };

  return (
    <RoleGate role="motoboy">
      <div className="space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard do Motoboy</h1>
          <p className="mt-2 text-sm text-slate-600">
            Gerencie seu turno e selecione a rota do dia.
          </p>
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
            <button
              onClick={toggleShift}
              className={`rounded-2xl px-6 py-3 text-sm font-semibold text-white ${
                active ? 'bg-rose-500' : 'bg-emerald-500'
              }`}
            >
              {active ? 'Encerrar turno' : 'Iniciar turno'}
            </button>
            <select
              value={routeId}
              onChange={(event) => setRouteId(event.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            >
              <option value="">Selecione uma rota</option>
              {data?.routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: 'Pedidos em fila', value: 4 },
            { label: 'ETA médio', value: '14 min' },
            { label: 'Avaliação', value: '4.8' }
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
