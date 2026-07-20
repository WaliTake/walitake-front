'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Package, Building2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ListingCardSkeleton } from '@/components/ui/Skeleton';
import type { WasteListing, Business, Category } from '@/lib/types';
import { mockCategories } from '@/lib/data/categories';
import { mockBusinesses } from '@/lib/data/businesses';
import { ROUTES } from '@/lib/constants';

interface ListingCardProps {
  listing: WasteListing;
  business?: Business;
  category?: Category;
  animDelay?: number;
}

export { ListingCardSkeleton };

export function ListingCard({ listing, business, category, animDelay = 0 }: ListingCardProps) {
  const biz = business ?? mockBusinesses.find((b) => b.id === listing.businessId);
  const cat = category ?? mockCategories.find((c) => c.id === listing.categoryId);

  const priceLabel =
    listing.price === 0
      ? 'Gratis'
      : `$${listing.price.toLocaleString('es-AR')} / ${listing.unit}`;

  return (
    <Link
      href={ROUTES.residuo(listing.id)}
      className="group bg-white rounded-2xl overflow-hidden border border-[#E0E0E0] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
      style={{ animationDelay: `${animDelay}ms` }}
      aria-label={`Ver detalle de ${listing.title}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={listing.imageUrl}
          alt={listing.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {listing.price === 0 && (
            <Badge variant="free">Gratis</Badge>
          )}
          {!listing.available && (
            <Badge variant="soldout">Agotado</Badge>
          )}
        </div>

        {/* Category badge top-right */}
        {cat && (
          <div className="absolute top-3 right-3">
            <Badge
              variant="category"
              categoryColor={cat.color}
              categoryText={cat.textColor}
            >
              {cat.name}
            </Badge>
          </div>
        )}

        {/* Fade overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        {/* Title */}
        <h3 className="font-bold text-[#212121] text-sm leading-snug line-clamp-2 group-hover:text-[#2E7D32] transition-colors duration-200">
          {listing.title}
        </h3>

        {/* Business + location */}
        <div className="flex items-center gap-1.5 text-[#616161]">
          <Building2 size={12} className="shrink-0" />
          <span className="text-xs truncate">{biz?.name ?? 'Empresa'}</span>
          <span className="text-gray-300">·</span>
          <MapPin size={12} className="shrink-0" />
          <span className="text-xs truncate">{biz?.city ?? 'Argentina'}</span>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-1.5 text-[#616161]">
          <Package size={12} className="shrink-0" />
          <span className="text-xs font-medium">
            {listing.quantity.toLocaleString('es-AR')} {listing.unit}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <span
            className={`text-sm font-bold ${listing.price === 0 ? 'text-[#388E3C]' : 'text-[#212121]'}`}
          >
            {priceLabel}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#2E7D32] group-hover:gap-2 transition-all duration-200">
            Ver más <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}
