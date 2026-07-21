import Link from 'next/link';
import {
  CheckCircle2,
  Globe2,
  Recycle,
  Repeat2,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';

export const metadata = {
  title: 'Acerca de WaliTake',
  description:
    'Conoce más sobre nuestra iniciativa para impulsar la economía circular.',
};

const impactItems = [
  {
    icon: Recycle,
    title: 'Nuestro propósito',
    description:
      'Evitar que materiales con valor terminen en vertederos, facilitando su recuperación, intercambio y reutilización.',
  },
  {
    icon: Globe2,
    title: 'Impacto ambiental',
    description:
      'La reutilización reduce la contaminación y disminuye la necesidad de extraer nuevos recursos naturales.',
  },
  {
    icon: Repeat2,
    title: 'Economía circular',
    description:
      'Conectamos organizaciones para que el residuo de una empresa pueda convertirse en el recurso de otra.',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Publica',
    description:
      'Registra el material reciclable, su cantidad, ubicación y características principales.',
  },
  {
    number: '02',
    title: 'Conecta',
    description:
      'Personas, recicladores y empresas interesadas pueden encontrar y solicitar los materiales.',
  },
  {
    number: '03',
    title: 'Reutiliza',
    description:
      'El material vuelve al ciclo productivo y evita convertirse en un residuo definitivo.',
  },
];

export default function AcercaDePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-[#F1F8E9] via-[#F8FCF5] to-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        {/* Decoración de fondo */}
        <div
          aria-hidden="true"
          className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#A5D6A7]/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#81C784]/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-5xl text-center">

          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-tight tracking-tight text-[#1F1F1F] md:text-6xl">
            Transformamos residuos en{' '}
            <span className="relative inline-block text-[#2E7D32]">
              nuevas oportunidades
              <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-[#A5D6A7]/50" />
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-[#5F6368] md:text-xl">
            WaliTake conecta a quienes generan materiales reciclables con
            personas y organizaciones capaces de darles una segunda vida.
            Menos residuos, más colaboración y nuevas cadenas de valor.
          </p>
        </div>
      </section>

      {/* Propósito e impacto */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-[#2E7D32]">
            Nuestra razón de ser
          </p>

          <h2 className="text-3xl font-black tracking-tight text-[#212121] md:text-4xl">
            Un modelo más responsable con los recursos
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#616161]">
            En la naturaleza no existe el concepto de basura: todo se
            transforma y vuelve al ciclo. WaliTake lleva esta lógica al entorno
            empresarial y comunitario.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {impactItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#A5D6A7] hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F5E9] text-[#2E7D32] transition-transform duration-300 group-hover:scale-110">
                  <Icon size={27} />
                </div>

                <h3 className="text-xl font-black text-[#212121]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-relaxed text-[#616161]">
                  {item.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#2E7D32]">
                  <CheckCircle2 size={17} />
                  Impacto positivo
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="bg-[#FAFAFA] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">

            <h2 className="text-3xl font-black tracking-tight text-[#212121] md:text-4xl">
              ¿Cómo funciona WaliTake?
            </h2>

            <p className="mt-5 text-lg text-[#616161]">
              Convertir un residuo en una oportunidad puede comenzar en pocos
              pasos.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {processSteps.map((step) => (
              <article
                key={step.number}
                className="relative rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
              >
                <span className="absolute right-7 top-5 text-5xl font-black text-[#E8F5E9]">
                  {step.number}
                </span>

                <div className="relative">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#2E7D32] text-lg font-black text-white shadow-md">
                    {Number(step.number)}
                  </div>

                  <h3 className="text-2xl font-black text-[#212121]">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-[#616161]">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#43A047] px-6 py-14 text-center text-white shadow-2xl shadow-green-900/20 md:px-16 md:py-20">
          <div
            aria-hidden="true"
            className="absolute -left-20 -top-20 h-64 w-64 rounded-full border-[45px] border-white/5"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-32 -right-20 text-white/10"
          >
            <Recycle size={360} />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl">

            <h2 className="mt-6 text-3xl font-black md:text-5xl">
              Sé parte del cambio
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#E8F5E9]">
              Encuentra materiales disponibles o publica los residuos de tu
              organización para que puedan convertirse en nuevos recursos.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href={ROUTES.explorar}>
                <Button className="group w-full bg-black px-8 py-6 text-lg font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gray-800 sm:w-auto">
                  Explorar materiales

                </Button>
              </Link>

              <Link href={ROUTES.nuevoResiduo}>
                <Button className="w-full border-2 border-white bg-transparent px-8 py-6 text-lg font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#2E7D32] sm:w-auto">
                  Publicar residuo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}