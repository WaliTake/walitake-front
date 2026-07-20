'use client';

import {
  Leaf, Recycle, Wrench, FileText, Wine, Monitor,
  TreePine, Shirt, Droplets, FlaskConical, LayoutGrid,
} from 'lucide-react';
import type { Category } from '@/lib/types';

const iconMap: Record<string, React.ElementType> = {
  Leaf, Recycle, Wrench, FileText, Wine, Monitor,
  TreePine, Shirt, Droplets, FlaskConical,
};

interface CategoryPillsProps {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
}

export function CategoryPills({ categories, active, onChange }: CategoryPillsProps) {
  const all = [
    { id: '', name: 'Todos', icon: 'LayoutGrid', color: 'bg-gray-100', text_color: 'text-gray-700' },
    ...categories,
  ];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E3E8E4]">
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x justify-start md:justify-center">
        {all.map((cat) => {
          const Icon = cat.id === '' ? LayoutGrid : (iconMap[cat.icon] ?? Recycle);
          const isActive = active === cat.id;
          
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className="flex flex-col items-center gap-2 group shrink-0 snap-start cursor-pointer focus:outline-none"
            >
              <div 
                className={[
                  'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300',
                  isActive 
                    ? 'ring-2 ring-offset-2 ring-[#166534] bg-[#ECFDF3] text-[#166534]'
                    : `bg-gray-50 text-[#647067] group-hover:bg-[#ECFDF3] group-hover:text-[#166534]`,
                ].join(' ')}
              >
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <span 
                className={[
                  'text-[13px] font-semibold tracking-tight transition-colors',
                  isActive ? 'text-[#166534]' : 'text-[#647067] group-hover:text-[#17221B]'
                ].join(' ')}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
