'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { CategoryPills } from '@/components/storefront/CategoryPills';
import { StorefrontCarousel } from '@/components/storefront/StorefrontCarousel';
import { ListingCard } from '@/components/listings/ListingCard';
import { useMockData } from '@/hooks/useMockData';
import { getListings } from '@/lib/data/listings';
import { getCategories } from '@/lib/data/categories';
import { EmptyState } from '@/components/ui/EmptyState';
import { PackageSearch } from 'lucide-react';

function ExplorarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: allListings, loading } = useMockData(getListings);
  const { data: categories } = useMockData(getCategories);
  const safeCategories = categories || [];

  const initialSearch = searchParams.get('busqueda') ?? '';
  const initialCategory = searchParams.get('categoria') ?? '';
  
  const [search, setSearch] = useState(initialSearch);
  const [categoria, setCategoria] = useState(initialCategory);

  const filtered = useMemo(() => {
    if (!allListings) return [];
    return allListings.filter((l) => {
      if (search && !l.title.toLowerCase().includes(search.toLowerCase()) &&
        !l.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (categoria && l.categoryId !== categoria) return false;
      return true;
    });
  }, [allListings, search, categoria]);

  // Derived collections for carousels
  const freeItems = useMemo(() => (allListings || []).filter(l => l.price === 0 && l.available), [allListings]);
  const featuredItems = useMemo(() => (allListings || []).filter(l => l.featured && l.available), [allListings]);
  const recentItems = useMemo(() => (allListings || []).filter(l => l.available).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), [allListings]);

  const isFiltering = search || categoria;

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* Storefront Header */}
      <div className="bg-[#2E7D32] pt-8 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-md">
              🌿
            </div>
            <div className="text-white">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none mb-1">
                EcoResiduos Market
              </h1>
              <p className="text-[#C8E6C9] font-medium text-sm">
                Materiales directos de empresas a tu puerta
              </p>
            </div>
          </div>

          <div className="w-full md:w-[400px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Busca madera, plásticos, orgánicos..."
                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl text-base text-[#212121] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#81C784] shadow-lg font-medium transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <CategoryPills 
        categories={safeCategories} 
        active={categoria} 
        onChange={(cat) => setCategoria(cat)} 
      />

      <div className="max-w-7xl mx-auto mt-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : isFiltering ? (
          /* Grid View for Search/Filter */
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#212121] mb-6 tracking-tight">
              {filtered.length} Resultado{filtered.length !== 1 && 's'}
            </h2>
            {filtered.length === 0 ? (
               <EmptyState
                 icon={<PackageSearch size={36} className="text-[#81C784]" />}
                 title="No encontramos lo que buscabas"
                 description="Intentá con otras palabras clave o eliminá los filtros."
                 actionLabel="Ver todos"
                 onAction={() => { setSearch(''); setCategoria(''); }}
               />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filtered.map((l, i) => (
                  <div key={l.id} className="h-full">
                    <ListingCard listing={l} animDelay={i * 30} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Storefront View (Carousels) */
          <div className="space-y-4">
            <StorefrontCarousel 
              title="🔥 Promos -25% OFF"
              items={freeItems.map((l, i) => <ListingCard key={l.id} listing={l} animDelay={i*30} />)}
            />
            
            <StorefrontCarousel 
              title="⭐ Destacados y Oportunidades"
              items={featuredItems.map((l, i) => <ListingCard key={l.id} listing={l} animDelay={i*30} />)}
            />
            
            <StorefrontCarousel 
              title="🆕 Recién Llegados"
              items={recentItems.map((l, i) => <ListingCard key={l.id} listing={l} animDelay={i*30} />)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExplorarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ExplorarContent />
    </Suspense>
  );
}
