import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Package, Calendar, Tag } from 'lucide-react';
import { getListingById } from '@/lib/data/listings';
import { getBusinessById } from '@/lib/data/businesses';
import { getCategoryById } from '@/lib/data/categories';
import { ImageGallery } from '@/components/detail/ImageGallery';
import { ContactSeller } from '@/components/detail/ContactSeller';
import { BusinessCard } from '@/components/detail/BusinessCard';
import { Badge } from '@/components/ui/Badge';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListingById(id);
  return {
    title: listing ? `${listing.title} | ${APP_NAME}` : 'Residuo no encontrado',
    description: listing?.description,
  };
}

export default async function ResiduoDetailPage({ params }: Props) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) notFound();

  const [business, category] = await Promise.all([
    getBusinessById(listing.businessId),
    Promise.resolve(getCategoryById(listing.categoryId)),
  ]);

  if (!business) notFound();

  const priceLabel =
    listing.price === 0
      ? 'Gratis'
      : `$${listing.price.toLocaleString('es-AR')} / ${listing.unit}`;

  const formattedDate = new Date(listing.createdAt).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F1F8E9] border-b border-[#E0E0E0] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/explorar"
            className="inline-flex items-center gap-2 text-sm text-[#616161] hover:text-[#2E7D32] font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            Volver a explorar
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column – image + info */}
          <div className="lg:col-span-2 space-y-6">
            <ImageGallery imageUrl={listing.imageUrl} title={listing.title} />

            {/* Title + badges */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {category && (
                  <Badge
                    variant="category"
                    categoryColor={category.color}
                    categoryText={category.textColor}
                  >
                    {category.name}
                  </Badge>
                )}
                {listing.price === 0 && <Badge variant="free">Gratis</Badge>}
                <Badge variant={listing.available ? 'available' : 'soldout'}>
                  {listing.available ? 'Disponible' : 'Agotado'}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#212121] leading-tight mb-4">
                {listing.title}
              </h1>

              <p className="text-[#616161] leading-relaxed">{listing.description}</p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <Package size={18} className="text-[#2E7D32]" />,
                  label: 'Cantidad',
                  value: `${listing.quantity.toLocaleString('es-AR')} ${listing.unit}`,
                },
                {
                  icon: <Tag size={18} className="text-[#2E7D32]" />,
                  label: 'Precio',
                  value: priceLabel,
                },
                {
                  icon: <Calendar size={18} className="text-[#2E7D32]" />,
                  label: 'Publicado',
                  value: formattedDate,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[#F1F8E9] rounded-xl p-4 border border-[#E0E0E0]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {item.icon}
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#616161]">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-base font-bold text-[#212121]">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            {listing.tags && listing.tags.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#616161] mb-2">
                  Etiquetas
                </p>
                <div className="flex flex-wrap gap-2">
                  {listing.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-[#616161] text-xs font-medium rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column – contact + business */}
          <div className="space-y-4">
            {/* Price card */}
            <div className="bg-white rounded-2xl border border-[#E0E0E0] shadow-sm p-5">
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className={`text-3xl font-bold ${listing.price === 0 ? 'text-[#388E3C]' : 'text-[#212121]'}`}
                >
                  {listing.price === 0 ? 'Gratis' : `$${listing.price.toLocaleString('es-AR')}`}
                </span>
                {listing.price > 0 && (
                  <span className="text-sm text-[#616161]">/ {listing.unit}</span>
                )}
              </div>
              <p className="text-xs text-[#616161] mb-5">
                {listing.quantity.toLocaleString('es-AR')} {listing.unit} disponibles
              </p>

              {listing.available ? (
                <ContactSeller listing={listing} business={business} />
              ) : (
                <div className="w-full py-3 bg-gray-100 text-[#616161] text-sm font-semibold rounded-full text-center">
                  Stock agotado
                </div>
              )}
            </div>

            {/* Business card */}
            <BusinessCard business={business} />
          </div>
        </div>
      </div>
    </div>
  );
}
