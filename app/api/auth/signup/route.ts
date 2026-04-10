import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';
import { createJwt } from '@/lib/auth';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  await connect();
  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashedPassword });
  const token = createJwt({ userId: user._id.toString(), role: user.role });

  return NextResponse.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
}
