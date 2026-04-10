'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/context/useAuthStore';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/menu');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <div className="min-h-screen bg-background p-8" />;
  }

  return <>{children}</>;
}
