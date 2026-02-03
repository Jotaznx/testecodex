import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-white p-8 shadow">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Rodízio itinerante
            </p>
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Rodízio de pizza chegando na sua rua.
            </h1>
            <p className="text-sm text-slate-600">
              Motoboys com rotas por bairro atualizam sabores ao vivo. Reserve o combo e pegue
              no portão com pagamento rápido.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/local"
                className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white"
              >
                Encontrar moto-pizza perto de mim
              </Link>
              <Link
                href="/riders"
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700"
              >
                Ver motoboys ativos
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-brand-50 p-6 text-sm text-slate-700">
            <p className="font-semibold text-slate-800">Como funciona</p>
            <ol className="mt-4 space-y-3 text-sm">
              <li>1. Escolha seu bairro e veja quem está rodando.</li>
              <li>2. Confira sabores disponíveis no momento.</li>
              <li>3. Reserve seu combo e aguarde o motoboy chegar.</li>
            </ol>
          </div>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Sabores ao vivo',
            text: 'Estoque atualizado durante o turno, com alertas de esgotado.'
          },
          {
            title: 'Reserva no portão',
            text: 'Informe a referência e o motoboy entrega rapidamente.'
          },
          {
            title: 'Rotas inteligentes',
            text: 'Veja ETA e filtre pelos mais rápidos ou bem avaliados.'
          }
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-base font-semibold text-slate-800">{item.title}</p>
            <p className="mt-2 text-sm text-slate-600">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
