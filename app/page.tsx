import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-text">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-secondary/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-secondary">
              Fast delivery • Fresh ingredients
            </div>
            <div>
              <h1 className="text-5xl font-bold leading-tight tracking-tight text-text lg:text-6xl">
                Delicious food, delivered to your door.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-text/70">
                Order chef-crafted favorites from local restaurants, customize your meal, and enjoy fresh delivery in minutes.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/menu" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-soft transition hover:bg-secondary">
                Explore the menu
              </Link>
              <Link href="/cart" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-text transition hover:bg-slate-50">
                View cart
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-white p-6 shadow-soft">
                <p className="text-sm uppercase tracking-[0.3em] text-secondary">Featured</p>
                <h2 className="mt-3 text-2xl font-bold text-text">Chef's Special + Seasonal favorites</h2>
              </div>
              <div className="rounded-[2rem] bg-white p-6 shadow-soft">
                <p className="text-sm uppercase tracking-[0.3em] text-secondary">Fastest delivery</p>
                <h2 className="mt-3 text-2xl font-bold text-text">On-demand orders right when you want them</h2>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[3rem] bg-primary/10 p-6 shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=900&q=80"
                alt="Gourmet dish"
                className="h-[520px] w-full rounded-[2rem] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-0 right-0 mx-auto flex max-w-sm justify-between rounded-[2rem] bg-white p-5 shadow-soft">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-secondary">Delivery</p>
                <p className="mt-2 text-xl font-semibold text-text">25-35 mins</p>
              </div>
              <div className="rounded-3xl bg-secondary/10 px-4 py-3 text-sm font-semibold text-secondary">
                Free delivery above $35
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
