import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-3xl bg-white p-10 text-center shadow">
      <h1 className="text-3xl font-bold text-slate-900">
        Rodízio de Pizza na Moto
      </h1>
      <p className="max-w-xl text-sm text-slate-600">
        Marketplace itinerante para reservar seu rodízio de pizzas quando o motoboy estiver
        chegando no bairro.
      </p>
      <Link
        href="/landing"
        className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white"
      >
        Encontrar moto-pizza perto de mim
      </Link>
    </div>
  );
}
