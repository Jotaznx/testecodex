import { NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';

export async function POST(request: Request) {
  const body = await request.json();
  const phone = String(body.phone || '');
  const user = db.users.find((entry) => entry.phone === phone);

  if (!user) {
    return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 404 });
  }

  return NextResponse.json({
    user,
    token: `mock-${user.id}`
  });
}
