'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedLayout from '@/components/ProtectedLayout';
import toast, { Toaster } from 'react-hot-toast';

type Order = {
  _id: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  totalPrice: number;
  status: string;
  deliveryAddress: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        if (response.ok) {
          setOrders(data.orders || []);
        } else {
          toast.error(data.message || 'Unable to load orders');
        }
      } catch (error) {
        toast.error('Unexpected error loading orders');
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <main className="min-h-screen bg-background text-text">
      <Navbar />
      <Toaster position="top-right" />
      <ProtectedLayout>
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-secondary">Order history</p>
            <h1 className="mt-4 text-4xl font-bold">Your previous orders</h1>
          </div>
          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="h-40 rounded-[2rem] bg-slate-200 animate-pulse" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-[2rem] bg-white p-12 text-center shadow-soft">
              <h2 className="text-2xl font-semibold">No orders yet</h2>
              <p className="mt-3 text-text/70">Place your first order and track it on this page.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="rounded-[2rem] bg-white p-8 shadow-soft">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-text">Order #{order._id.slice(-6)}</h2>
                      <p className="mt-1 text-sm text-text/70">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <span className="rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary capitalize">
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-text/70">Delivery address</p>
                      <p className="mt-2 text-base text-text">{order.deliveryAddress}</p>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-text/70">Total</p>
                      <p className="mt-2 text-base font-semibold text-text">${order.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                        <p className="text-sm text-text/80">{item.quantity}× {item.name}</p>
                        <p className="text-sm font-medium text-text">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </ProtectedLayout>
    </main>
  );
}
