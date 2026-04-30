import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { ConsultationBrief } from "@/components/consultation-brief";
import { CtaBand } from "@/components/cta-band";
import { LeadForm } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { journeySteps, whatsappUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Consulta juridica",
  description:
    "Consulta juridica estrategica para ordenar hechos, revisar riesgos y definir si el caso debe escalar a tutela, tramite, proceso o acompanamiento preventivo.",
  alternates: {
    canonical: "/consulta-juridica",
  },
};

const benefits = [
  "Entender si existe una ruta juridica razonable.",
  "Priorizar documentos y hechos relevantes.",
  "Evitar respuestas impulsivas o firmas riesgosas.",
  "Definir el siguiente paso: prevenir, reclamar, negociar o demandar.",
];

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        title="Consulta juridica para convertir incertidumbre en una ruta de accion."
        description="La consulta es el punto de entrada a Leal Abogados. Permite evaluar el caso con criterio, explicar escenarios y decidir si conviene una accion legal concreta."
        secondaryHref="/contacto"
        secondaryLabel="Enviar formulario"
      />

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            title="Que obtiene el cliente en la consulta."
            description="No se trata de una respuesta rapida sin contexto. La consulta estructura el caso para que la siguiente decision tenga respaldo."
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
            title="Que pasa despues de la consulta."
            description="Si el asunto amerita avanzar, se define alcance, tiempos, documentos y una ruta de ejecucion."
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
              description="WhatsApp reduce friccion cuando el caso es urgente. El formulario ayuda a preparar informacion para una revision mas ordenada."
            />
            <div className="mt-8">
              <ButtonLink external href={whatsappUrl}>
                Agendar por WhatsApp
              </ButtonLink>
            </div>
          </div>
          <LeadForm context="consulta-juridica" />
        </div>
      </section>

      <CtaBand
        title="La primera decision tambien es juridica."
        text="Antes de iniciar un tramite, responder una comunicacion o firmar un documento, una consulta puede cambiar la ruta completa del caso."
      />
    </>
  );
}
