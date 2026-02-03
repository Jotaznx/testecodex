'use client';

import { useState } from 'react';
import { z } from 'zod';
import { RoleGate } from '@/components/role-gate';
import { useFlavors } from '@/hooks/use-data';
import { useToast } from '@/components/toast';

const schema = z.object({
  name: z.string().min(3, 'Informe o nome do sabor'),
  tags: z.string().min(2, 'Informe ao menos uma tag')
});

export default function AdminFlavorsPage() {
  const { data, refetch } = useFlavors();
  const { push } = useToast();
  const [form, setForm] = useState({ name: '', tags: '', allergens: '' });
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

    await fetch('/api/flavors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        tags: form.tags.split(',').map((item) => item.trim()),
        allergens: form.allergens.split(',').map((item) => item.trim())
      })
    });
    push({ type: 'success', message: 'Sabor criado com sucesso!' });
    setForm({ name: '', tags: '', allergens: '' });
    setErrors({});
    await refetch();
  };

  return (
    <RoleGate role="admin">
      <div className="space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-slate-900">Sabores</h1>
          <p className="mt-2 text-sm text-slate-600">CRUD simples de sabores globais.</p>
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
              <label className="text-xs font-semibold uppercase text-slate-400">Tags</label>
              <input
                value={form.tags}
                onChange={(event) => setForm({ ...form, tags: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="apimentada, doce"
              />
              {errors.tags && <p className="mt-1 text-xs text-rose-600">{errors.tags}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400">Alergênicos</label>
              <input
                value={form.allergens}
                onChange={(event) => setForm({ ...form, allergens: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="lactose, ovo"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 rounded-2xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white"
          >
            Criar sabor
          </button>
        </form>
        <div className="grid gap-3 md:grid-cols-2">
          {data?.flavors.map((flavor) => (
            <div key={flavor.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-800">{flavor.name}</p>
              <p className="text-xs text-slate-500">{flavor.tags.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </RoleGate>
  );
}
