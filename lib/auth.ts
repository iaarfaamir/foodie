import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const secret = process.env.JWT_SECRET || 'foodie_secret';

export const createJwt = (payload: { userId: string; role: string }) => {
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

export const verifyJwt = (token: string) => {
  return jwt.verify(token, secret) as { userId: string; role: string; iat: number; exp: number };
};

export const getTokenFromRequest = (req: NextRequest) => {
  const auth = req.headers.get('authorization');
  if (!auth) return null;
  const token = auth.replace('Bearer ', '').trim();
  return token || null;
};
