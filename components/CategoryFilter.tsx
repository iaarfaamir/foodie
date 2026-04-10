'use client';

type CategoryFilterProps = {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
};

export default function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em] transition ${
            active === category ? 'bg-primary text-white' : 'bg-slate-100 text-text/80 hover:bg-slate-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
