import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { ConsultationBrief } from "@/components/consultation-brief";
import { CtaBand } from "@/components/cta-band";
import { LeadForm } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { journeySteps, whatsappLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Consulta jurídica",
  description:
    "Consulta jurídica estratégica para revisar hechos, valorar riesgos y definir si el caso debe escalar a tutela, reclamación, proceso o acompañamiento preventivo.",
  alternates: {
    canonical: "/consulta-juridica",
  },
};

const benefits = [
  "Entender si existe una ruta jurídica razonable.",
  "Priorizar documentos y hechos relevantes.",
  "Evitar respuestas impulsivas o firmas riesgosas.",
  "Definir el siguiente paso: prevenir, reclamar, negociar o demandar.",
];

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        title="Consulta jurídica para convertir incertidumbre en una ruta de acción."
        description="La consulta es el punto de entrada a Leal Abogados Compañía. Permite evaluar el caso con criterio, explicar escenarios y decidir de forma ágil desde cualquier lugar de Colombia si conviene reclamar, negociar, controvertir judicialmente o iniciar una acción."
        secondaryHref="/contacto"
        secondaryLabel="Enviar formulario"
      />

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            title="Qué obtiene el cliente en la consulta."
            description="No se trata de una respuesta rápida sin contexto. La consulta estructura el caso para que la siguiente decisión tenga respaldo, con atención inicial remota y posibilidad de coordinación presencial cuando el asunto lo requiera."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <article className="border border-ink/10 p-6 transition hover:border-brand-red/45" key={benefit}>
                <span className="block h-px w-10 bg-brand-red" />
                <p className="mt-5 text-base font-semibold leading-7 text-ink">{benefit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-smoke px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            align="center"
            title="Qué pasa después de la consulta."
            description="Si el asunto amerita avanzar, se define alcance, tiempos, documentos y una ruta de ejecución."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {journeySteps.map((step) => (
              <article className="bg-white p-6" key={step.title}>
                <h3 className="font-serif text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ConsultationBrief />

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              title="Agenda por WhatsApp o deja el caso por formulario."
              description="WhatsApp reduce fricción cuando el caso es urgente. El formulario ayuda a preparar la información inicial del caso y los soportes relevantes desde cualquier lugar de Colombia."
            />
            <div className="mt-8">
              <ButtonLink external href={whatsappLinks.consultation}>
                Agendar por WhatsApp
              </ButtonLink>
            </div>
          </div>
          <LeadForm context="consulta-juridica" />
        </div>
      </section>

      <CtaBand
        title="La primera decisión también es jurídica."
        text="Antes de iniciar un trámite, responder una comunicación o firmar un documento, una consulta puede cambiar la ruta completa del caso."
      />
    </>
  );
}
