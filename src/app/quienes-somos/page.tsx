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
        title="Firmeza al defender, compromiso hasta el final."
        description="Leal Abogados Compañía defiende derechos e intereses con compromiso real, atención transparente y una forma de trabajo combativa, eficaz y humana."
        secondaryHref="/contacto"
        secondaryLabel="Hablar con la firma"
        visualAlt="Retrato profesional de Juan Berley Leal Bernal, fundador de Leal Abogados"
        visualClassName="bg-[#eef0ed]"
        visualFit="contain"
        visualPosition="object-center"
        visualSrc="/assets/juan-berley-leal-bernal-oficial.png"
      />

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Perfil de la firma"
            description="Una firma jurídica construida para acompañar casos personales, familiares, patrimoniales y empresariales con seriedad, empatía y firmeza."
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
            description="La confianza nace cuando el cliente identifica quién dirige la defensa y qué experiencia respalda cada decisión jurídica, sin exponer información personal innecesaria."
          />
          <div className="mt-12 max-w-5xl">
            {teamProfiles.map((profile) => (
              <article
                className="overflow-hidden border border-ink/10 bg-white p-7 shadow-[0_24px_70px_rgba(7,7,7,0.04)] sm:p-9 lg:p-10"
                key={profile.name}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">{profile.role}</p>
                  <h2 className="mt-4 font-serif text-3xl font-semibold text-ink sm:text-4xl">{profile.name}</h2>
                  <p className="mt-5 max-w-3xl text-base leading-8 text-muted">{profile.summary}</p>
                  <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                    {profile.highlights.map((item) => (
                      <li className="border-t border-ink/10 pt-4 text-sm leading-6 text-ink/76" key={item}>
                        <span className="mb-4 block h-px w-10 bg-brand-red" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
            description="La confianza se construye a través de la manera en que la firma acompaña y defiende a sus clientes."
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
