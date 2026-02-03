import { NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';

export async function GET() {
  return NextResponse.json({ orders: db.orders });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newOrder = {
    id: `o${db.orders.length + 1}`,
    userId: body.userId,
    riderId: body.riderId,
    items: body.items ?? [],
    combo: body.combo,
    payment: body.payment,
    gateReference: body.gateReference,
    status: 'CRIADO',
    createdAt: new Date().toISOString()
  };
  db.orders.unshift(newOrder);
  return NextResponse.json({ order: newOrder }, { status: 201 });
}
