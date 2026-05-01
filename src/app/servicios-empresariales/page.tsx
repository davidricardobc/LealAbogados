import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { companyPackages, enterpriseServices, whatsappUrl } from "@/data/site";

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
        title="Acompañamiento jurídico preventivo para empresas que quieren reducir contingencias."
        description="Servicios para ordenar documentos, revisar decisiones laborales y construir una operación con menos exposición jurídica."
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
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <SectionHeader
              title="Paquetes editables para conversaciones comerciales."
              description="Estos paquetes sirven como estructura inicial. El alcance final debe ajustarse según tamaño de la empresa, volumen documental y frecuencia de consultas."
            />
            <div className="mt-8">
              <ButtonLink external href={whatsappUrl}>
                Hablar de mi empresa
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
