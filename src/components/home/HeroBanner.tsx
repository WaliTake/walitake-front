'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export function HeroBanner() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = query.trim() ? `?busqueda=${encodeURIComponent(query)}` : '';
    router.push(`${ROUTES.explorar}${params}`);
  };

  return (
    <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-[#ECFDF3]" aria-label="Hero">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1600&h=800&fit=crop"
          alt="Residuos"
          fill
          className="object-cover object-center opacity-30"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F9F7] via-[#ECFDF3]/80 to-transparent" />
      </div>

      {/* Hero Card */}
      <div className="relative z-10 w-[90%] max-w-2xl bg-white rounded-[24px] shadow-xl border border-[#E3E8E4] p-8 sm:p-10 text-center animate-fade-in-up">
        <h1 className="text-3xl sm:text-5xl font-black text-[#17221B] leading-tight tracking-tight mb-4">
          Conseguí materiales <br />
          <span className="text-[#166534]">para tu negocio.</span>
        </h1>
        <p className="text-sm sm:text-base text-[#647067] font-medium mb-8 max-w-lg mx-auto">
          Cientos de empresas están ofreciendo sus residuos como materia prima. Recogé hoy mismo o solicitá envío.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex items-center w-full max-w-lg mx-auto bg-[#F7F9F7] border border-[#E3E8E4] rounded-full shadow-sm focus-within:bg-white focus-within:ring-2 focus-within:ring-[#22C55E] focus-within:border-[#22C55E] transition-all overflow-hidden">
          <div className="pl-5 pr-2 py-4 text-[#647067] border-r border-[#E3E8E4] hidden sm:flex items-center gap-2">
            <MapPin size={18} />
            <span className="text-xs font-bold whitespace-nowrap text-[#17221B]">Tu Zona</span>
          </div>
          
          <div className="flex-1 flex items-center px-4">
            <input
              id="hero-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej: Madera, Plástico, Orgánicos..."
              className="w-full bg-transparent text-[#17221B] placeholder-gray-400 text-base font-medium focus:outline-none py-4"
            />
          </div>
          
          <button
            type="submit"
            className="h-full bg-[#22C55E] hover:bg-[#166534] text-white px-6 py-4 font-bold transition-colors cursor-pointer"
          >
            Buscar
          </button>
        </form>
      </div>
    </section>
  );
}
