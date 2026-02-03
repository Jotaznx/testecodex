import { NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';

export async function GET() {
  return NextResponse.json({ routes: db.routes });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newRoute = {
    id: `r${db.routes.length + 1}`,
    name: body.name,
    neighborhoods: body.neighborhoods ?? []
  };
  db.routes.push(newRoute);
  return NextResponse.json({ route: newRoute }, { status: 201 });
}
