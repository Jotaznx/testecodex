'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useToast } from '@/components/toast';
import { useAuth } from '@/hooks/use-auth';

const schema = z.object({
  phone: z.string().min(10, 'Informe o telefone'),
  code: z.string().min(4, 'Informe o código')
});

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { push } = useToast();
  const [form, setForm] = useState({ phone: '', code: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        nextErrors[issue.path[0]] = issue.message;
      });
      setErrors(nextErrors);
      push({ type: 'error', message: 'Verifique os dados informados.' });
      return;
    }

    setErrors({});
    setLoading(true);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      push({ type: 'error', message: 'Usuário não encontrado.' });
      setLoading(false);
      return;
    }

    const data = await response.json();
    login(data.user);
    setLoading(false);
    push({ type: 'success', message: 'Login realizado!' });

    if (data.user.role === 'motoboy') {
      router.push('/rider-dashboard');
      return;
    }

    if (data.user.role === 'admin') {
      router.push('/admin');
      return;
    }

    router.push('/landing');
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-6 shadow">
      <h1 className="text-2xl font-bold text-slate-900">Login</h1>
      <p className="mt-2 text-sm text-slate-600">
        Use telefone e código para entrar (mock).
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase text-slate-400">Telefone</label>
          <input
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            placeholder="11999990001"
          />
          {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-400">Código</label>
          <input
            value={form.code}
            onChange={(event) => setForm({ ...form, code: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            placeholder="1234"
          />
          {errors.code && <p className="mt-1 text-xs text-rose-600">{errors.code}</p>}
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-semibold text-slate-600">Acessos mock:</p>
        <p>Cliente: 11999990001</p>
        <p>Motoboy: 11999990002</p>
        <p>Admin: 11999990003</p>
      </div>
    </div>
  );
}
