'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { ListingCard } from './ListingCard';
import { ListingCardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { FilterSidebar } from './FilterSidebar';
import type { WasteListing } from '@/lib/types';
import { PackageSearch } from 'lucide-react';

const PAGE_SIZE = 9;

interface ListingGridProps {
  listings: WasteListing[];
  loading: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function ListingGrid({ listings, loading, error, onRetry }: ListingGridProps) {
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const visible = listings.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < listings.length;

  if (error) {
    return (
      <EmptyState
        title="Ocurrió un error"
        description="No pudimos cargar los residuos. Intentá de nuevo."
        actionLabel="Reintentar"
        onAction={onRetry}
      />
    );
  }

  return (
    <>
      {/* Mobile filter button */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <p className="text-sm text-[#616161]">
          {loading ? '...' : `${listings.length} resultado${listings.length !== 1 ? 's' : ''}`}
        </p>
        <Button
          variant="outline"
          size="sm"
          icon={<SlidersHorizontal size={15} />}
          onClick={() => setFilterOpen(true)}
        >
          Filtros
        </Button>
      </div>

      {/* Desktop result count */}
      <p className="hidden lg:block text-sm text-[#616161] mb-4">
        {loading ? 'Cargando...' : `${listings.length} resultado${listings.length !== 1 ? 's' : ''}`}
      </p>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <ListingCardSkeleton key={i} />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <EmptyState
          icon={<PackageSearch size={36} className="text-[#81C784]" />}
          title="Sin resultados"
          description="No encontramos residuos con esos criterios. Intentá con otros filtros o borrá la búsqueda."
          actionLabel="Ver todos"
          actionHref="/explorar"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {visible.map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} animDelay={i * 60} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setPage((p) => p + 1)}
              >
                Cargar más residuos
              </Button>
            </div>
          )}
        </>
      )}

      {/* Mobile filter modal */}
      <Modal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        title="Filtros"
      >
        <FilterSidebar isMobile onClose={() => setFilterOpen(false)} />
      </Modal>
    </>
  );
}
