'use client';

import { useOrders, useReviews } from '@/hooks/use-data';
import { Skeleton } from '@/components/skeleton';

export default function ProfilePage() {
  const { data: orderData, isLoading } = useOrders();
  const { data: reviewData } = useReviews();

  if (isLoading) {
    return <Skeleton className="h-60" />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-slate-900">Perfil</h1>
        <p className="mt-2 text-sm text-slate-600">Histórico de pedidos e avaliações.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-3xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-slate-800">Histórico de pedidos</h2>
          <div className="mt-4 space-y-3">
            {orderData?.orders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-slate-200 p-4 text-sm">
                <p className="font-semibold text-slate-800">Pedido {order.id}</p>
                <p className="text-xs text-slate-500">Status: {order.status}</p>
                <p className="text-xs text-slate-500">Combo: {order.combo}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-3xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-slate-800">Avaliações</h2>
          <div className="mt-4 space-y-3">
            {reviewData?.reviews.map((review) => (
              <div key={review.id} className="rounded-2xl border border-slate-200 p-4 text-sm">
                <p className="font-semibold text-slate-800">Nota {review.rating}</p>
                <p className="text-xs text-slate-500">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
