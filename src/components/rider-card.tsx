import Link from 'next/link';
import { Rider, Flavor } from '@/lib/types';

export function RiderCard({
  rider,
  flavors
}: {
  rider: Rider;
  flavors: Flavor[];
}) {
  const flavorNames = rider.menuLive
    .map((item) => flavors.find((flavor) => flavor.id === item.flavorId)?.name)
    .filter(Boolean)
    .slice(0, 3)
    .join(', ');

  return (
    <Link
      href={`/rider/${rider.id}`}
      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-brand-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-800">{rider.name}</p>
          <p className="text-xs text-slate-500">Nota {rider.rating.toFixed(1)}</p>
        </div>
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          ETA {rider.etaMin} min
        </span>
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase text-slate-400">Sabores ao vivo</p>
        <p className="text-sm text-slate-700">
          {rider.menuLive.length > 0 ? flavorNames : 'Sem sabores no momento'}
        </p>
      </div>
      <div className="text-xs text-slate-400">
        Rota {rider.routeId} · {rider.active ? 'Ativo' : 'Offline'}
      </div>
    </Link>
  );
}
