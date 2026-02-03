'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useFlavors, useRiders } from '@/hooks/use-data';
import { Modal } from '@/components/modal';
import { useToast } from '@/components/toast';
import { Skeleton } from '@/components/skeleton';
import type { Flavor, Rider } from '@/lib/types';

const combos = [
  { id: '6 fatias', limit: 2, price: 32 },
  { id: '8 fatias', limit: 3, price: 42 },
  { id: '10 fatias', limit: 4, price: 52 }
];

export default function RiderDetailPage() {
  const params = useParams();
  const riderId = params?.id as string;
  const { data, isLoading } = useRiders();
  const { data: flavorData } = useFlavors();
  const { push } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(combos[1]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [eta, setEta] = useState<number | null>(null);

  const rider = useMemo(
    () => data?.riders.find((entry) => entry.id === riderId),
    [data?.riders, riderId]
  );

  useEffect(() => {
    if (rider) setEta(rider.etaMin);
  }, [rider]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEta((prev) => {
        if (!prev) return prev;
        return Math.max(5, prev + (Math.random() > 0.6 ? 1 : -1));
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const availableFlavors = useMemo(() => {
    if (!rider || !flavorData) return [];
    return rider.menuLive
      .map((item) => flavorData.flavors.find((flavor) => flavor.id === item.flavorId))
      .filter(Boolean) as Flavor[];
  }, [flavorData, rider]);

  const toggleFlavor = (id: string) => {
    setSelectedFlavors((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= selectedCombo.limit) {
        push({ type: 'error', message: 'Limite de sabores atingido para o combo.' });
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleReserve = () => {
    if (selectedFlavors.length === 0) {
      push({ type: 'error', message: 'Selecione pelo menos um sabor.' });
      return;
    }
    push({ type: 'success', message: 'Reserva enviada! Confira o checkout.' });
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Skeleton className="h-64" />;
  }

  if (!rider) {
    return (
      <p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Motoboy não encontrado.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <header className="rounded-3xl bg-white p-6 shadow">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{rider.name}</h1>
            <p className="mt-2 text-sm text-slate-600">
              ETA ao portão: <span className="font-semibold text-brand-600">{eta} min</span>
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white"
          >
            Reservar combo
          </button>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
            <p className="text-xs uppercase text-slate-400">Rota</p>
            <p className="font-semibold text-slate-800">{rider.routeId}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
            <p className="text-xs uppercase text-slate-400">Nota</p>
            <p className="font-semibold text-slate-800">{rider.rating.toFixed(1)}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
            <p className="text-xs uppercase text-slate-400">Status</p>
            <p className="font-semibold text-slate-800">
              {rider.active ? 'Rodando agora' : 'Offline'}
            </p>
          </div>
        </div>
      </header>

      <section className="rounded-3xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-slate-800">Sabores disponíveis agora</h2>
        {availableFlavors.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">
            Motoboy sem sabores disponíveis no momento.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {availableFlavors.map((flavor) => (
              <div
                key={flavor.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">{flavor.name}</p>
                  <p className="text-xs text-slate-500">{flavor.tags.join(', ')}</p>
                </div>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  Ao vivo
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <Modal
        open={isModalOpen}
        title="Selecione sabores para o combo"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-slate-400">Combo</label>
          <div className="flex flex-wrap gap-2">
            {combos.map((combo) => (
              <button
                key={combo.id}
                onClick={() => setSelectedCombo(combo)}
                className={`rounded-full px-3 py-2 text-xs font-semibold ${
                  selectedCombo.id === combo.id
                    ? 'bg-brand-500 text-white'
                    : 'border border-slate-200 text-slate-600'
                }`}
              >
                {combo.id} · R$ {combo.price}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-slate-400">
            Sabores (até {selectedCombo.limit})
          </label>
          <div className="grid gap-2">
            {availableFlavors.map((flavor) => (
              <button
                key={flavor.id}
                onClick={() => toggleFlavor(flavor.id)}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm ${
                  selectedFlavors.includes(flavor.id)
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                <span>{flavor.name}</span>
                {selectedFlavors.includes(flavor.id) ? 'Selecionado' : 'Selecionar'}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleReserve}
          className="w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white"
        >
          Confirmar seleção
        </button>
      </Modal>
    </div>
  );
}
