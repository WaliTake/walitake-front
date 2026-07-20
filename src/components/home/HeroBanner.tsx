'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Recycle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
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
    <section className="relative min-h-[560px] flex items-center overflow-hidden" aria-label="Hero">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1600&h=800&fit=crop"
          alt="Residuos siendo reciclados"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E20]/95 via-[#2E7D32]/85 to-[#1B5E20]/60" />
      </div>

      {/* Floating decorative circles */}
      <div className="absolute top-10 right-20 w-64 h-64 bg-[#4CAF50]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-40 w-48 h-48 bg-[#81C784]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Recycle size={14} className="text-[#81C784]" />
            <span className="text-white/90 text-sm font-medium">
              Economía circular para tu negocio
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Convierte residuos{' '}
            <span className="text-[#81C784]">en recursos</span>
          </h1>

          <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-xl">
            Conectamos restaurantes, hoteles y empresas con compradores, recicladores y
            compostadores. Dale valor a lo que otros descartan.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                id="hero-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="¿Qué residuo buscás?"
                className="w-full pl-11 pr-4 py-4 bg-white/95 text-[#212121] placeholder-gray-400 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#81C784] shadow-xl"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              iconRight={<ArrowRight size={18} />}
              className="!rounded-2xl !bg-white !text-[#2E7D32] hover:!bg-[#F1F8E9] !shadow-xl whitespace-nowrap"
            >
              Buscar
            </Button>
          </form>

          {/* Quick links */}
          <div className="flex flex-wrap gap-2 mt-5">
            {['Orgánicos', 'Plásticos', 'Madera', 'Metales'].map((cat) => (
              <button
                key={cat}
                onClick={() => router.push(`${ROUTES.explorar}?categoria=${cat.toLowerCase()}`)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-xs font-medium transition-all duration-200 cursor-pointer"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
