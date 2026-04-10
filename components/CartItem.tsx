'use client';

type CartItemProps = {
  item: {
    foodId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  onQuantityChange: (foodId: string, quantity: number) => void;
  onRemove: (foodId: string) => void;
};

export default function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-soft sm:flex sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <img src={item.image} alt={item.name} className="h-28 w-28 rounded-3xl object-cover" />
        <div>
          <h3 className="text-xl font-semibold text-text">{item.name}</h3>
          <p className="mt-2 text-sm text-text/70">${item.price.toFixed(2)} each</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 sm:mt-0 sm:w-72">
        <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
          <button
            onClick={() => onQuantityChange(item.foodId, item.quantity - 1)}
            className="h-9 w-9 text-xl text-text/80 hover:text-text"
          >
            -
          </button>
          <span className="w-10 text-center font-semibold text-text">{item.quantity}</span>
          <button
            onClick={() => onQuantityChange(item.foodId, item.quantity + 1)}
            className="h-9 w-9 text-xl text-text/80 hover:text-text"
          >
            +
          </button>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-text">${(item.price * item.quantity).toFixed(2)}</p>
          <button onClick={() => onRemove(item.foodId)} className="mt-2 text-sm text-secondary hover:underline">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
