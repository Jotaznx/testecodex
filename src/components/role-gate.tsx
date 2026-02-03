'use client';

import { useAuth } from '@/hooks/use-auth';
import type { Role } from '@/lib/types';

export function RoleGate({
  role,
  children
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (!user || user.role !== role) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow">
        <h1 className="text-xl font-semibold text-slate-900">Acesso restrito</h1>
        <p className="mt-2 text-sm text-slate-600">
          Faça login com perfil {role} para visualizar este conteúdo.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
