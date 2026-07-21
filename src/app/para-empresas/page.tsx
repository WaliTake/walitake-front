import Link from 'next/link';
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  Factory,
  Leaf,
  Recycle,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';

export const metadata = {
  title: 'Para Empresas | WaliTake',
  description:
    'Descubre los beneficios de la economía circular para tu empresa y transforma tus residuos en activos.',
};

const statistics = [
  {
    value: '$4.5 billones',
    label: 'Oportunidad económica',
    description:
      'Potencial económico global atribuido a la transición hacia modelos de economía circular.',
  },
  {
    value: '45%',
    label: 'Reducción de emisiones',
    description:
      'Parte de las emisiones que puede abordarse transformando cómo producimos y utilizamos materiales.',
  },
  {
    value: '70%',
    label: 'Ahorro en materiales',
    description:
      'Ahorro potencial reportado en determinadas industrias que implementan procesos circulares.',
  },
];

const benefits = [
  {
    icon: BadgeDollarSign,
    title: 'Monetiza tus residuos',
    description:
      'Publica recortes, mermas, envases y otros materiales que ya no utilizas para convertirlos en una nueva fuente de ingresos.',
  },
  {
    icon: ShieldCheck,
    title: 'Mejora tu desempeño ambiental',
    description:
      'Fortalece tus indicadores de sostenibilidad y registra acciones concretas de reutilización y aprovechamiento.',
  },
  {
    icon: Factory,
    title: 'Reduce costos operativos',
    description:
      'Encuentra materiales secundarios a precios competitivos y disminuye la dependencia de materias primas vírgenes.',
  },
  {
    icon: TrendingUp,
    title: 'Fortalece tu cadena de suministro',
    description:
      'Conecta con nuevos proveedores y compradores para construir una operación más flexible y resiliente.',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Registra tu empresa',
    description:
      'Crea un perfil empresarial con la información principal de tu organización.',
  },
  {
    number: '02',
    title: 'Publica o busca',
    description:
      'Ofrece los residuos que generas o encuentra materiales útiles para tus procesos.',
  },
  {
    number: '03',
    title: 'Conecta y negocia',
    description:
      'Comunícate con otras empresas y acuerda cantidades, precios y condiciones.',
  },
];

