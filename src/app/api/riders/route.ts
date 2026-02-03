import { NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const neighborhood = searchParams.get('neighborhood');

  const result = db.riders
    .filter((rider) => (neighborhood ? rider.active : true))
    .map((rider) => ({
      ...rider,
      etaMin: Math.max(5, rider.etaMin + Math.floor(Math.random() * 5) - 2)
    }));

  return NextResponse.json({
    riders: result
  });
}
