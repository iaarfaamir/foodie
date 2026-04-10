'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/context/useAuthStore';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to login');
      setUser(data.user, data.token);
      toast.success('Logged in successfully');
      router.push('/menu');
    } catch (error) {
      toast.error((error as Error).message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-text">
      <Navbar />
      <Toaster position="top-right" />
      <section className="mx-auto flex min-h-[calc(100vh-96px)] max-w-3xl flex-col justify-center px-6 py-12">
        <div className="rounded-[2rem] bg-white p-10 shadow-soft">
          <h1 className="text-4xl font-bold">Welcome back</h1>
          <p className="mt-3 text-text/70">Login to manage your cart, orders and delivery.</p>
          <form onSubmit={handleLogin} className="mt-10 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text/80">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text/80">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition hover:bg-secondary disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-text/70">
            New here?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:text-secondary">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
