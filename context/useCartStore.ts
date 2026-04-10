'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  foodId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (foodId: string) => void;
  updateQuantity: (foodId: string, quantity: number) => void;
  clear: () => void;
  total: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items;
        const existing = items.find((entry) => entry.foodId === item.foodId);
        if (existing) {
          set({
            items: items.map((entry) =>
              entry.foodId === item.foodId
                ? { ...entry, quantity: entry.quantity + item.quantity }
                : entry
            ),
          });
        } else {
          set({ items: [...items, item] });
        }
      },
      removeItem: (foodId) => {
        set({ items: get().items.filter((item) => item.foodId !== foodId) });
      },
      updateQuantity: (foodId, quantity) => {
        set({
          items: get().items.map((item) =>
            item.foodId === foodId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        });
      },
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'foodie_cart',
    }
  )
);
