'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRoutes } from '@/hooks/use-data';
import { Skeleton } from '@/components/skeleton';

export default function LocalPage() {
  const [neighborhood, setNeighborhood] = useState('');
  const { data, isLoading, isError } = useRoutes();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-slate-900">Selecionar Local</h1>
        <p className="mt-2 text-sm text-slate-600">
          Informe CEP ou bairro para encontrar motoboys ativos na região.
        </p>
        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <input
            value={neighborhood}
            onChange={(event) => setNeighborhood(event.target.value)}
            placeholder="Ex.: Moema, 04000-000"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            aria-label="CEP ou bairro"
          />
          <Link
            href={`/riders?neighborhood=${encodeURIComponent(neighborhood)}`}
            className="rounded-2xl bg-brand-500 px-6 py-3 text-center text-sm font-semibold text-white"
          >
            Buscar motoboys
          </Link>
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-800">Rotas e bairros disponíveis</h2>
        {isLoading && (
          <div className="grid gap-3 md:grid-cols-2">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="h-20" />
            ))}
          </div>
        )}
        {isError && (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            Não foi possível carregar as rotas.
          </p>
        )}
        {data && (
          <div className="grid gap-3 md:grid-cols-2">
            {data.routes.map((route) => (
              <div key={route.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-800">{route.name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {route.neighborhoods.join(', ')}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
