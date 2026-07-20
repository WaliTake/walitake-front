'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, User, Building2, Package, Plus, Trash2, ArchiveX, Save, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { mockCategories } from '@/lib/data/categories';
import { getBusinessByUserId } from '@/lib/data/businesses';
import { getListingsByBusiness } from '@/lib/data/listings';
import { ROUTES } from '@/lib/constants';
import { toast } from 'react-hot-toast';
import type { Business, WasteListing } from '@/lib/types';

// ─── Tab types ────────────────────────────────────────────────────────────────
type DrawerTab = 'perfil' | 'negocio' | 'residuos';

const tabs: { id: DrawerTab; label: string; icon: ReactNode }[] = [
  { id: 'perfil', label: 'Perfil', icon: <User size={15} /> },
  { id: 'negocio', label: 'Negocio', icon: <Building2 size={15} /> },
  { id: 'residuos', label: 'Residuos', icon: <Package size={15} /> },
];

// ─── Perfil tab ───────────────────────────────────────────────────────────────
function PerfilTab() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [saving, setSaving] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    updateUser({ name, phone });
    setSaving(false);
    toast.success('Perfil actualizado');
  };

  return (
    <form onSubmit={save} className="space-y-4 p-5">
      {/* Avatar */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-14 h-14 rounded-2xl bg-[#2E7D32] flex items-center justify-center text-white text-xl font-bold shadow-md">
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-[#212121] text-sm">{name || user?.name}</p>
          <p className="text-xs text-[#616161] flex items-center gap-1">
            <Mail size={11} /> {user?.email}
          </p>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#616161] uppercase tracking-wider mb-1.5">
          Nombre
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-[#616161] uppercase tracking-wider mb-1.5">
          Teléfono
        </label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+54 11 1234-5678"
          className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />
      </div>
      <Button type="submit" variant="primary" size="sm" loading={saving} icon={<Save size={14} />} fullWidth>
        Guardar
      </Button>
    </form>
  );
}

// ─── Negocio tab ──────────────────────────────────────────────────────────────
function NegocioTab({ business, dataLoading }: { business: Business | null | undefined; dataLoading: boolean }) {
  if (dataLoading) {
    return (
      <div className="p-5 space-y-3">
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton variant="text" lines={3} />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="p-5 text-center py-10">
        <div className="w-14 h-14 rounded-full bg-[#F1F8E9] flex items-center justify-center mx-auto mb-3">
          <Building2 size={24} className="text-[#81C784]" />
        </div>
        <p className="font-bold text-[#212121] text-sm mb-1">Sin negocio registrado</p>
        <p className="text-xs text-[#616161] mb-4">Creá el perfil de tu empresa para publicar residuos.</p>
        <Link href={ROUTES.negocio}>
          <Button variant="primary" size="sm" icon={<Plus size={14} />}>
            Crear negocio
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-4">
      <div className="flex items-start gap-3 p-4 bg-[#F1F8E9] rounded-xl border border-[#E0E0E0]">
        <div className="w-11 h-11 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white font-bold shrink-0">
          {business.name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-[#212121] text-sm">{business.name}</p>
          <p className="text-xs text-[#616161] capitalize">{business.type} · {business.city}</p>
          <p className="text-xs text-[#616161] mt-0.5">{business.phone}</p>
        </div>
      </div>
      <p className="text-xs text-[#616161] leading-relaxed line-clamp-3">{business.description}</p>
      <Link href={ROUTES.negocio}>
        <Button variant="outline" size="sm" fullWidth>Editar negocio</Button>
      </Link>
    </div>
  );
}

// ─── Residuos tab ─────────────────────────────────────────────────────────────
function ResiduosTab({ listings: initial, dataLoading }: { listings: WasteListing[]; dataLoading: boolean }) {
  const [listings, setListings] = useState(initial);
  useEffect(() => { setListings(initial); }, [initial]);

  const toggle = (id: string) => {
    setListings((p) => p.map((l) => l.id === id ? { ...l, available: !l.available } : l));
    toast.success('Estado actualizado');
  };
  const remove = (id: string) => {
    setListings((p) => p.filter((l) => l.id !== id));
    toast.success('Residuo eliminado');
  };

  if (dataLoading) {
    return (
      <div className="p-5 space-y-3">
        {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="p-5 text-center py-10">
        <div className="w-14 h-14 rounded-full bg-[#F1F8E9] flex items-center justify-center mx-auto mb-3">
          <Package size={24} className="text-[#81C784]" />
        </div>
        <p className="font-bold text-[#212121] text-sm mb-1">Sin residuos publicados</p>
        <p className="text-xs text-[#616161] mb-4">Publicá tus primeros residuos.</p>
        <Link href={ROUTES.nuevoResiduo}>
          <Button variant="primary" size="sm" icon={<Plus size={14} />}>Publicar</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs text-[#616161]">{listings.length} publicación{listings.length !== 1 ? 'es' : ''}</p>
        <Link href={ROUTES.nuevoResiduo}>
          <Button variant="primary" size="sm" icon={<Plus size={13} />}>Nuevo</Button>
        </Link>
      </div>
      {listings.map((l) => {
        const cat = mockCategories.find((c) => c.id === l.categoryId);
        return (
          <div key={l.id} className={`flex gap-3 p-3 rounded-xl border ${l.available ? 'bg-white border-[#E0E0E0]' : 'bg-gray-50 border-gray-200 opacity-70'}`}>
            <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-100">
              <Image src={l.imageUrl} alt={l.title} fill className="object-cover" sizes="56px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#212121] line-clamp-1">{l.title}</p>
              <div className="flex gap-1 mt-1 flex-wrap">
                {cat && (
                  <Badge variant="category" categoryColor={cat.color} categoryText={cat.textColor} size="sm">
                    {cat.name}
                  </Badge>
                )}
                <Badge variant={l.available ? 'available' : 'soldout'} size="sm">
                  {l.available ? 'Disponible' : 'Agotado'}
                </Badge>
              </div>
              <p className="text-xs text-[#616161] mt-0.5">{l.quantity} {l.unit} · {l.price === 0 ? 'Gratis' : `$${l.price}`}</p>
            </div>
            <div className="flex flex-col gap-1 shrink-0">
              <button onClick={() => toggle(l.id)} title="Cambiar estado" className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F1F8E9] text-[#616161] hover:text-[#2E7D32] transition-colors cursor-pointer">
                <ArchiveX size={13} />
              </button>
              <button onClick={() => remove(l.id)} title="Eliminar" className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#616161] hover:text-[#D32F2F] transition-colors cursor-pointer">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Drawer ──────────────────────────────────────────────────────────────
interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: DrawerTab;
}

export function AccountDrawer({ isOpen, onClose, initialTab = 'perfil' }: AccountDrawerProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<DrawerTab>(initialTab);
  const [business, setBusiness] = useState<Business | null | undefined>(undefined);
  const [listings, setListings] = useState<WasteListing[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!user || !isOpen) return;
    setDataLoading(true);
    getBusinessByUserId(user.id).then(async (biz) => {
      setBusiness(biz ?? null);
      if (biz) {
        const lsts = await getListingsByBusiness(biz.id);
        setListings(lsts);
      }
      setDataLoading(false);
    });
  }, [user, isOpen]);

  if (!user) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={onClose} aria-hidden="true" />
      )}

      {/* Drawer */}
      <div
        className={[
          'fixed top-0 right-0 bottom-0 w-80 bg-white z-50 flex flex-col shadow-2xl',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label="Panel de cuenta"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] px-5 pt-5 pb-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#A5D6A7] text-xs font-medium">Mi cuenta</p>
            <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer" aria-label="Cerrar">
              <X size={16} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white text-xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-white text-sm">{user.name}</p>
              <p className="text-[#C8E6C9] text-xs truncate max-w-[170px]">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-[#E0E0E0] bg-white">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                'flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-bold transition-all duration-200 cursor-pointer',
                activeTab === tab.id
                  ? 'text-[#2E7D32] border-b-2 border-[#2E7D32]'
                  : 'text-[#616161] hover:text-[#212121]',
              ].join(' ')}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'perfil' && <PerfilTab />}
          {activeTab === 'negocio' && <NegocioTab business={business} dataLoading={dataLoading} />}
          {activeTab === 'residuos' && <ResiduosTab listings={listings} dataLoading={dataLoading} />}
        </div>
      </div>
    </>
  );
}
