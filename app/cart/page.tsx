'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';
import { useCartStore } from '@/context/useCartStore';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-background text-text">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 xl:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-white p-8 shadow-soft">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-secondary">Your cart</p>
                  <h1 className="mt-3 text-3xl font-bold text-text">Ready when you are</h1>
                </div>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-text/70">{items.length} items</span>
              </div>
            </div>
            {items.length === 0 ? (
              <div className="rounded-[2rem] bg-white p-16 text-center shadow-soft">
                <p className="text-xl font-semibold text-text">Your cart is empty.</p>
                <p className="mt-3 text-text/70">Browse the menu to add delicious dishes.</p>
                <Link href="/menu" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-secondary">
                  Browse menu
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.foodId}
                    item={item}
                    onQuantityChange={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="space-y-6">
            <OrderSummary subtotal={total} deliveryFee={4.5} />
            <Link href="/checkout" className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition hover:bg-secondary">
              Checkout now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
