import { HeroBanner } from '@/components/home/HeroBanner';
import { StatsBar } from '@/components/home/StatsBar';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedListings } from '@/components/home/FeaturedListings';
import { mockCategories } from '@/lib/data/categories';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${APP_NAME} – Marketplace de Residuos`,
  description: APP_DESCRIPTION,
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <StatsBar />
      <CategoryGrid categories={mockCategories} />
      <div className="border-t border-[#E0E0E0]" />
      <FeaturedListings />
    </>
  );
}
