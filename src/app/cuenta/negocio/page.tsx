'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { BusinessSetup } from '@/components/account/BusinessSetup';
import { ROUTES } from '@/lib/constants';

export default function NegocioPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(ROUTES.login);
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  return (
    <div className="min-h-screen bg-[#F1F8E9] px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl border border-[#E0E0E0] shadow-sm p-8">
          <BusinessSetup />
        </div>
      </div>
    </div>
  );
}
