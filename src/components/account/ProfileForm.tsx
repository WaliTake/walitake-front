'use client';

import { useState } from 'react';
import { Save, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';

export function ProfileForm() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [email] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    updateUser({ name, phone });
    setLoading(false);
    toast.success('Perfil actualizado correctamente');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      {/* Avatar preview */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-[#2E7D32] flex items-center justify-center text-white text-2xl font-bold shadow-md">
          {name.charAt(0).toUpperCase() || <User size={24} />}
        </div>
        <div>
          <p className="font-bold text-[#212121]">{name || 'Tu nombre'}</p>
          <p className="text-sm text-[#616161]">{email}</p>
        </div>
      </div>

      <div>
        <label htmlFor="profile-name" className="block text-sm font-semibold text-[#212121] mb-1.5">
          Nombre completo
        </label>
        <input
          id="profile-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition-shadow"
        />
      </div>

      <div>
        <label htmlFor="profile-email" className="block text-sm font-semibold text-[#212121] mb-1.5">
          Email
        </label>
        <input
          id="profile-email"
          type="email"
          value={email}
          disabled
          className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm bg-gray-50 text-[#616161] cursor-not-allowed"
        />
        <p className="text-xs text-[#616161] mt-1">El email no puede modificarse</p>
      </div>

      <div>
        <label htmlFor="profile-phone" className="block text-sm font-semibold text-[#212121] mb-1.5">
          Teléfono
        </label>
        <input
          id="profile-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+591 6666-7777"
          className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition-shadow"
        />
      </div>

      <div className="pt-2">
        <Button type="submit" variant="primary" loading={loading} icon={<Save size={16} />}>
          Guardar cambios
        </Button>
      </div>
    </form>
  );
}
