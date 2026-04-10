export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';

export async function GET(req: Request) {
  try {
    await connect();
    
    const users = await User.find({}).select('email name role -password');
    const adminUser = await User.findOne({ email: 'admin@foodie.com' }).select('-password');
    const totalUsers = await User.countDocuments({});

    return NextResponse.json({
      success: true,
      databaseConnected: true,
      totalUsers,
      adminExists: !!adminUser,
      adminUser: adminUser ? { email: adminUser.email, name: adminUser.name, role: adminUser.role } : null,
      allUsers: users.map(u => ({ email: u.email, name: u.name, role: u.role }))
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        databaseConnected: false,
        error: error.message,
        mongoUri: process.env.MONGODB_URI ? 'Defined' : 'Not defined'
      },
      { status: 500 }
    );
  }
}
