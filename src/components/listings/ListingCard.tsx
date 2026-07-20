'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Tag } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import type { WasteListing } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface ListingCardProps {
  listing: WasteListing;
  animDelay?: number;
}

export function ListingCard({ listing, animDelay = 0 }: ListingCardProps) {
  const isPromo = listing.price === 0;
  
  // Simulated promotion tags (could come from backend later)
  const isFeatured = listing.featured;
  const isOportunidad = listing.quantity > 100 && !isPromo;

  const [adding, setAdding] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to details
    e.stopPropagation();
    
    setAdding(true);
    setTimeout(() => {
      setAdding(false);
      toast.success(`${listing.title} agregado a solicitudes`);
    }, 400);
  };

  return (
    <Link 
      href={ROUTES.residuo(listing.id)}
      className="group flex flex-col h-full animate-fade-in relative transition-transform hover:-translate-y-1 hover:shadow-lg bg-white rounded-2xl overflow-hidden border border-gray-100"
      style={{ animationDelay: `${animDelay}ms`, animationFillMode: 'both' }}
    >
      {/* Top badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
        {isPromo && (
          <span className="bg-[#FFEB3B] text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            PROMO -25%
          </span>
        )}
        {isFeatured && (
          <span className="bg-[#FF9800] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
            <Tag size={10} /> DESTACADO
          </span>
        )}
        {isOportunidad && (
          <span className="bg-[#2E7D32] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            OPORTUNIDAD
          </span>
        )}
      </div>

      {/* Image container */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        <Image
          src={listing.imageUrl}
          alt={listing.title}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${!listing.available ? 'opacity-50 grayscale' : ''}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {!listing.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[2px]">
            <span className="bg-gray-800 text-white font-bold px-3 py-1 rounded-full text-xs">
              AGOTADO
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        {/* Price & Add Button */}
        <div className="flex items-start justify-between mt-1 mb-1.5">
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-[#212121]">
              {isPromo ? `$2.500` : `$${listing.price.toLocaleString('es-AR')}`}
            </span>
            {isPromo && (
              <span className="text-[11px] line-through text-[#9E9E9E] font-medium -mt-0.5">
                $3.330
              </span>
            )}
            <span className="text-[11px] text-[#757575] font-medium uppercase tracking-wider mt-0.5">
              {listing.quantity} {listing.unit}
            </span>
          </div>
          
          {listing.available && (
            <button 
              onClick={handleAdd}
              disabled={adding}
              className="w-10 h-10 rounded-full bg-[#F1F8E9] flex items-center justify-center text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white transition-colors border border-[#81C784] shadow-sm disabled:opacity-50 z-20"
              aria-label="Agregar o Solicitar"
            >
              <Plus size={20} className={adding ? "animate-spin" : ""} />
            </button>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm text-[#212121] leading-tight line-clamp-2 mt-1">
          {listing.title}
        </h3>
        
        {/* Distance / Extra mock info */}
        <p className="text-[11px] text-[#9E9E9E] mt-auto pt-2">
          Recogida o envío disponible
        </p>
      </div>
    </Link>
  );
}
