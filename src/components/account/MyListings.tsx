'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Trash2, ArchiveX, Package } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { mockCategories } from '@/lib/data/categories';
import { ROUTES } from '@/lib/constants';
import { toast } from 'react-hot-toast';
import type { WasteListing } from '@/lib/types';

interface MyListingsProps {
  initialListings: WasteListing[];
}

export function MyListings({ initialListings }: MyListingsProps) {
  const [listings, setListings] = useState<WasteListing[]>(initialListings);

  const toggleAvailability = (id: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, available: !l.available } : l))
    );
    const listing = listings.find((l) => l.id === id);
    if (listing) {
      toast.success(
        listing.available
          ? 'Residuo marcado como agotado'
          : 'Residuo marcado como disponible'
      );
    }
  };

  const deleteListing = (id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    toast.success('Residuo eliminado');
  };

  if (listings.length === 0) {
    return (
      <EmptyState
        icon={<Package size={36} className="text-[#81C784]" />}
        title="No tenés residuos publicados"
        description="Empezá a publicar los residuos de tu negocio para conectar con compradores y recicladores."
        actionLabel="Publicar residuo"
        actionHref={ROUTES.nuevoResiduo}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-[#616161]">{listings.length} publicación{listings.length !== 1 ? 'es' : ''}</p>
        <Link href={ROUTES.nuevoResiduo}>
          <Button variant="primary" size="sm" icon={<Plus size={15} />}>
            Publicar residuo
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {listings.map((listing) => {
          const cat = mockCategories.find((c) => c.id === listing.categoryId);
          return (
            <div
              key={listing.id}
              className={`flex gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                listing.available
                  ? 'bg-white border-[#E0E0E0] hover:border-[#81C784] hover:shadow-sm'
                  : 'bg-gray-50 border-gray-200 opacity-70'
              }`}
            >
              {/* Image */}
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                <Image
                  src={listing.imageUrl}
                  alt={listing.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={ROUTES.residuo(listing.id)}
                    className="font-semibold text-[#212121] text-sm leading-tight line-clamp-2 hover:text-[#2E7D32] transition-colors"
                  >
                    {listing.title}
                  </Link>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {cat && (
                    <Badge
                      variant="category"
                      categoryColor={cat.color}
                      categoryText={cat.textColor}
                      size="sm"
                    >
                      {cat.name}
                    </Badge>
                  )}
                  <Badge variant={listing.available ? 'available' : 'soldout'} size="sm">
                    {listing.available ? 'Disponible' : 'Agotado'}
                  </Badge>
                  {listing.price === 0 && <Badge variant="promo" className="bg-[#FFEB3B] text-black font-bold border-0" size="sm">Promo -25%</Badge>}
                </div>

                <p className="text-xs text-[#616161] mt-1.5">
                  {listing.quantity.toLocaleString('es-BO')} {listing.unit}
                  {listing.price > 0 && ` · Bs. ${listing.price.toLocaleString('es-BO')}`}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => toggleAvailability(listing.id)}
                  title={listing.available ? 'Marcar como agotado' : 'Marcar como disponible'}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F1F8E9] text-[#616161] hover:text-[#2E7D32] transition-colors cursor-pointer"
                >
                  <ArchiveX size={15} />
                </button>
                <button
                  onClick={() => deleteListing(listing.id)}
                  title="Eliminar"
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#616161] hover:text-[#D32F2F] transition-colors cursor-pointer"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
