'use client';

import { useState } from 'react';
import { z } from 'zod';
import { RoleGate } from '@/components/role-gate';
import { useRoutes } from '@/hooks/use-data';
import { useToast } from '@/components/toast';

const schema = z.object({
  name: z.string().min(3, 'Informe o nome da rota'),
  neighborhoods: z.string().min(3, 'Informe ao menos um bairro')
});

export default function AdminRoutesPage() {
  const { data, refetch } = useRoutes();
  const { push } = useToast();
  const [form, setForm] = useState({ name: '', neighborhoods: '' });
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
      return;
    }

    await fetch('/api/routes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        neighborhoods: form.neighborhoods.split(',').map((item) => item.trim())
      })
    });
    push({ type: 'success', message: 'Rota criada com sucesso!' });
    setForm({ name: '', neighborhoods: '' });
    setErrors({});
    await refetch();
  };

  return (
    <RoleGate role="admin">
      <div className="space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-slate-900">Rotas e Bairros</h1>
          <p className="mt-2 text-sm text-slate-600">CRUD simples de rotas.</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400">Nome</label>
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />
              {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400">Bairros</label>
              <input
                value={form.neighborhoods}
                onChange={(event) => setForm({ ...form, neighborhoods: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Centro, Liberdade"
              />
              {errors.neighborhoods && (
                <p className="mt-1 text-xs text-rose-600">{errors.neighborhoods}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 rounded-2xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white"
          >
            Criar rota
          </button>
        </form>
        <div className="grid gap-3 md:grid-cols-2">
          {data?.routes.map((route) => (
            <div key={route.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-800">{route.name}</p>
              <p className="text-xs text-slate-500">{route.neighborhoods.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </RoleGate>
  );
}
