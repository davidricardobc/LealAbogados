import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import {
  firmApproach,
  firmMission,
  firmProfile,
  firmVision,
  generalObjective,
  institutionalValues,
  specificObjectives,
  teamProfiles,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Perfil institucional de Leal Abogados Compañía, su liderazgo, misión, visión, valores y objetivos.",
  alternates: {
    canonical: "/quienes-somos",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Una firma construida para defender con criterio, compromiso y claridad."
        description="Leal Abogados Compañía reúne experiencia jurídica, liderazgo visible y una forma de trabajo enfocada en acompañar con seriedad a personas, familias y empresas en toda Colombia."
        secondaryHref="/contacto"
        secondaryLabel="Hablar con la firma"
      />

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Perfil de la firma"
            description="La historia y el enfoque institucional deben construir confianza sin recargar el inicio. Aquí vive el contenido corporativo completo."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="border border-ink/10 bg-white p-7 shadow-[0_24px_70px_rgba(7,7,7,0.05)]">
              <h2 className="font-serif text-3xl font-semibold text-ink">Qué defiende la firma</h2>
              <p className="mt-5 text-base leading-8 text-muted">{firmProfile}</p>
            </article>
            <article className="border border-ink/10 bg-smoke p-7">
              <h2 className="font-serif text-3xl font-semibold text-ink">Cómo acompaña cada caso</h2>
              <p className="mt-5 text-base leading-8 text-muted">{firmApproach}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-smoke px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Liderazgo de la firma"
            description="La estructura familiar y profesional se vuelve una fortaleza cuando el visitante puede identificar quién dirige y cómo trabaja el equipo."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {teamProfiles.map((profile) => (
              <article className="border border-ink/10 bg-white p-7 shadow-[0_24px_70px_rgba(7,7,7,0.04)]" key={profile.name}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">{profile.role}</p>
                <h2 className="mt-4 font-serif text-3xl font-semibold text-ink">{profile.name}</h2>
                <p className="mt-5 text-sm leading-7 text-muted">{profile.summary}</p>
                <ul className="mt-6 space-y-3">
                  {profile.highlights.map((item) => (
                    <li className="flex gap-3 text-sm text-ink/76" key={item}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-red" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <article>
              <SectionHeader
                title="Misión"
                description={firmMission}
              />
            </article>
            <article>
              <SectionHeader
                title="Visión"
                description={firmVision}
              />
            </article>
          </div>
        </div>
      </section>

      <section className="bg-smoke px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Valores y objetivos"
            description="La promesa institucional se sostiene en principios visibles y en una meta clara de defensa jurídica seria."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-5">
              {institutionalValues.map((value) => (
                <article className="border border-ink/10 bg-white p-6" key={value.title}>
                  <h2 className="font-serif text-2xl font-semibold text-ink">{value.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{value.text}</p>
                </article>
              ))}
            </div>
            <div className="grid gap-5">
              <article className="border border-ink/10 bg-white p-6">
                <h2 className="font-serif text-2xl font-semibold text-ink">Objetivo general</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{generalObjective}</p>
              </article>
              <article className="border border-ink/10 bg-white p-6">
                <h2 className="font-serif text-2xl font-semibold text-ink">Objetivos específicos</h2>
                <ul className="mt-4 space-y-3">
                  {specificObjectives.map((item) => (
                    <li className="flex gap-3 text-sm leading-7 text-ink/76" key={item}>
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 bg-brand-red" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="La confianza también se construye explicando quién está detrás."
        text="Si el caso requiere una revisión inicial, la firma puede orientar el siguiente paso con atención remota y coordinación presencial cuando resulte necesaria."
      />
    </>
  );
}
