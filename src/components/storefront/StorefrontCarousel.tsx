'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StorefrontCarouselProps {
  title: string;
  items: React.ReactNode[];
}

export function StorefrontCarousel({ title, items }: StorefrontCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    // Add small tolerance for rounding issues
    setShowRight(scrollLeft + clientWidth < scrollWidth - 2);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const clientWidth = scrollRef.current.clientWidth;
    const scrollAmount = direction === 'left' ? -clientWidth + 100 : clientWidth - 100;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="mb-10 relative group">
      <div className="flex items-end justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-[#212121] tracking-tight">{title}</h2>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        {showLeft && (
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center text-[#212121] hover:bg-gray-50 z-20 transition-all opacity-0 group-hover:opacity-100 border border-gray-100"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4 pt-1 snap-x snap-mandatory"
        >
          {items.map((item, idx) => (
            <div key={idx} className="w-[160px] sm:w-[180px] md:w-[200px] shrink-0 snap-start">
              {item}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRight && (
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center text-[#212121] hover:bg-gray-50 z-20 transition-all opacity-0 group-hover:opacity-100 border border-gray-100"
            aria-label="Siguiente"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
