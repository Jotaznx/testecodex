'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFlavors, useRiders } from '@/hooks/use-data';
import { RiderCard } from '@/components/rider-card';
import { Skeleton } from '@/components/skeleton';

const filters = [
  { id: 'fast', label: 'Mais rápido' },
  { id: 'rating', label: 'Melhor avaliado' },
  { id: 'flavors', label: 'Mais sabores' }
];

export default function RidersPage() {
  const params = useSearchParams();
  const neighborhood = params.get('neighborhood') ?? undefined;
  const { data, isLoading, isError, refetch } = useRiders(neighborhood);
  const { data: flavorData } = useFlavors();
  const [activeFilter, setActiveFilter] = useState('fast');
  const [search, setSearch] = useState('');

  const riders = useMemo(() => {
    if (!data?.riders) return [];
    let list = [...data.riders];
    if (activeFilter === 'fast') {
      list.sort((a, b) => a.etaMin - b.etaMin);
    }
    if (activeFilter === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }
    if (activeFilter === 'flavors') {
      list.sort((a, b) => b.menuLive.length - a.menuLive.length);
    }
    if (search && flavorData?.flavors) {
      const lower = search.toLowerCase();
      list = list.filter((rider) =>
        rider.menuLive.some((item) => {
          const flavor = flavorData.flavors.find((entry) => entry.id === item.flavorId);
          return flavor?.name.toLowerCase().includes(lower);
        })
      );
    }
    return list;
  }, [activeFilter, data?.riders, flavorData?.flavors, search]);

  return (
    <div className="space-y-6">
      <header className="rounded-3xl bg-white p-6 shadow">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Motoboys ativos</h1>
            <p className="mt-2 text-sm text-slate-600">
              {neighborhood
                ? `Bairro selecionado: ${neighborhood}`
                : 'Escolha um bairro para ver quem está próximo.'}
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
          >
            Atualizar lista
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeFilter === filter.id
                    ? 'bg-brand-500 text-white'
                    : 'border border-slate-200 text-slate-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar sabor"
            className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm md:max-w-xs"
            aria-label="Buscar sabor"
          />
        </div>
      </header>

      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-36" />
          ))}
        </div>
      )}

      {isError && (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          Não foi possível carregar os motoboys.
        </p>
      )}

      {data && riders.length === 0 && (
        <p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
          Sem motoboys ativos na região ou com esse sabor no momento.
        </p>
      )}

      {data && flavorData && riders.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {riders.map((rider) => (
            <RiderCard key={rider.id} rider={rider} flavors={flavorData.flavors} />
          ))}
        </div>
      )}
    </div>
  );
}
