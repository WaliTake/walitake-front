import type { HTMLAttributes } from 'react';

type BadgeVariant = 'category' | 'available' | 'soldout' | 'free' | 'featured' | 'verified' | 'promo';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  categoryColor?: string;
  categoryText?: string;
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, string> = {
  available: 'bg-[#ECFDF3] text-[#166534] border border-[#22C55E]/30',
  soldout: 'bg-red-50 text-[#EF4444] border border-red-200',
  free: 'bg-[#22C55E] text-white border border-[#22C55E]',
  featured: 'bg-amber-50 text-[#F59E0B] border border-amber-200',
  verified: 'bg-blue-50 text-[#3B82F6] border border-blue-200',
  promo: 'bg-[#F59E0B] text-white border-0 font-bold shadow-sm',
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
