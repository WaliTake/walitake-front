'use client';

import { ArrowRight, Leaf, ShieldCheck, Factory } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

const banners = [
  {
    id: 1,
    title: 'Ahorra en tus insumos',
    description: 'Hasta 30% OFF en Madera y Cartón para tu negocio.',
    color: 'bg-[#FFF9C4]',
    textColor: 'text-[#F57F17]',
    icon: <Factory size={48} className="text-[#FBC02D] opacity-80 absolute -bottom-2 -right-2" />,
    link: `${ROUTES.explorar}?categoria=madera`
  },
  {
    id: 2,
    title: 'Compostaje Premium',
    description: 'Bolsas de orgánicos gratis al retirar más de 10kg.',
    color: 'bg-[#E8F5E9]',
    textColor: 'text-[#2E7D32]',
    icon: <Leaf size={48} className="text-[#81C784] opacity-80 absolute -bottom-2 -right-2" />,
    link: `${ROUTES.explorar}?categoria=organico`
  },
  {
    id: 3,
    title: 'Plásticos Certificados',
    description: 'Trazabilidad garantizada para tu planta recicladora.',
    color: 'bg-[#E3F2FD]',
    textColor: 'text-[#1565C0]',
    icon: <ShieldCheck size={48} className="text-[#64B5F6] opacity-80 absolute -bottom-2 -right-2" />,
    link: `${ROUTES.explorar}?categoria=plastico`
  }
];

export function PromoBanners() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
      <h2 className="text-xl font-bold text-[#212121] tracking-tight mb-4">Promociones para tu Negocio</h2>
      <div className="flex gap-4 overflow-x-auto snap-x scrollbar-hide pb-4">
        {banners.map((banner) => (
          <Link 
            href={banner.link} 
            key={banner.id}
            className={`relative group shrink-0 snap-start w-[280px] sm:w-[320px] lg:flex-1 h-36 rounded-3xl ${banner.color} p-5 flex flex-col justify-between overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer`}
          >
            <div className="relative z-10 max-w-[85%]">
              <h3 className={`text-lg font-extrabold ${banner.textColor} leading-tight mb-1`}>
                {banner.title}
              </h3>
              <p className="text-sm text-[#616161] font-medium leading-snug">
                {banner.description}
              </p>
            </div>
            
            <div className="relative z-10 flex items-center gap-1 mt-auto font-bold text-[#212121] text-xs">
              Ver ofertas <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>

            {banner.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
