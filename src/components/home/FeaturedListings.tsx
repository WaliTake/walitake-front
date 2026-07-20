'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ListingCard } from '@/components/listings/ListingCard';
import { ListingCardSkeleton } from '@/components/ui/Skeleton';
import { useMockData } from '@/hooks/useMockData';
import { getFeaturedListings } from '@/lib/data/listings';
import { ROUTES } from '@/lib/constants';

export function FeaturedListings() {
  const { data: listings, loading } = useMockData(getFeaturedListings);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-labelledby="featured-heading">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 id="featured-heading" className="text-2xl font-bold text-[#212121]">
            Residuos destacados
          </h2>
          <p className="text-[#616161] text-sm mt-1">
            Los más buscados de esta semana
          </p>
        </div>
        <Link
          href={ROUTES.explorar}
          className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#2E7D32] hover:text-[#4CAF50] transition-colors"
        >
          Ver todos <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <ListingCardSkeleton key={i} />)
          : (listings ?? []).map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} animDelay={i * 80} />
            ))}
      </div>

      {/* Mobile "Ver todos" */}
      <div className="sm:hidden mt-6 text-center">
        <Link
          href={ROUTES.explorar}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#F1F8E9] text-[#2E7D32] font-semibold text-sm rounded-full hover:bg-[#81C784]/30 transition-colors"
        >
          Ver todos los residuos <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
