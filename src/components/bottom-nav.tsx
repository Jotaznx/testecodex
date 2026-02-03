'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const items = [
  { href: '/landing', label: 'Início' },
  { href: '/riders', label: 'Motoboys' },
  { href: '/checkout', label: 'Reserva' },
  { href: '/profile', label: 'Perfil' }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white px-6 py-3 shadow md:hidden">
      <div className="flex items-center justify-between text-xs font-semibold">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'flex flex-col items-center gap-1 text-slate-500',
              pathname?.startsWith(item.href) && 'text-brand-600'
            )}
          >
            <span className="h-2 w-2 rounded-full bg-current opacity-70" />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
