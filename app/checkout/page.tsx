'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useCartStore } from '@/context/useCartStore';
import toast, { Toaster } from 'react-hot-toast';

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const router = useRouter();
  const [address, setAddress] = useState('123 Culinary Heights, Apt 4B');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/menu');
    }
  }, [cartItems.length, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deliveryAddress: address,
          paymentMethod,
          items: cartItems,
          totalPrice: subtotal + 4.5 + subtotal * 0.08,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to place order');
      }
      toast.success('Order placed successfully');
      clear();
      router.push('/orders');
    } catch (error) {
      toast.error((error as Error).message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-text">
      <Navbar />
      <Toaster position="top-right" />
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-soft">
            <h1 className="text-3xl font-bold text-text">Checkout</h1>
            <p className="mt-3 text-text/70">Confirm your delivery details and place your order.</p>
            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-text/80">Delivery address</label>
                <textarea
                  required
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-text outline-none focus:border-primary"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text/80">Payment method</label>
                <select
                  value={paymentMethod}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-text outline-none focus:border-primary"
                >
                  <option>Cash on Delivery</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Placing order...' : 'Place Order'}
              </button>
            </form>
          </div>
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-white p-8 shadow-soft">
              <h2 className="text-2xl font-bold text-text">Order summary</h2>
              <div className="mt-6 space-y-4 text-sm text-text/70">
                {cartItems.map((item) => (
                  <div key={item.foodId} className="flex items-center justify-between gap-4">
                    <span>{item.quantity}× {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-slate-200 pt-5 text-sm text-text/70">
                <div className="flex justify-between py-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Delivery fee</span>
                  <span>$4.50</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Tax</span>
                  <span>${(subtotal * 0.08).toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between text-lg font-bold text-text">
                <span>Total</span>
                <span>${(subtotal + 4.5 + subtotal * 0.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
