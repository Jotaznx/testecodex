import { NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';

export async function GET() {
  return NextResponse.json({ flavors: db.flavors });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newFlavor = {
    id: `f${db.flavors.length + 1}`,
    name: body.name,
    tags: body.tags ?? [],
    allergens: body.allergens ?? []
  };
  db.flavors.push(newFlavor);
  return NextResponse.json({ flavor: newFlavor }, { status: 201 });
}
