'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Tag } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import type { WasteListing } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'react-hot-toast';

interface ListingCardProps {
  listing: WasteListing;
  animDelay?: number;
}

export function ListingCard({ listing, animDelay = 0 }: ListingCardProps) {
  const { addToCart } = useCart();
  const isPromo = listing.discountPercent && listing.discountPercent > 0;
  const isFeatured = listing.featured;
  const isOportunidad = listing.quantity > 100 && !isPromo;

  const [adding, setAdding] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAdding(true);
    setTimeout(() => {
      addToCart(listing);
      setAdding(false);
      toast.success(`${listing.title} agregado al carrito`);
    }, 400);
  };

  return (
    <Link 
      href={ROUTES.residuo(listing.id)}
      className="group flex flex-col h-full animate-fade-in relative transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md bg-white rounded-[20px] overflow-hidden border border-[#E3E8E4] shadow-sm"
      style={{ animationDelay: `${animDelay}ms`, animationFillMode: 'both' }}
    >
      {/* Top badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
        {isPromo && (
          <span className="bg-[#F59E0B] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
            PROMO -{listing.discountPercent}%
          </span>
        )}
        {isFeatured && (
          <span className="bg-[#F59E0B] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
            <Tag size={10} /> DESTACADO
          </span>
        )}
        {isOportunidad && (
          <span className="bg-[#166534] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
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
            <span className="text-xl font-black text-[#17221B]">
              Bs. {listing.price.toLocaleString('es-BO')}
            </span>
            {isPromo && listing.originalPrice && (
              <span className="text-sm line-through text-[#647067] font-medium mt-0.5">
                Bs. {listing.originalPrice.toLocaleString('es-BO')}
              </span>
            )}
            <span className="text-[11px] text-[#647067] font-medium uppercase tracking-wider mt-0.5">
              {listing.quantity} {listing.unit}
            </span>
          </div>
          
          {listing.available && (
            <button 
              onClick={handleAdd}
              disabled={adding}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#166534] hover:bg-[#22C55E] hover:text-white transition-colors border border-[#E3E8E4] shadow-sm disabled:opacity-50 z-20"
              aria-label="Agregar o Solicitar"
            >
              <Plus size={20} className={adding ? "animate-spin" : ""} />
            </button>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm text-[#17221B] leading-tight line-clamp-2 mt-1">
          {listing.title}
        </h3>
        
        {/* Distance / Extra mock info */}
        <p className="text-[11px] text-[#647067] mt-auto pt-2">
          Recogida o envío disponible
        </p>
      </div>
    </Link>
  );
}
