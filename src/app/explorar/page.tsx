'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchBar } from '@/components/listings/SearchBar';
import { FilterSidebar } from '@/components/listings/FilterSidebar';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { useMockData } from '@/hooks/useMockData';
import { getListings } from '@/lib/data/listings';
import { mockBusinesses } from '@/lib/data/businesses';


function ExplorarContent() {
  const searchParams = useSearchParams();
  const { data: allListings, loading, error } = useMockData(getListings);

  const search = searchParams.get('busqueda') ?? '';
  const categoria = searchParams.get('categoria') ?? '';
  const ciudad = searchParams.get('ciudad') ?? '';
  const precio = searchParams.get('precio') ?? 'all';

  const filtered = useMemo(() => {
    if (!allListings) return [];
    return allListings.filter((l) => {
      if (!l.available && precio !== 'soldout') {
        // show unavailable only when showing all
      }
      if (search && !l.title.toLowerCase().includes(search.toLowerCase()) &&
        !l.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (categoria && l.categoryId !== categoria) return false;
      if (precio === 'free' && l.price !== 0) return false;
      if (precio === 'paid' && l.price === 0) return false;
      return true;
    });
  }, [allListings, search, categoria, ciudad, precio]);

  // Further filter by city (need to join with businesses)
  const cityFiltered = useMemo(() => {
    if (!ciudad) return filtered;
    const bizIds = new Set(
      mockBusinesses
        .filter((b) => b.city === ciudad)
        .map((b) => b.id)
    );
    return filtered.filter((l) => bizIds.has(l.businessId));
  }, [filtered, ciudad]);

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="bg-[#F1F8E9] border-b border-[#E0E0E0] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-[#212121] mb-4">
            Explorar residuos
          </h1>
          <SearchBar />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-[#E0E0E0] p-5 shadow-sm sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <ListingGrid
              listings={cityFiltered}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F1F8E9]" />}>
      <ExplorarContent />
    </Suspense>
  );
}
