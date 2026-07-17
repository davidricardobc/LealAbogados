import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { practiceAreas } from "@/data/site";

export const metadata: Metadata = {
  title: "Áreas de práctica",
  description:
    "Áreas de práctica de Leal Abogados: familia, sucesiones, laboral, seguridad social, civil, tutelas, trámites notariales y soporte empresarial.",
  alternates: {
    canonical: "/areas-de-practica",
  },
};

export default function PracticeAreasPage() {
  return (
    <>
      <PageHero
        title="Áreas de práctica conectadas por una misma lógica: criterio antes de actuar."
        description="Cada área parte de una consulta inicial para entender el caso, valorar riesgos y elegir una ruta proporcional: prevención, trámite, reclamación, tutela o proceso."
        secondaryHref="/consulta-juridica"
        secondaryLabel="Ver consulta"
        visualAlt="Consulta jurídica con documentos organizados para definir una estrategia legal"
        visualPosition="object-[58%_center]"
        visualSrc="/assets/leal-consultation-editorial-v3.png"
      />

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Problemas legales que requieren estructura."
            description="El objetivo es que el visitante identifique su situación sin sentirse empujado a una promesa exagerada. Primero se aclara; después se decide."
          />
          <div className="mt-12 grid gap-6">
            {practiceAreas.map((area) => (
              <article className="grid gap-6 border border-ink/10 bg-white p-6 md:grid-cols-[0.8fr_1.2fr]" id={area.slug} key={area.slug}>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">Área de práctica</span>
                  <h2 className="mt-4 font-serif text-3xl font-semibold text-ink">{area.title}</h2>
                  <p className="mt-5 text-sm leading-7 text-muted">{area.summary}</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/46">Señales de consulta</h3>
                    <ul className="mt-4 space-y-3">
                      {area.signals.map((signal) => (
                        <li className="flex gap-3 text-sm text-ink/76" key={signal}>
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-red" />
                          {signal}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-l border-ink/10 pl-5">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/46">Posible escalamiento</h3>
                    <p className="mt-4 text-sm leading-7 text-muted">{area.escalation}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
