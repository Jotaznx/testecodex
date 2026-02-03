'use client';

import { useState } from 'react';
import { RoleGate } from '@/components/role-gate';
import { useOrders } from '@/hooks/use-data';
import { useToast } from '@/components/toast';
import type { OrderStatus } from '@/lib/types';

const statusFlow: OrderStatus[] = [
  'CONFIRMADO',
  'A_CAMINHO',
  'CHEGOU_NO_PORTAO',
  'ENTREGUE'
];

export default function RiderOrdersPage() {
  const { data, refetch } = useOrders();
  const { push } = useToast();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const updateStatus = async (id: string, status: OrderStatus) => {
    setLoadingId(id);
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    await refetch();
    push({ type: 'success', message: `Status atualizado para ${status}` });
    setLoadingId(null);
  };

  return (
    <RoleGate role="motoboy">
      <div className="space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-slate-900">Pedidos</h1>
          <p className="mt-2 text-sm text-slate-600">Aceite e acompanhe a fila.</p>
        </div>
        <div className="space-y-4">
          {data?.orders.map((order) => (
            <div key={order.id} className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Pedido {order.id}</p>
                  <p className="text-xs text-slate-500">Status atual: {order.status}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {statusFlow.map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(order.id, status)}
                      disabled={loadingId === order.id}
                      className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
                    >
                      {status.replace(/_/g, ' ')}
                    </button>
                  ))}
                  <button
                    onClick={() => updateStatus(order.id, 'CANCELADO')}
                    className="rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-500">
                Combo: {order.combo} · Pagamento: {order.payment}
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoleGate>
  );
}
