'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';
import { toast } from 'react-hot-toast';

export default function RegistroPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setError('');
    setLoading(true);

    const result = await register(name, email, password);
    setLoading(false);

    if (result.success) {
      toast.success('¡Cuenta creada exitosamente!');
      router.push(ROUTES.explorar);
    } else {
      setError(result.error ?? 'Error al registrarse');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#F1F8E9] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-[#E0E0E0] p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-[#2E7D32] rounded-2xl flex items-center justify-center mb-3 shadow-lg">
              <Leaf className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-[#212121]">Crear cuenta</h1>
            <p className="text-sm text-[#616161] mt-1">Unite a la economía circular</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="register-name" className="block text-sm font-semibold text-[#212121] mb-1.5">
                Nombre completo
              </label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="María García"
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="register-email" className="block text-sm font-semibold text-[#212121] mb-1.5">
                Email
              </label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="register-password" className="block text-sm font-semibold text-[#212121] mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-4 py-3 pr-11 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              icon={<UserPlus size={18} />}
            >
              Crear cuenta
            </Button>
          </form>

          <p className="text-center text-sm text-[#616161] mt-6">
            ¿Ya tenés cuenta?{' '}
            <Link href={ROUTES.login} className="text-[#2E7D32] font-semibold hover:text-[#4CAF50] transition-colors">
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
