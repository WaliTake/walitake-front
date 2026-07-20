import Link from 'next/link';
import { Building2, MapPin, Phone, Star, BadgeCheck } from 'lucide-react';
import type { Business } from '@/lib/types';

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <div className="bg-[#F1F8E9] rounded-2xl p-5 border border-[#E0E0E0]">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white font-bold text-lg shrink-0">
          {business.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-bold text-[#212121] text-sm leading-tight">{business.name}</p>
            {business.verified && (
              <BadgeCheck size={14} className="text-[#2E7D32] shrink-0" />
            )}
          </div>
          <p className="text-xs text-[#616161] capitalize mt-0.5">{business.type}</p>
          {business.rating && (
            <div className="flex items-center gap-1 mt-1">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-[#212121]">{business.rating}</span>
              <span className="text-xs text-[#616161]">· {business.listingCount} residuos</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-[#616161] leading-relaxed mb-4 line-clamp-3">
        {business.description}
      </p>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#616161]">
          <MapPin size={13} className="text-[#81C784] shrink-0" />
          <span>{business.address}, {business.city}</span>
        </div>
        {business.phone && (
          <div className="flex items-center gap-2 text-xs text-[#616161]">
            <Phone size={13} className="text-[#81C784] shrink-0" />
            <span>{business.phone}</span>
          </div>
        )}
      </div>

      {/* Static map placeholder */}
      <div className="mt-4 rounded-xl bg-gray-200 h-28 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300" />
        {/* Fake map grid lines */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
        <div className="relative flex flex-col items-center gap-1.5">
          <div className="w-8 h-8 rounded-full bg-[#2E7D32] flex items-center justify-center shadow-lg">
            <MapPin size={16} className="text-white fill-white" />
          </div>
          <span className="text-xs font-semibold text-[#212121] bg-white/90 px-2 py-0.5 rounded-full shadow-sm">
            {business.city}
          </span>
        </div>
      </div>
    </div>
  );
}
