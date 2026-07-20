import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/contexts/CartContext';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} – Marketplace de Residuos`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: ['residuos', 'reciclaje', 'economía circular', 'marketplace', 'ecológico', 'sustentable'],
  authors: [{ name: APP_NAME }],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: APP_NAME,
    title: `${APP_NAME} – Marketplace de Residuos`,
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white text-[#212121] font-sans antialiased">
        <Providers>
          <CartProvider>
            <Header />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
