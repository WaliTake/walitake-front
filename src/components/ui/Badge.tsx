import type { HTMLAttributes } from 'react';

type BadgeVariant = 'category' | 'available' | 'soldout' | 'free' | 'featured' | 'verified' | 'promo';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  categoryColor?: string;
  categoryText?: string;
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, string> = {
  available: 'bg-[#E8F5E9] text-[#388E3C] border border-[#A5D6A7]',
  soldout: 'bg-red-50 text-[#D32F2F] border border-red-200',
  free: 'bg-[#2E7D32] text-white border border-[#2E7D32]',
  featured: 'bg-amber-50 text-amber-700 border border-amber-200',
  verified: 'bg-blue-50 text-blue-700 border border-blue-200',
  promo: 'bg-[#FFEB3B] text-black border-0 font-bold',
  category: 'border',
};

export function Badge({
  variant = 'category',
  categoryColor,
  categoryText,
  size = 'md',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  const colorClass =
    variant === 'category' && categoryColor && categoryText
      ? `${categoryColor} ${categoryText} border-current/20`
      : variantStyles[variant];

  return (
    <span
      {...props}
      className={[
        'inline-flex items-center gap-1 font-semibold rounded-full whitespace-nowrap',
        sizeClass,
        colorClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}
