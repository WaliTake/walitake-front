'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Leaf,
  Search,
  User,
  ChevronDown,
  LogOut,
  Building2,
  LayoutDashboard,
  Menu,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { MobileNav } from './MobileNav';
import { AccountDrawer } from '@/components/account/AccountDrawer';
import { APP_NAME, ROUTES } from '@/lib/constants';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Dynamic nav links based on auth
  const navLinks = [
    { href: ROUTES.home, label: 'Inicio', show: !user },
    { href: ROUTES.feed, label: 'Feed', show: !!user },
    { href: ROUTES.explorar, label: 'Explorar', show: true },
  ].filter((l) => l.show);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
    router.push(ROUTES.home);
  };

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md'
            : 'bg-white/80 backdrop-blur-sm shadow-sm',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={user ? ROUTES.feed : ROUTES.home} className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-[#2E7D32] rounded-xl flex items-center justify-center shadow-sm group-hover:bg-[#4CAF50] transition-colors duration-200">
                <Leaf className="text-white" size={20} />
              </div>
              <span className="font-bold text-xl text-[#212121] hidden sm:block">
                Eco<span className="text-[#2E7D32]">Residuos</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200',
                    pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                      ? 'bg-[#F1F8E9] text-[#2E7D32]'
                      : 'text-[#616161] hover:text-[#212121] hover:bg-gray-100',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link href={ROUTES.explorar} aria-label="Buscar residuos">
                <button className="w-9 h-9 flex items-center justify-center rounded-full text-[#616161] hover:bg-gray-100 hover:text-[#212121] transition-colors">
                  <Search size={18} />
                </button>
              </Link>

              {user ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setDrawerOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E0E0E0] hover:border-[#81C784] hover:bg-[#F1F8E9] transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#2E7D32] flex items-center justify-center text-white text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-[#212121] max-w-[100px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                  </button>
                  <button
                    onClick={handleLogout}
                    title="Cerrar sesión"
                    className="w-9 h-9 flex items-center justify-center rounded-full text-[#616161] hover:bg-red-50 hover:text-[#D32F2F] transition-colors cursor-pointer"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href={ROUTES.login}>
                    <Button variant="ghost" size="sm" icon={<User size={15} />}>
                      Iniciar sesión
                    </Button>
                  </Link>
                  <Link href={ROUTES.registro}>
                    <Button variant="primary" size="sm">
                      Registrarse
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-trigger"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#616161] transition-colors cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16" />

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <AccountDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