export default function ParaEmpresasPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      {/* Hero */}
      <section className="relative bg-[#17221B] px-4 py-20 text-white sm:px-6 md:py-28 lg:px-8">
        {/* Decoración */}
        <div
          aria-hidden="true"
          className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#2E7D32]/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#4ADE80]/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Contenido principal */}
          <div>


            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Tus residuos pueden convertirse en{' '}
              <span className="text-[#4ADE80]">
                nuevos activos para tu empresa.
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#B7C3BA] md:text-xl">
              WaliTake conecta empresas que generan materiales aprovechables con
              organizaciones que pueden reutilizarlos como insumos para nuevos
              procesos productivos.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href={ROUTES.negocio}>
                <Button className="group w-full bg-[#2E7D32] px-8 py-6 text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1B5E20] hover:shadow-xl sm:w-auto">
                  Registrar mi empresa
                </Button>
              </Link>

              <Link href={ROUTES.explorar}>
                <Button className="w-full border-2 border-white/30 bg-transparent px-8 py-6 text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#17221B] sm:w-auto">
                  Explorar materiales
                </Button>
              </Link>
            </div>
          </div>

          {/* Tarjeta visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-[#2E7D32]/30" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/10 p-7 shadow-2xl backdrop-blur-md md:p-9">
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#86EFAC]">
                    Economía circular
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    Del residuo al recurso
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2E7D32]">
                  <Recycle size={25} />
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-sm text-[#B7C3BA]">Material generado</p>
                  <p className="mt-1 text-lg font-bold">
                    Recortes de papel y cartón
                  </p>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="rotate-90 text-[#4ADE80]" size={24} />
                </div>

                <div className="rounded-2xl border border-[#4ADE80]/30 bg-[#2E7D32]/30 p-5">
                  <p className="text-sm text-[#BBF7D0]">Nueva oportunidad</p>
                  <p className="mt-1 text-lg font-bold">
                    Materia prima para embalajes
                  </p>
                </div>
              </div>

              <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-6">
                <CheckCircle2 size={20} className="text-[#4ADE80]" />
                <p className="text-sm text-[#D1DBD3]">
                  Menos costos, más ingresos y menor impacto ambiental.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="bg-[#F7F9F7] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">

            <h2 className="text-3xl font-black tracking-tight text-[#17221B] md:text-4xl">
              La economía circular también es una oportunidad empresarial
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#647067]">
              Adoptar procesos circulares permite reducir desperdicios,
              aprovechar mejor los recursos y crear nuevas relaciones
              comerciales.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {statistics.map((stat) => (
              <article
                key={stat.label}
                className="group rounded-3xl border border-[#E3E8E4] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#A5D6A7] hover:shadow-xl"
              >
                <div className="mb-7 h-1.5 w-14 rounded-full bg-[#2E7D32] transition-all duration-300 group-hover:w-24" />

                <p className="text-4xl font-black tracking-tight text-[#2E7D32] md:text-5xl">
                  {stat.value}
                </p>

                <p className="mt-4 text-sm font-black uppercase tracking-[0.12em] text-[#17221B]">
                  {stat.label}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[#647067]">
                  {stat.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>

            <h2 className="text-3xl font-black leading-tight tracking-tight text-[#17221B] md:text-4xl">
              ¿Por qué incorporar WaliTake a tu empresa?
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#647067]">
              Convierte la gestión de residuos en una estrategia capaz de
              generar valor económico, ambiental y reputacional.
            </p>

            <div className="mt-8 rounded-2xl border border-[#DDE8DE] bg-[#F1F8E9] p-6">
              <div className="flex gap-4">
                <Leaf
                  size={24}
                  className="mt-1 shrink-0 text-[#2E7D32]"
                />

                <p className="leading-relaxed text-[#2E5633]">
                  Cada material recuperado puede reducir costos de disposición,
                  evitar nuevas extracciones y generar una oportunidad para otra
                  organización.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="group rounded-3xl border border-[#E7ECE8] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#A5D6A7] hover:shadow-lg"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F5E9] text-[#2E7D32] transition-transform duration-300 group-hover:scale-110">
                    <Icon size={27} />
                  </div>

                  <h3 className="text-xl font-black text-[#212121]">
                    {benefit.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-[#616161]">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="bg-[#17221B] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">

            <h2 className="text-3xl font-black md:text-4xl">
              Empieza a generar valor en tres pasos
            </h2>

            <p className="mt-5 text-lg text-[#A3B1A7]">
              Publicar o encontrar materiales dentro de WaliTake es rápido,
              claro y accesible.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {processSteps.map((step) => (
              <article
                key={step.number}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                <span className="absolute -right-2 -top-5 text-8xl font-black text-white/5">
                  {step.number}
                </span>

                <div className="relative">

                  <h3 className="text-2xl font-black">{step.title}</h3>

                  <p className="mt-4 leading-relaxed text-[#B7C3BA]">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Caso práctico */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-[#DDE8DE] bg-[#F1F8E9]">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col justify-center bg-[#2E7D32] p-8 text-white md:p-12">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#C8E6C9]">
                Caso práctico
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight">
                Una imprenta convierte sus recortes en una oportunidad
              </h2>

              <p className="mt-5 leading-relaxed text-[#E8F5E9]">
                En lugar de pagar por retirar sus residuos de papel y cartón, la
                imprenta los publica en WaliTake para que otra empresa pueda
                aprovecharlos.
              </p>
            </div>

            <div className="p-8 md:p-12">
              <p className="text-lg font-medium leading-relaxed text-[#2E5633]">
                Una empresa local de embalajes encuentra la publicación y
                utiliza esos recortes como materia prima para fabricar nuevos
                productos.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  'La imprenta reduce el costo de disposición y obtiene un ingreso.',
                  'La empresa compradora consigue materia prima más accesible.',
                  'El material permanece dentro del ciclo productivo.',
                ].map((result) => (
                  <div key={result} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2E7D32] text-white">
                      <CheckCircle2 size={15} />
                    </div>

                    <p className="font-semibold leading-relaxed text-[#355E3B]">
                      {result}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#43A047] px-6 py-16 text-center text-white shadow-2xl shadow-green-900/20 md:px-16 md:py-20">
          <div
            aria-hidden="true"
            className="absolute -left-20 -top-20 h-64 w-64 rounded-full border-[45px] border-white/5"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-32 -right-24 text-white/10"
          >
            <Recycle size={350} />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl">


            <h2 className="mt-6 text-3xl font-black md:text-5xl">
              Convierte tus residuos en recursos
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#E8F5E9]">
              Registra tu empresa y comienza a formar parte de una red de
              organizaciones comprometidas con la producción responsable.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href={ROUTES.negocio}>
                <Button className="group w-full bg-black px-8 py-6 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl sm:w-auto">
                  Registrar mi empresa

                </Button>
              </Link>

              <Link href={ROUTES.explorar}>
                <Button className="w-full border-2 border-white bg-transparent px-8 py-6 text-lg font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#2E7D32] sm:w-auto">
                  Ver materiales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}