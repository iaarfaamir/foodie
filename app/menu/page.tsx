'use client';

import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import CategoryFilter from '@/components/CategoryFilter';
import FoodCard from '@/components/FoodCard';
import { useCartStore } from '@/context/useCartStore';
import toast, { Toaster } from 'react-hot-toast';

const categories = ['All', 'Pizza', 'Burgers', 'Pasta', 'Desserts', 'Drinks'];

type Food = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
};

export default function MenuPage() {
  const [items, setItems] = useState<Food[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const cart = useCartStore();

  useEffect(() => {
    async function fetchMenu() {
      setLoading(true);
      try {
        const response = await fetch('/api/menu');
        const data = await response.json();
        setItems(data.menu || []);
      } catch (error) {
        toast.error('Failed to load menu.');
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  const visibleItems = useMemo(() => {
    if (selectedCategory === 'All') {
      return items;
    }
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  return (
    <main className="min-h-screen bg-background text-text">
      <Navbar />
      <Toaster position="top-right" />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-secondary">Restaurant menu</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Curation of flavor for every craving.</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-text transition hover:bg-slate-200">
              Filters
            </button>
            <button className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90">
              Veg only
            </button>
            <button className="rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-text transition hover:bg-slate-200">
              Price: $$
            </button>
          </div>
        </div>
        <CategoryFilter categories={categories} active={selectedCategory} onChange={setSelectedCategory} />
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            [...Array(6)].map((_, index) => (
              <div key={index} className="h-96 rounded-[2rem] bg-slate-200 animate-pulse" />
            ))
          ) : visibleItems.length ? (
            visibleItems.map((item) => (
              <FoodCard key={item._id} item={item} onAdd={(entry) => {
                cart.addItem(entry);
                toast.success(`${entry.name} added to cart`);
              }} />
            ))
          ) : (
            <p className="col-span-full rounded-[2rem] bg-white p-12 text-center text-lg text-text/70 shadow-soft">
              No items found for this category.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
