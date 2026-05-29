import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { companyPackages, enterpriseScenarios, enterpriseServices, whatsappUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Servicios empresariales",
  description:
    "Servicios jurídicos empresariales para reglamento interno de trabajo, contratación laboral, seguridad social, riesgos laborales y acompañamiento preventivo mensual.",
  alternates: {
    canonical: "/servicios-empresariales",
  },
};

export default function EnterpriseServicesPage() {
  return (
    <>
      <PageHero
        title="Acompañamiento jurídico preventivo para empresas que necesitan decidir mejor."
        description="Servicios para respaldar decisiones laborales, ordenar frentes sensibles y responder con más criterio antes de que un asunto escale."
        secondaryHref="/contacto"
        secondaryLabel="Solicitar contacto"
      />

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Servicios empresariales de alta utilidad operativa."
            description="La propuesta no es responder emergencias aisladas, sino crear soporte jurídico recurrente para decisiones que se repiten dentro de la empresa."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {enterpriseServices.map((service) => (
              <article className="border border-ink/10 p-6 transition hover:border-brand-red/45" key={service.title}>
                <h2 className="font-serif text-3xl font-semibold text-ink">{service.title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{service.summary}</p>
                <ul className="mt-6 space-y-3">
                  {service.deliverables.map((item) => (
                    <li className="border-t border-ink/8 pt-3 text-sm text-ink/72" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-smoke px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Frentes empresariales en los que la firma ya puede intervenir."
            description="Aquí se aterriza el tipo de apoyo confirmado en el material fuente del cliente, para que el visitante entienda mejor dónde encaja su necesidad."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {enterpriseScenarios.map((scenario) => (
              <article className="border border-ink/10 bg-white p-6" key={scenario.title}>
                <h2 className="font-serif text-2xl font-semibold text-ink">{scenario.title}</h2>
                <ul className="mt-6 space-y-3">
                  {scenario.points.map((point) => (
                    <li className="flex gap-3 text-sm leading-7 text-ink/76" key={point}>
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 bg-brand-red" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <SectionHeader
              title="Modalidades de acompañamiento para supervisión comercial."
              description="Estas modalidades sirven como base de conversación y deben cerrarse según volumen de consultas, complejidad jurídica y frecuencia real del soporte requerido."
            />
            <div className="mt-8">
              <ButtonLink external href={whatsappUrl}>
                Solicitar orientación empresarial
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {companyPackages.map((pack) => (
              <article className="bg-white p-6" key={pack.name}>
                <h2 className="font-serif text-2xl font-semibold text-ink">{pack.name}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{pack.fit}</p>
                <ul className="mt-6 space-y-3">
                  {pack.includes.map((item) => (
                    <li className="text-sm text-ink/72" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="La prevención jurídica también es una decisión de gestión."
        text="Una empresa ordenada jurídicamente responde mejor, negocia con más claridad y reduce el costo de conflictos evitables."
      />
    </>
  );
}
