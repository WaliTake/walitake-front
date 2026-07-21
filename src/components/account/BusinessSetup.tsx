'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BUSINESS_TYPES, ROUTES } from '@/lib/constants';
import { toast } from 'react-hot-toast';
import type { Business } from '@/lib/types';
import { createBusiness } from '@/lib/data/businesses';
import { useAuth } from '@/hooks/useAuth';

interface BusinessSetupProps {
  existing?: Business | null;
  onSave?: (biz: Partial<Business>) => void;
}

export function BusinessSetup({ existing, onSave }: BusinessSetupProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [name, setName] = useState(existing?.name ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [address, setAddress] = useState(existing?.address ?? '');
  const [city, setCity] = useState(existing?.city ?? '');
  const [phone, setPhone] = useState(existing?.phone ?? '');
  const [type, setType] = useState(existing?.type ?? '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = { name, description, address, city, phone, type, userId: user?.id };
      
      if (onSave) {
        onSave(data);
      } else {
        if (!existing) {
          await createBusiness(data);
        } else {
          // Future updateBusiness call could go here
        }
      }
      
      toast.success(existing ? 'Negocio actualizado' : 'Negocio creado exitosamente');
      router.push(ROUTES.cuenta);
    } catch (err) {
      toast.error('Hubo un error al guardar el negocio');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#F1F8E9] flex items-center justify-center">
          <Building2 size={22} className="text-[#2E7D32]" />
        </div>
        <h2 className="text-lg font-bold text-[#212121]">
          {existing ? 'Editar negocio' : 'Crear mi negocio'}
        </h2>
      </div>

      <div>
        <label htmlFor="biz-name" className="block text-sm font-semibold text-[#212121] mb-1.5">
          Nombre del negocio *
        </label>
        <input
          id="biz-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Restaurante El Verde"
          className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition-shadow"
        />
      </div>

      <div>
        <label htmlFor="biz-type" className="block text-sm font-semibold text-[#212121] mb-1.5">
          Tipo de negocio *
        </label>
        <select
          id="biz-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white cursor-pointer"
        >
          <option value="">Seleccioná un tipo</option>
          {BUSINESS_TYPES.map((bt) => (
            <option key={bt.value} value={bt.value}>{bt.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="biz-description" className="block text-sm font-semibold text-[#212121] mb-1.5">
          Descripción
        </label>
        <textarea
          id="biz-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Contá brevemente qué hace tu negocio y qué tipo de residuos generás..."
          className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition-shadow resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="biz-city" className="block text-sm font-semibold text-[#212121] mb-1.5">
            Ciudad *
          </label>
          <input
            id="biz-city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="La Paz"
            className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition-shadow"
          />
        </div>
        <div>
          <label htmlFor="biz-phone" className="block text-sm font-semibold text-[#212121] mb-1.5">
            Teléfono
          </label>
          <input
            id="biz-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+591 6666-7777"
            className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition-shadow"
          />
        </div>
      </div>

      <div>
        <label htmlFor="biz-address" className="block text-sm font-semibold text-[#212121] mb-1.5">
          Dirección
        </label>
        <input
          id="biz-address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Av. Hernando Siles 1234"
          className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition-shadow"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" loading={loading} icon={<Save size={16} />}>
          {existing ? 'Guardar cambios' : 'Crear negocio'}
        </Button>
      </div>
    </form>
  );
}
