'use client';

import { useState } from 'react';
import { RoleGate } from '@/components/role-gate';
import { useOrders } from '@/hooks/use-data';

export default function AdminOrdersPage() {
  const { data } = useOrders();
  const [status, setStatus] = useState('');

  const orders = data?.orders.filter((order) => (status ? order.status === status : true));

  return (
    <RoleGate role="admin">
      <div className="space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-slate-900">Pedidos</h1>
          <p className="mt-2 text-sm text-slate-600">Filtre por status.</p>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="mt-4 rounded-2xl border border-slate-200 px-4 py-2 text-sm"
          >
            <option value="">Todos</option>
            <option value="CRIADO">Criado</option>
            <option value="CONFIRMADO">Confirmado</option>
            <option value="A_CAMINHO">A caminho</option>
            <option value="CHEGOU_NO_PORTAO">Chegou no portão</option>
            <option value="ENTREGUE">Entregue</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </div>
        <div className="space-y-3">
          {orders?.map((order) => (
            <div key={order.id} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm">
              <p className="font-semibold text-slate-800">Pedido {order.id}</p>
              <p className="text-xs text-slate-500">Status: {order.status}</p>
              <p className="text-xs text-slate-500">Pagamento: {order.payment}</p>
            </div>
          ))}
        </div>
      </div>
    </RoleGate>
  );
}
