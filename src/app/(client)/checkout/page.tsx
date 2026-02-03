'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useToast } from '@/components/toast';
import { useOrders } from '@/hooks/use-data';

const schema = z.object({
  combo: z.string().min(1, 'Selecione um combo'),
  payment: z.enum(['Pix', 'Cartao', 'Dinheiro']),
  gateReference: z.string().min(5, 'Informe referência do portão')
});

const combos = ['6 fatias', '8 fatias', '10 fatias'];

export default function CheckoutPage() {
  const { push } = useToast();
  const { refetch } = useOrders();
  const [form, setForm] = useState({
    combo: combos[1],
    payment: 'Pix',
    gateReference: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        nextErrors[issue.path[0]] = issue.message;
      });
      setErrors(nextErrors);
      push({ type: 'error', message: 'Preencha os dados corretamente.' });
      return;
    }

    setErrors({});
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'u1',
        riderId: 'm1',
        items: [{ flavorId: 'f1', qty: 2 }],
        combo: form.combo,
        payment: form.payment,
        gateReference: form.gateReference
      })
    });

    await refetch();
    push({ type: 'success', message: 'Pedido criado com sucesso!' });
    setForm((prev) => ({ ...prev, gateReference: '' }));
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow">
      <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
      <p className="mt-2 text-sm text-slate-600">
        Informe a referência do portão e escolha a forma de pagamento.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase text-slate-400">Combo</label>
          <select
            value={form.combo}
            onChange={(event) => setForm({ ...form, combo: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          >
            {combos.map((combo) => (
              <option key={combo} value={combo}>
                {combo}
              </option>
            ))}
          </select>
          {errors.combo && <p className="mt-1 text-xs text-rose-600">{errors.combo}</p>}
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-400">Pagamento</label>
          <select
            value={form.payment}
            onChange={(event) => setForm({ ...form, payment: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          >
            <option value="Pix">Pix</option>
            <option value="Cartao">Cartão</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-400">
            Referência do portão
          </label>
          <input
            value={form.gateReference}
            onChange={(event) => setForm({ ...form, gateReference: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            placeholder="Ex.: portão preto, casa 12"
          />
          {errors.gateReference && (
            <p className="mt-1 text-xs text-rose-600">{errors.gateReference}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white"
        >
          Confirmar reserva
        </button>
      </form>
    </div>
  );
}
