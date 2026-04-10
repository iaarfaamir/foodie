export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Order from '@/models/Order';
import User from '@/models/User';
import { getTokenFromRequest, verifyJwt } from '@/lib/auth';

export async function GET(req: Request) {
  const token = getTokenFromRequest(req as any);
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const payload = verifyJwt(token);
  await connect();
  const orders = await Order.find({ userId: payload.userId }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ orders });
}

export async function POST(req: Request) {
  const token = getTokenFromRequest(req as any);
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const payload = verifyJwt(token);
  const body = await req.json();
  const { deliveryAddress, paymentMethod, items, totalPrice } = body;

  if (!deliveryAddress || !items || !Array.isArray(items) || !totalPrice) {
    return NextResponse.json({ message: 'Missing order data' }, { status: 400 });
  }

  await connect();
  const user = await User.findById(payload.userId);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const order = await Order.create({
    userId: user._id,
    items,
    totalPrice,
    deliveryAddress,
    paymentMethod,
  });

  user.cart = [];
  await user.save();

  return NextResponse.json({ order });
}
