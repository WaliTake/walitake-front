'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Building2, Package } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Tabs } from '@/components/ui/Tabs';
import { ProfileForm } from '@/components/account/ProfileForm';
import { MyListings } from '@/components/account/MyListings';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { getBusinessByUserId } from '@/lib/data/businesses';
import { getListingsByBusiness } from '@/lib/data/listings';
import type { Business, WasteListing } from '@/lib/types';
import { ROUTES } from '@/lib/constants';
import { Skeleton } from '@/components/ui/Skeleton';

const tabs = [
  { id: 'perfil', label: 'Perfil', icon: <User size={16} /> },
  { id: 'negocio', label: 'Mi negocio', icon: <Building2 size={16} /> },
  { id: 'residuos', label: 'Mis residuos', icon: <Package size={16} /> },
];

export default function CuentaPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('perfil');
  const [business, setBusiness] = useState<Business | null | undefined>(undefined);
  const [listings, setListings] = useState<WasteListing[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(ROUTES.login);
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      setDataLoading(true);
      const biz = await getBusinessByUserId(user.id);
      setBusiness(biz ?? null);
      if (biz) {
        const bzListings = await getListingsByBusiness(biz.id);
        setListings(bzListings);
      }
      setDataLoading(false);
    };
    load();
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#F1F8E9] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#616161] text-sm">Cargando cuenta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F8E9]">
      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#2E7D32] flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#212121]">{user.name}</h1>
              <p className="text-[#616161] text-sm">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="bg-white rounded-2xl border border-[#E0E0E0] p-6 shadow-sm min-h-[300px]"
        >
          {activeTab === 'perfil' && <ProfileForm />}

          {activeTab === 'negocio' && (
            <div>
              <h2 className="text-lg font-bold text-[#212121] mb-5">Mi negocio</h2>
              {dataLoading ? (
                <div className="space-y-3">
                  <Skeleton variant="text" lines={3} />
                </div>
              ) : business ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-[#F1F8E9] rounded-xl border border-[#E0E0E0]">
                    <div className="w-12 h-12 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {business.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-[#212121]">{business.name}</p>
                      <p className="text-sm text-[#616161] capitalize">{business.type}</p>
                      <p className="text-sm text-[#616161] mt-1">{business.city}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#616161]">{business.description}</p>
                  <Link href={ROUTES.negocio}>
                    <Button variant="outline" size="sm">Editar negocio</Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-[#F1F8E9] flex items-center justify-center mx-auto mb-4">
                    <Building2 size={28} className="text-[#81C784]" />
                  </div>
                  <p className="font-bold text-[#212121] mb-2">No tenés un negocio registrado</p>
                  <p className="text-sm text-[#616161] mb-6">
                    Creá el perfil de tu negocio para empezar a publicar residuos.
                  </p>
                  <Link href={ROUTES.negocio}>
                    <Button variant="primary" icon={<Building2 size={16} />}>
                      Crear mi negocio
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'residuos' && (
            <div>
              <h2 className="text-lg font-bold text-[#212121] mb-5">Mis residuos</h2>
              {dataLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 rounded-2xl" />
                  ))}
                </div>
              ) : (
                <MyListings initialListings={listings} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
