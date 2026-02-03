import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/navbar';
import { BottomNav } from '@/components/bottom-nav';

export const metadata: Metadata = {
  title: 'Rodízio de Pizza na Moto',
  description: 'Marketplace itinerante de rodízio de pizzas por bairro.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <Navbar />
          <main className="mx-auto min-h-screen max-w-6xl px-4 pb-24 pt-6">
            {children}
          </main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
