export const dynamic = 'force-dynamic';

import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';
import { createJwt } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing email or password' }, { status: 400 });
    }

    await connect();
    
    // Trim email and convert to lowercase for consistency
    const normalizedEmail = email.toLowerCase().trim();
    
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log(`[LOGIN] User not found: ${normalizedEmail}`);
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`[LOGIN] Password mismatch for: ${normalizedEmail}`);
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = createJwt({ userId: user._id.toString(), role: user.role });
    return NextResponse.json({ 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }, 
      token 
    });
  } catch (error: any) {
    console.error('[LOGIN ERROR]', error);
    return NextResponse.json({ message: 'Login failed', error: error.message }, { status: 500 });
  }
}
