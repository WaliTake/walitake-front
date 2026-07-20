'use client';

import Link from 'next/link';
import {
  Leaf, Recycle, Wrench, FileText, Wine, Monitor,
  TreePine, Shirt, Droplets, FlaskConical, ChevronRight,
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import type { Category } from '@/lib/types';

const iconMap: Record<string, React.ElementType> = {
  Leaf, Recycle, Wrench, FileText, Wine, Monitor,
  TreePine, Shirt, Droplets, FlaskConical,
};

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-labelledby="categories-heading">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 id="categories-heading" className="text-2xl font-bold text-[#212121]">
            Categorías de residuos
          </h2>
          <p className="text-[#616161] text-sm mt-1">
            Encontrá exactamente lo que buscás
          </p>
        </div>
        <Link
          href={ROUTES.explorar}
          className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#2E7D32] hover:text-[#4CAF50] transition-colors"
        >
          Ver todos <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {categories.map((cat, idx) => {
          const Icon = iconMap[cat.icon] ?? Recycle;
          return (
            <Link
              key={cat.id}
              href={`${ROUTES.explorar}?categoria=${cat.id}`}
              className={[
                'group flex flex-col items-center gap-3 p-5 rounded-2xl border border-transparent',
                'hover:border-[#E0E0E0] hover:shadow-lg hover:-translate-y-1',
                'transition-all duration-200 cursor-pointer text-center',
                cat.color,
              ].join(' ')}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div
                className={[
                  'w-12 h-12 rounded-xl flex items-center justify-center',
                  'group-hover:scale-110 transition-transform duration-200',
                  cat.color,
                ].join(' ')}
              >
                <Icon className={cat.textColor} size={24} />
              </div>
              <div>
                <p className={`text-sm font-bold ${cat.textColor} leading-tight`}>
                  {cat.name}
                </p>
                <p className="text-xs text-[#616161] mt-0.5 leading-tight line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
