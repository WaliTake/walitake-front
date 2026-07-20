'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Home, Search, User, Building2, LogOut, Leaf, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/constants';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    logout();
    onClose();
    router.push(ROUTES.home);
  };

  const navItems = [
    { href: ROUTES.home, label: 'Inicio', icon: <Home size={20} /> },
    { href: ROUTES.explorar, label: 'Explorar residuos', icon: <Search size={20} /> },
    ...(user
      ? [
          { href: ROUTES.cuenta, label: 'Mi cuenta', icon: <User size={20} /> },
          { href: ROUTES.negocio, label: 'Mi negocio', icon: <Building2 size={20} /> },
        ]
      : []),
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={[
          'fixed top-0 right-0 bottom-0 w-72 bg-white z-50 flex flex-col shadow-2xl md:hidden',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2E7D32] rounded-xl flex items-center justify-center">
              <Leaf className="text-white" size={18} />
            </div>
            <span className="font-bold text-lg">
              Wali<span className="text-[#2E7D32]">Take</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#616161] transition-colors cursor-pointer"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* User info */}
        {user && (
          <div className="px-5 py-4 bg-[#F1F8E9] border-b border-[#E0E0E0]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2E7D32] flex items-center justify-center text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-[#212121] text-sm">{user.name}</p>
                <p className="text-xs text-[#616161] truncate max-w-[160px]">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[#616161] hover:bg-[#F1F8E9] hover:text-[#2E7D32] font-semibold text-sm transition-all duration-200 mb-1"
            >
              <span className="text-[#81C784]">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#D32F2F] hover:bg-red-50 font-semibold text-sm transition-colors w-full cursor-pointer"
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>
          ) : (
            <>
              <Link
                href={ROUTES.login}
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#2E7D32] text-[#2E7D32] font-semibold text-sm hover:bg-[#F1F8E9] transition-colors"
              >
                <LogIn size={16} />
                Iniciar sesión
              </Link>
              <Link
                href={ROUTES.registro}
                onClick={onClose}
                className="flex items-center justify-center w-full py-3 rounded-xl bg-[#2E7D32] text-white font-semibold text-sm hover:bg-[#4CAF50] transition-colors"
              >
                Registrarse gratis
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
