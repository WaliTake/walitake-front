import Link from 'next/link';
import { Leaf, Recycle, Globe2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';

export const metadata = {
  title: 'Acerca de WaliTake',
  description: 'Conoce más sobre nuestra iniciativa para impulsar la economía circular.',
};

export default function AcercaDePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#F1F8E9] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 bg-[#2E7D32] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Leaf size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#212121] tracking-tight">
            Transformando residuos en <span className="text-[#2E7D32]">nuevas oportunidades</span>
          </h1>
          <p className="text-lg md:text-xl text-[#616161] max-w-2xl mx-auto leading-relaxed">
            WaliTake es una iniciativa nacida con la misión de impulsar la economía circular, conectando a quienes generan materiales reciclables con quienes pueden darles una segunda vida.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="space-y-4">
            <div className="w-12 h-12 bg-[#E8F5E9] text-[#2E7D32] rounded-xl flex items-center justify-center">
              <Recycle size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#212121]">Nuestro Propósito</h3>
            <p className="text-[#616161] leading-relaxed">
              En la naturaleza no existe el concepto de "basura". Todo se transforma y vuelve al ciclo. En WaliTake queremos llevar esta misma lógica a la industria, evitando que miles de toneladas de materiales útiles terminen en vertederos.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-[#E8F5E9] text-[#2E7D32] rounded-xl flex items-center justify-center">
              <Globe2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#212121]">Impacto Ambiental</h3>
            <p className="text-[#616161] leading-relaxed">
              Al reutilizar residuos como materia prima, no solo reducimos la contaminación del suelo y agua, sino que también disminuimos drástically la huella de carbono asociada con la extracción de nuevos recursos vírgenes.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-[#E8F5E9] text-[#2E7D32] rounded-xl flex items-center justify-center">
              <Leaf size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#212121]">Economía Circular</h3>
            <p className="text-[#616161] leading-relaxed">
              Fomentamos un sistema donde el residuo de una empresa se convierte en el activo o insumo principal de otra. Esto genera nuevas cadenas de valor, empleos verdes y un ecosistema empresarial más resiliente.
            </p>
          </div>

        </div>

        {/* Call to action */}
        <div className="mt-24 bg-[#2E7D32] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Sé parte del cambio</h2>
            <p className="text-[#C8E6C9] max-w-xl mx-auto text-lg">
              Explora los materiales disponibles o comienza a publicar los residuos que genera tu empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href={ROUTES.explorar}>
                <Button className="bg-black text-[#2E7D32] hover:bg-gray-100 px-8 py-6 text-lg font-bold w-full sm:w-auto">
                  Explorar materiales
                </Button>
              </Link>
              <Link href={ROUTES.nuevoResiduo}>
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-bold w-full sm:w-auto">
                  Publicar residuo
                </Button>
              </Link>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 text-white/10">
            <Recycle size={300} />
          </div>
        </div>
      </section>
    </div>
  );
}
