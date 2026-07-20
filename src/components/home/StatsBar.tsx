import { Recycle, Building2, Leaf, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: <Recycle className="text-[#2E7D32]" size={22} />,
    value: '20+',
    label: 'Residuos disponibles',
  },
  {
    icon: <Building2 className="text-[#2E7D32]" size={22} />,
    value: '3',
    label: 'Empresas activas',
  },
  {
    icon: <Leaf className="text-[#2E7D32]" size={22} />,
    value: '40%',
    label: 'Publicaciones gratuitas',
  },
  {
    icon: <TrendingUp className="text-[#2E7D32]" size={22} />,
    value: '10',
    label: 'Categorías de residuos',
  },
];

export function StatsBar() {
  return (
    <section className="bg-[#F1F8E9] border-y border-[#E0E0E0]" aria-label="Estadísticas de la plataforma">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-xl font-bold text-[#212121] leading-none">{stat.value}</p>
                <p className="text-xs text-[#616161] mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
