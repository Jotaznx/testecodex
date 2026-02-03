import { NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const order = db.orders.find((entry) => entry.id === params.id);

  if (!order) {
    return NextResponse.json({ message: 'Pedido não encontrado.' }, { status: 404 });
  }

  order.status = body.status ?? order.status;
  return NextResponse.json({ order });
}
