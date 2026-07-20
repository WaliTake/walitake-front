import Link from 'next/link';
import { Leaf, Code2, Globe, Camera, Heart } from 'lucide-react';
import { APP_NAME, ROUTES } from '@/lib/constants';

const footerLinks = {
  plataforma: [
    { label: 'Cómo funciona', href: '#' },
    { label: 'Explorar residuos', href: ROUTES.explorar },
    { label: 'Publicar residuo', href: ROUTES.nuevoResiduo },
    { label: 'Para empresas', href: '#' },
  ],
  soporte: [
    { label: 'Centro de ayuda', href: '#' },
    { label: 'Contacto', href: '#' },
    { label: 'Reportar problema', href: '#' },
    { label: 'Estado del servicio', href: '#' },
  ],
  legal: [
    { label: 'Términos de uso', href: '#' },
    { label: 'Privacidad', href: '#' },
    { label: 'Cookies', href: '#' },
    { label: 'Aviso legal', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#212121] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={ROUTES.home} className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-9 h-9 bg-[#2E7D32] rounded-xl flex items-center justify-center group-hover:bg-[#4CAF50] transition-colors">
                <Leaf className="text-white" size={20} />
              </div>
              <span className="font-bold text-xl">
                Eco<span className="text-[#81C784]">Residuos</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              Conectamos generadores de residuos con compradores y recicladores. Economía circular
              para un futuro más verde.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <Code2 size={18} />, label: 'GitHub', href: '#' },
                { icon: <Globe size={18} />, label: 'Twitter', href: '#' },
                { icon: <Camera size={18} />, label: 'Instagram', href: '#' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-[#2E7D32] hover:text-white transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-[#81C784] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            Hecho con <Heart size={13} className="text-[#81C784] fill-current" /> en Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
