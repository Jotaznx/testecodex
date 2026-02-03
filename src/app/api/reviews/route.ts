import { NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';

export async function GET() {
  return NextResponse.json({ reviews: db.reviews });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newReview = {
    id: `rev${db.reviews.length + 1}`,
    orderId: body.orderId,
    rating: body.rating,
    comment: body.comment
  };
  db.reviews.push(newReview);
  return NextResponse.json({ review: newReview }, { status: 201 });
}
