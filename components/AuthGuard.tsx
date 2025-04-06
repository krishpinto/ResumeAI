// components/AuthGuard.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import { useEffect } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth'); // redirect to your auth/login page
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
