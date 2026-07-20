'use client';

import { Suspense, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { HeroBanner } from '@/components/home/HeroBanner';
import { PromoBanners } from '@/components/home/PromoBanners';
import { CategoryPills } from '@/components/storefront/CategoryPills';
import { StorefrontCarousel } from '@/components/storefront/StorefrontCarousel';
import { ListingCard } from '@/components/listings/ListingCard';
import { useMockData } from '@/hooks/useMockData';
import { getListings } from '@/lib/data/listings';
import { getCategories } from '@/lib/data/categories';
import { ROUTES } from '@/lib/constants';

function HomeContent() {
  const router = useRouter();
  const { data: allListings, loading } = useMockData(getListings);
  const { data: categories } = useMockData(getCategories);
  const safeCategories = categories || [];

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/explorar?categoria=${categoryId}`);
  };

  const promoItems = useMemo(() => (allListings || []).filter(l => l.price === 0 && l.available), [allListings]);
  const featuredItems = useMemo(() => (allListings || []).filter(l => l.featured && l.available), [allListings]);

  return (
    <main className="min-h-screen bg-[#F7F9F7] pb-20">
      <HeroBanner />
      
      {/* Quick category navigation */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <CategoryPills categories={safeCategories} active="" onChange={handleCategorySelect} />
        </div>
      </div>

      <PromoBanners />

      <div className="max-w-7xl mx-auto">
        <StorefrontCarousel 
          title="🔥 Promos -25% OFF"
          items={promoItems.map((l, i) => <ListingCard key={l.id} listing={l} animDelay={i*30} />)}
        />
        
        <StorefrontCarousel 
          title="⭐ Destacados de la semana"
          items={featuredItems.map((l, i) => <ListingCard key={l.id} listing={l} animDelay={i*30} />)}
        />
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <HomeContent />
    </Suspense>
  );
}
