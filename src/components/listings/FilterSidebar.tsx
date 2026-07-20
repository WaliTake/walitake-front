'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { mockCategories } from '@/lib/data/categories';
import { CITIES } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

interface FilterSidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export function FilterSidebar({ isMobile = false, onClose }: FilterSidebarProps) {
  const router = useRouter();
  const params = useSearchParams();

  const activeCategory = params.get('categoria') ?? '';
  const activeCity = params.get('ciudad') ?? '';
  const priceType = params.get('precio') ?? 'all';

  const updateParam = (key: string, value: string) => {
    const p = new URLSearchParams(params.toString());
    if (value && value !== 'all') {
      p.set(key, value);
    } else {
      p.delete(key);
    }
    p.delete('pagina');
    router.push(`?${p.toString()}`);
  };

  const clearAll = () => {
    router.push('?');
    onClose?.();
  };

  const hasFilters = activeCategory || activeCity || (priceType && priceType !== 'all');

  const content = (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-[#2E7D32]" />
          <h3 className="font-bold text-[#212121]">Filtros</h3>
          {hasFilters && (
            <span className="w-5 h-5 rounded-full bg-[#2E7D32] text-white text-xs font-bold flex items-center justify-center">
              {[activeCategory, activeCity, priceType !== 'all' ? priceType : ''].filter(Boolean).length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs text-[#616161] hover:text-[#D32F2F] transition-colors cursor-pointer"
            >
              <RotateCcw size={12} /> Limpiar
            </button>
          )}
          {isMobile && (
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
              aria-label="Cerrar filtros"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Category */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[#616161] mb-3">Categoría</p>
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="categoria"
              value=""
              checked={!activeCategory}
              onChange={() => updateParam('categoria', '')}
              className="accent-[#2E7D32]"
            />
            <span className="text-sm text-[#616161] group-hover:text-[#212121] transition-colors">
              Todas las categorías
            </span>
          </label>
          {mockCategories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="categoria"
                value={cat.id}
                checked={activeCategory === cat.id}
                onChange={() => updateParam('categoria', cat.id)}
                className="accent-[#2E7D32]"
              />
              <span className="text-sm text-[#616161] group-hover:text-[#212121] transition-colors">
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[#616161] mb-3">Ubicación</p>
        <select
          id="filter-city"
          value={activeCity}
          onChange={(e) => updateParam('ciudad', e.target.value)}
          className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded-xl text-sm text-[#212121] bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32] cursor-pointer"
        >
          <option value="">Todas las ciudades</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[#616161] mb-3">Precio</p>
        <div className="flex flex-col gap-1">
          {[
            { value: 'all', label: 'Todos' },
            { value: 'free', label: 'Gratuitos' },
            { value: 'paid', label: 'Con precio' },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="precio"
                value={opt.value}
                checked={priceType === opt.value}
                onChange={() => updateParam('precio', opt.value)}
                className="accent-[#2E7D32]"
              />
              <span className="text-sm text-[#616161] group-hover:text-[#212121] transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {isMobile && (
        <Button
          variant="primary"
          fullWidth
          onClick={onClose}
        >
          Aplicar filtros
        </Button>
      )}
    </div>
  );

  return content;
}
