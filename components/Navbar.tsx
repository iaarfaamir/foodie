'use client';

import Link from 'next/link';
import { useCartStore } from '@/context/useCartStore';
import { useAuthStore } from '@/context/useAuthStore';
import { useEffect } from 'react';

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const storedUser = localStorage.getItem('foodie_user');
    const storedToken = localStorage.getItem('foodie_token');
    if (storedUser && storedToken) {
      useAuthStore.getState().setUser(JSON.parse(storedUser), storedToken);
    } else {
      useAuthStore.getState().setUser(null, null);
    }
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-slate-200/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-3xl bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">F</div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-secondary">Foodie</p>
            <p className="font-bold text-lg text-text">Delicious food to your door</p>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text/80">
          <Link href="/menu" className="hover:text-primary transition">Menu</Link>
          <Link href="/cart" className="hover:text-primary transition">Cart</Link>
          <Link href="/orders" className="hover:text-primary transition">Orders</Link>
          <Link href="/admin" className="hover:text-primary transition">Admin</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-white transition hover:bg-secondary">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span>{items.length}</span>
          </Link>
          {user ? (
            <button onClick={logout} className="rounded-full border border-slate-200 px-4 py-2 text-sm text-text transition hover:bg-slate-100">
              Logout
            </button>
          ) : (
            <Link href="/login" className="rounded-full border border-primary px-4 py-2 text-sm text-primary transition hover:bg-primary/10">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
