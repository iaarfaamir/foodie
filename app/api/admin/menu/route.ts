import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Food from '@/models/Food';
import { getTokenFromRequest, verifyJwt } from '@/lib/auth';

const requireAdmin = async (req: Request) => {
  const token = getTokenFromRequest(req as any);
  if (!token) throw new Error('Unauthorized');
  const payload = verifyJwt(token);
  if (payload.role !== 'admin') throw new Error('Forbidden');
  return payload;
};

export async function GET(req: Request) {
  await connect();
  const menu = await Food.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ menu });
}

export async function POST(req: Request) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    const item = await Food.create(body);
    return NextResponse.json({ item });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create item';
    return NextResponse.json({ message }, { status: message === 'Unauthorized' ? 401 : 403 });
  }
}

export async function DELETE(req: Request) {
  try {
    await requireAdmin(req);
    const url = new URL(req.url);
    const foodId = url.searchParams.get('foodId');
    if (!foodId) {
      return NextResponse.json({ message: 'Missing foodId' }, { status: 400 });
    }
    await connect();
    await Food.findByIdAndDelete(foodId);
    return NextResponse.json({ message: 'Item deleted' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to delete item';
    return NextResponse.json({ message }, { status: message === 'Unauthorized' ? 401 : 403 });
  }
}
