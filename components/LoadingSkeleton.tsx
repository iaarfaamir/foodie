'use client';

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="animate-pulse rounded-[2rem] bg-slate-200 p-6" />
      ))}
    </div>
  );
}
