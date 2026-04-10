'use client';

type OrderSummaryProps = {
  subtotal: number;
  deliveryFee: number;
  taxRate?: number;
  onCheckout?: () => void;
};

export default function OrderSummary({ subtotal, deliveryFee, taxRate = 0.08, onCheckout }: OrderSummaryProps) {
  const tax = subtotal * taxRate;
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-soft">
      <h2 className="text-2xl font-bold text-text">Order Summary</h2>
      <div className="mt-6 space-y-4 text-sm text-text/70">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 text-lg font-bold text-text">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      {onCheckout ? (
        <button
          onClick={onCheckout}
          className="mt-8 w-full rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition hover:bg-secondary"
        >
          Proceed to Checkout
        </button>
      ) : null}
    </div>
  );
}
