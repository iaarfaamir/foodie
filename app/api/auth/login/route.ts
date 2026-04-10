import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';
import { createJwt } from '@/lib/auth';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ message: 'Missing email or password' }, { status: 400 });
  }

  await connect();
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = createJwt({ userId: user._id.toString(), role: user.role });
  return NextResponse.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
}
