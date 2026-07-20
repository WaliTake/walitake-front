'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { ROUTES, MOCK_CREDENTIALS } from '@/lib/constants';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      toast.success('¡Bienvenido de vuelta!');
      router.push(ROUTES.explorar);
    } else {
      setError(result.error ?? 'Error al iniciar sesión');
    }
  };

  const fillDemo = () => {
    setEmail(MOCK_CREDENTIALS.email);
    setPassword(MOCK_CREDENTIALS.password);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#F1F8E9] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#E0E0E0] p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-[#2E7D32] rounded-2xl flex items-center justify-center mb-3 shadow-lg">
              <Leaf className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-[#212121]">Bienvenido</h1>
            <p className="text-sm text-[#616161] mt-1">Iniciá sesión en tu cuenta</p>
          </div>

          {/* Demo hint */}
          <button
            type="button"
            onClick={fillDemo}
            className="w-full mb-5 py-2.5 px-4 bg-[#F1F8E9] border border-[#81C784] rounded-xl text-xs text-[#2E7D32] font-semibold hover:bg-[#E8F5E9] transition-colors cursor-pointer"
          >
            🔑 Usar credenciales de demo ({MOCK_CREDENTIALS.email})
          </button>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold text-[#212121] mb-1.5">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-semibold text-[#212121] mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
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
              icon={<LogIn size={18} />}
            >
              Iniciar sesión
            </Button>
          </form>

          <p className="text-center text-sm text-[#616161] mt-6">
            ¿No tenés cuenta?{' '}
            <Link href={ROUTES.registro} className="text-[#2E7D32] font-semibold hover:text-[#4CAF50] transition-colors">
              Registrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
