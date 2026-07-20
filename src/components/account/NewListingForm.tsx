'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PackagePlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { mockCategories } from '@/lib/data/categories';
import { UNITS, ROUTES } from '@/lib/constants';
import { toast } from 'react-hot-toast';

export function NewListingForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [price, setPrice] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast.success('¡Residuo publicado exitosamente!');
    router.push(ROUTES.cuenta);
  };

  const inputClass =
    'w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition-shadow';

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#F1F8E9] flex items-center justify-center">
          <PackagePlus size={22} className="text-[#2E7D32]" />
        </div>
        <h2 className="text-lg font-bold text-[#212121]">Publicar residuo</h2>
      </div>

      <div>
        <label htmlFor="lst-category" className="block text-sm font-semibold text-[#212121] mb-1.5">
          Categoría *
        </label>
        <select
          id="lst-category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className={`${inputClass} bg-white cursor-pointer`}
        >
          <option value="">Seleccioná una categoría</option>
          {mockCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="lst-title" className="block text-sm font-semibold text-[#212121] mb-1.5">
          Título *
        </label>
        <input
          id="lst-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Ej: Restos orgánicos de cocina – café y té"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="lst-description" className="block text-sm font-semibold text-[#212121] mb-1.5">
          Descripción
        </label>
        <textarea
          id="lst-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Describí el residuo, su estado, frecuencia de disponibilidad, condiciones de retiro..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="lst-quantity" className="block text-sm font-semibold text-[#212121] mb-1.5">
            Cantidad *
          </label>
          <input
            id="lst-quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            placeholder="100"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lst-unit" className="block text-sm font-semibold text-[#212121] mb-1.5">
            Unidad *
          </label>
          <select
            id="lst-unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className={`${inputClass} bg-white cursor-pointer`}
          >
            {UNITS.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="lst-price" className="block text-sm font-semibold text-[#212121]">
            Precio
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
              className="accent-[#2E7D32]"
            />
            <span className="text-sm text-[#2E7D32] font-semibold">Ofrecer como Promo</span>
          </label>
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#616161] font-semibold text-sm">
            $
          </span>
          <input
            id="lst-price"
            type="number"
            min="0"
            value={isFree ? '0' : price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={isFree}
            placeholder="0"
            className={`${inputClass} pl-8 ${isFree ? 'bg-gray-50 text-[#616161] cursor-not-allowed' : ''}`}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" loading={loading} icon={<PackagePlus size={16} />}>
          Publicar residuo
        </Button>
      </div>
    </form>
  );
}
