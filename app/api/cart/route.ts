import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';
import { getTokenFromRequest, verifyJwt } from '@/lib/auth';

export async function GET(req: Request) {
  const token = getTokenFromRequest(req as any);
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const payload = verifyJwt(token);
  await connect();
  const user = (await User.findById(payload.userId).lean()) as { cart?: unknown[] } | null;
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ cart: user.cart || [] });
}

export async function POST(req: Request) {
  const token = getTokenFromRequest(req as any);
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const payload = verifyJwt(token);
  const body = await req.json();
  const { items } = body;
  if (!Array.isArray(items)) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  }
  await connect();
  const user = await User.findById(payload.userId);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  user.cart = items;
  await user.save();
  return NextResponse.json({ cart: user.cart });
}
