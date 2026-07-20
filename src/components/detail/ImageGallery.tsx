'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ZoomIn } from 'lucide-react';

interface ImageGalleryProps {
  imageUrl: string;
  title: string;
}

export function ImageGallery({ imageUrl, title }: ImageGalleryProps) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-video group cursor-zoom-in" onClick={() => setZoomed(true)}>
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, 60vw"
        priority
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
          <ZoomIn size={20} className="text-[#2E7D32]" />
        </div>
      </div>

      {/* Fullscreen overlay */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoomed(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[85vh] aspect-video">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
