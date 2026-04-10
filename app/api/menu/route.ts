export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Food from '@/models/Food';

const seedMenu = [
  {
    name: 'Classic Wagyu Burger',
    description: 'Wagyu beef, truffle mayo, caramelized onion',
    price: 18.5,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
  },
  {
    name: 'Burrata Margherita',
    description: 'Buffalo mozzarella, fresh basil, olive oil',
    price: 16,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
  },
  {
    name: 'Salmon Poke Bowl',
    description: 'Fresh salmon, edamame, avocado, rice',
    price: 14.25,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=80',
    rating: 4.7,
  },
  {
    name: 'Cilantro Lime Shrimp',
    description: 'Spicy grilled shrimp, cabbage slaw',
    price: 12.9,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    rating: 4.6,
  },
  {
    name: 'Wild Silk Carbonara',
    description: 'Handmade tagliatelle, guanciale, pecorino romano',
    price: 22,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=900&q=80',
    rating: 4.7,
  },
  {
    name: 'Aegean Zen Bowl',
    description: 'Crisp greens, whipped feta, cucumber pearls',
    price: 17,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80',
    rating: 4.6,
  },
];

export async function GET(req: Request) {
  await connect();
  const existingCount = await Food.countDocuments();
  if (existingCount === 0) {
    await Food.create(seedMenu);
  }
  const category = new URL(req.url).searchParams.get('category');
  const filter = category ? { category } : {};
  const menu = await Food.find(filter).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ menu });
}
