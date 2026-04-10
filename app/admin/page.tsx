'use client';

import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedLayout from '@/components/ProtectedLayout';
import { useAuthStore } from '@/context/useAuthStore';
import toast, { Toaster } from 'react-hot-toast';

type Food = { _id: string; name: string; category: string; price: number; rating: number; image: string };
type Order = { _id: string; status: string; totalPrice: number; deliveryAddress: string; createdAt: string };

export default function AdminPage() {
  const user = useAuthStore((state) => state.user);
  const [menu, setMenu] = useState<Food[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ name: '', description: '', category: 'Pizza', price: '18', image: '' });

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }
    async function fetchAdminData() {
      setLoading(true);
      try {
        const [menuRes, ordersRes] = await Promise.all([fetch('/api/admin/menu'), fetch('/api/admin/orders')]);
        const menuData = await menuRes.json();
        const ordersData = await ordersRes.json();
        if (menuRes.ok) setMenu(menuData.menu || []);
        if (ordersRes.ok) setOrders(ordersData.orders || []);
      } catch (error) {
        toast.error('Unable to load admin data.');
      } finally {
        setLoading(false);
      }
    }
    fetchAdminData();
  }, [isAdmin]);

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/admin/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newItem, price: Number(newItem.price), rating: 4.8 }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMenu((current) => [data.item, ...current]);
      toast.success('Menu item created');
      setNewItem({ name: '', description: '', category: 'Pizza', price: '18', image: '' });
    } catch (error) {
      toast.error((error as Error).message || 'Create failed');
    }
  };

  const handleStatus = async (id: string, status: string) => {
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: id, status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setOrders((current) => current.map((order) => (order._id === id ? { ...order, status } : order)));
      toast.success('Order status updated');
    } catch (error) {
      toast.error((error as Error).message || 'Update failed');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/menu?foodId=${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMenu(menu.filter((item) => item._id !== id));
      toast.success('Item removed');
    } catch (error) {
      toast.error((error as Error).message || 'Delete failed');
    }
  };

  const statusClasses = (status: string) =>
    status === 'pending' ? 'bg-yellow-100 text-yellow-800' : status === 'preparing' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';

  return (
    <main className="min-h-screen bg-background text-text">
      <Navbar />
      <Toaster position="top-right" />
      <ProtectedLayout>
        <section className="mx-auto max-w-7xl px-6 py-12">
          {!isAdmin ? (
            <div className="rounded-[2rem] bg-white p-12 shadow-soft text-center">
              <h1 className="text-3xl font-bold">Admin access required</h1>
              <p className="mt-3 text-text/70">Sign in with an admin account to view dashboard tools.</p>
            </div>
          ) : loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="h-40 rounded-[2rem] bg-slate-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-10">
              <div className="rounded-[2rem] bg-white p-8 shadow-soft">
                <h1 className="text-3xl font-bold">Admin dashboard</h1>
                <p className="mt-2 text-text/70">Manage menu items and update order status.</p>
              </div>
              <div className="grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6">
                  <div className="rounded-[2rem] bg-white p-8 shadow-soft">
                    <h2 className="text-2xl font-bold">Add new menu item</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <input value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} placeholder="Name" className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none" />
                      <input value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} placeholder="Category" className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none" />
                      <input value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} placeholder="Price" className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none" />
                      <input value={newItem.image} onChange={(e) => setNewItem({ ...newItem, image: e.target.value })} placeholder="Image URL" className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none" />
                    </div>
                    <textarea value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} placeholder="Description" className="mt-4 w-full rounded-[2rem] border border-slate-200 bg-slate-50 p-5 outline-none" rows={4} />
                    <button onClick={handleCreate} className="mt-6 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition hover:bg-secondary">
                      Create item
                    </button>
                  </div>
                  <div className="rounded-[2rem] bg-white p-8 shadow-soft">
                    <h2 className="text-2xl font-bold">Orders</h2>
                    <div className="mt-6 space-y-4">
                      {orders.map((order) => (
                        <div key={order._id} className="rounded-3xl border border-slate-200 p-5">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="font-semibold text-text">Order #{order._id.slice(-6)}</p>
                              <p className="text-sm text-text/70">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <button onClick={() => handleStatus(order._id, 'pending')} className="rounded-full border border-slate-200 px-3 py-2 text-xs text-text transition hover:bg-slate-100">
                              Pending
                            </button>
                            <button onClick={() => handleStatus(order._id, 'preparing')} className="rounded-full border border-slate-200 px-3 py-2 text-xs text-text transition hover:bg-slate-100">
                              Preparing
                            </button>
                            <button onClick={() => handleStatus(order._id, 'delivered')} className="rounded-full border border-slate-200 px-3 py-2 text-xs text-text transition hover:bg-slate-100">
                              Delivered
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-[2rem] bg-white p-8 shadow-soft">
                  <h2 className="text-2xl font-bold">Menu items</h2>
                  <div className="mt-6 space-y-4">
                    {menu.map((item) => (
                      <div key={item._id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-text/70">{item.category}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-text">${item.price.toFixed(2)}</span>
                          <button onClick={() => handleDelete(item._id)} className="rounded-full border border-slate-200 px-4 py-2 text-xs text-text transition hover:bg-slate-100">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </ProtectedLayout>
    </main>
  );
}
