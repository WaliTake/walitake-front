import Link from 'next/link';
import { Building2, TrendingUp, ShieldCheck, Factory, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';

export const metadata = {
  title: 'Para Empresas | WaliTake',
  description: 'Descubre los beneficios de la economía circular para tu empresa y transforma tus residuos en activos.',
};

export default function ParaEmpresasPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#17221B] py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 bg-[#2E7D32] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Building2 size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Tus residuos no son basura, <span className="text-[#4ADE80]">son activos financieros.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#A3B1A7] max-w-3xl mx-auto leading-relaxed">
            Descubre cómo las empresas más innovadoras están monetizando sus desechos, reduciendo sus costos de disposición y cumpliendo con las normativas ambientales a través de la economía circular.
          </p>
        </div>
      </section>

      {/* Global Data Section */}
      <section className="py-16 bg-[#F7F9F7] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#17221B] text-center mb-12">
            El impacto global de la Economía Circular
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E3E8E4] text-center shadow-sm">
              <p className="text-4xl font-black text-[#2E7D32] mb-2">$4.5 Billones</p>
              <p className="text-sm font-semibold text-[#647067] uppercase tracking-wide">Oportunidad Económica</p>
              <p className="text-[#647067] mt-4 text-sm">
                Es el valor económico global que la economía circular puede generar para 2030, según el World Economic Forum.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[#E3E8E4] text-center shadow-sm">
              <p className="text-4xl font-black text-[#2E7D32] mb-2">45%</p>
              <p className="text-sm font-semibold text-[#647067] uppercase tracking-wide">Reducción de Emisiones</p>
              <p className="text-[#647067] mt-4 text-sm">
                De las emisiones globales de gases de efecto invernadero pueden reducirse al cambiar la forma en que producimos y usamos los materiales (Ellen MacArthur Foundation).
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[#E3E8E4] text-center shadow-sm">
              <p className="text-4xl font-black text-[#2E7D32] mb-2">70%</p>
              <p className="text-sm font-semibold text-[#647067] uppercase tracking-wide">Ahorro en Materiales</p>
              <p className="text-[#647067] mt-4 text-sm">
                Las industrias europeas que adoptaron sistemas circulares reportaron hasta un 70% de ahorro neto en costos de materiales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#17221B] mb-4">¿Por qué unirte a WaliTake?</h2>
          <p className="text-[#647067] text-lg">
            Transforma la gestión de residuos de tu empresa de un centro de costos a una fuente de ingresos y sostenibilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-[#E8F5E9] text-[#2E7D32] rounded-xl flex items-center justify-center mt-1">
                <TrendingUp size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#212121] mb-2">Monetización de Residuos</h3>
                <p className="text-[#616161]">
                  Lo que para tu proceso productivo es un desecho, para otra industria es materia prima. Vende tus recortes, mermas y envases recuperando parte de la inversión inicial.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-[#E8F5E9] text-[#2E7D32] rounded-xl flex items-center justify-center mt-1">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#212121] mb-2">Cumplimiento Ambiental (ESG)</h3>
                <p className="text-[#616161]">
                  Mejora tus métricas de sostenibilidad y cumple con normativas ambientales locales e internacionales, mejorando la imagen corporativa ante inversores y clientes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-[#E8F5E9] text-[#2E7D32] rounded-xl flex items-center justify-center mt-1">
                <Factory size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#212121] mb-2">Reducción de Costos Operativos</h3>
                <p className="text-[#616161]">
                  Si eres comprador, encuentra insumos secundarios a precios mucho más competitivos que las materias primas vírgenes, fortaleciendo la resiliencia de tu cadena de suministro.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F1F8E9] rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-[#166534] mb-4">Caso Práctico</h3>
              <p className="text-[#2E7D32] font-medium mb-6">
                "Una imprenta genera toneladas de recortes de papel y cartón al mes. En lugar de pagar por su disposición en un vertedero, lo publican en WaliTake. Una empresa de embalajes locales lo compra para fabricar maples de huevo."
              </p>
              <ul className="space-y-3 text-[#166534] font-semibold text-sm">
                <li className="flex items-center gap-2">✓ La imprenta elimina el costo de basura y genera un ingreso.</li>
                <li className="flex items-center gap-2">✓ La empresa de embalajes consigue materia prima económica.</li>
                <li className="flex items-center gap-2">✓ El medio ambiente se ahorra la tala de nuevos árboles.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2E7D32] py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Convierte tus residuos en recursos hoy</h2>
        <p className="text-[#C8E6C9] max-w-2xl mx-auto text-lg mb-8">
          Registra tu empresa de forma gratuita y comienza a explorar el mercado B2B de materiales circulares.
        </p>
        <Link href={ROUTES.negocio}>
          <Button className="bg-white text-[#2E7D32] hover:bg-gray-100 px-8 py-6 text-lg font-bold">
            Registrar mi empresa <ArrowRight className="ml-2" size={20} />
          </Button>
        </Link>
      </section>
    </div>
  );
}
