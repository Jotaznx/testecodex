'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { useAuth } from '@/hooks/use-auth';

const links = [
  { href: '/landing', label: 'Início' },
  { href: '/local', label: 'Local' },
  { href: '/riders', label: 'Motoboys' },
  { href: '/tracking', label: 'Pedido' }
];

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/landing" className="text-lg font-bold text-brand-600">
          Rodízio na Moto
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'text-sm font-medium transition',
                pathname?.startsWith(link.href)
                  ? 'text-brand-600'
                  : 'text-slate-600 hover:text-brand-600'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden text-right text-xs text-slate-600 md:block">
              <p className="font-semibold text-slate-800">{user.name}</p>
              <p className="capitalize">{user.role}</p>
            </div>
          ) : null}
          {user ? (
            <button
              onClick={logout}
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-brand-300 hover:text-brand-600"
            >
              Sair
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-brand-500 px-4 py-2 text-xs font-semibold text-white shadow"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
