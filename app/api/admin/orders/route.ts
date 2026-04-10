import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Order from '@/models/Order';
import { getTokenFromRequest, verifyJwt } from '@/lib/auth';

const requireAdmin = async (req: Request) => {
  const token = getTokenFromRequest(req as any);
  if (!token) throw new Error('Unauthorized');
  const payload = verifyJwt(token);
  if (payload.role !== 'admin') throw new Error('Forbidden');
  return payload;
};

export async function GET(req: Request) {
  try {
    await requireAdmin(req);
    await connect();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ orders });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unauthorized';
    return NextResponse.json({ message }, { status: message === 'Unauthorized' ? 401 : 403 });
  }
}

export async function PATCH(req: Request) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    const { orderId, status } = body;
    if (!orderId || !status) {
      return NextResponse.json({ message: 'Missing orderId or status' }, { status: 400 });
    }
    await connect();
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }
    order.status = status;
    await order.save();
    return NextResponse.json({ order });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to update order';
    return NextResponse.json({ message }, { status: message === 'Unauthorized' ? 401 : 403 });
  }
}
