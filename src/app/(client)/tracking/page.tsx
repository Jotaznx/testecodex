'use client';

import { useEffect, useState } from 'react';
import { StatusStepper } from '@/components/status-stepper';
import { useOrders, useRiders } from '@/hooks/use-data';
import { Skeleton } from '@/components/skeleton';

export default function TrackingPage() {
  const { data: orderData, isLoading } = useOrders();
  const { data: riderData } = useRiders();
  const order = orderData?.orders[0];
  const rider = riderData?.riders.find((item) => item.id === order?.riderId);
  const [eta, setEta] = useState(rider?.etaMin ?? 15);

  useEffect(() => {
    const interval = setInterval(() => {
      setEta((prev) => Math.max(5, prev + (Math.random() > 0.7 ? 2 : -1)));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <Skeleton className="h-60" />;
  }

  if (!order) {
    return (
      <p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Nenhum pedido em andamento.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-slate-900">Acompanhamento do Pedido</h1>
        <p className="mt-2 text-sm text-slate-600">
          ETA atual: <span className="font-semibold text-brand-600">{eta} min</span>
        </p>
        {eta > 20 && (
          <p className="mt-2 rounded-2xl bg-amber-50 px-4 py-2 text-xs text-amber-700">
            Pedido atrasado, o motoboy está ajustando a rota.
          </p>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-slate-800">Status</h2>
          <div className="mt-4">
            <StatusStepper status={order.status} />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-slate-800">Motoboy</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p className="font-semibold text-slate-800">{rider?.name ?? 'Rota em curso'}</p>
            <p>Pagamento: {order.payment}</p>
            <p>Referência: {order.gateReference}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
