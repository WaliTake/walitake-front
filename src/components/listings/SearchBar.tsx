'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({ placeholder = '¿Qué residuo buscás?', className = '' }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('busqueda') ?? '');

  useEffect(() => {
    setValue(searchParams.get('busqueda') ?? '');
  }, [searchParams]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set('busqueda', value.trim());
      } else {
        params.delete('busqueda');
      }
      router.push(`?${params.toString()}`);
    },
    [value, router, searchParams]
  );

  const handleClear = () => {
    setValue('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('busqueda');
    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`} role="search">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        size={18}
        aria-hidden="true"
      />
      <input
        id="explore-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-12 py-3.5 bg-white border border-[#E0E0E0] rounded-2xl text-sm text-[#212121] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent shadow-sm transition-shadow hover:shadow-md"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          aria-label="Borrar búsqueda"
        >
          <X size={14} />
        </button>
      )}
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#2E7D32] text-white text-xs font-semibold rounded-xl hover:bg-[#4CAF50] transition-colors cursor-pointer"
        aria-label="Buscar"
      >
        Buscar
      </button>
    </form>
  );
}
