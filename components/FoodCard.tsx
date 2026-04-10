'use client';

type FoodCardProps = {
  item: {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: number;
  };
  onAdd: (item: { foodId: string; name: string; image: string; price: number; quantity: number }) => void;
};

export default function FoodCard({ item, onAdd }: FoodCardProps) {
  return (
    <article className="group rounded-[2rem] bg-white p-4 shadow-soft transition hover:-translate-y-1">
      <div className="overflow-hidden rounded-[1.75rem] bg-slate-100">
        <img src={item.image} alt={item.name} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-accent">{item.category}</span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-text/70">
          <span className="material-symbols-outlined text-[1rem] text-secondary">star</span>
          {item.rating.toFixed(1)}
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-bold text-text">{item.name}</h3>
      <p className="mt-3 text-sm leading-6 text-text/70">{item.description}</p>
      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</span>
        <button
          onClick={() => onAdd({ foodId: item._id, name: item.name, image: item.image, price: item.price, quantity: 1 })}
          className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-secondary"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
