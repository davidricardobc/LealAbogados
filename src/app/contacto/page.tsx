import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { LeadForm } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { siteConfig, whatsappUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta a Leal Abogados para agendar una consulta jurídica o solicitar soporte legal empresarial.",
  alternates: {
    canonical: "/contacto",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contacto directo para iniciar con una consulta bien preparada."
        description="Comparte el contexto inicial del caso y el equipo podrá orientar el siguiente paso: consulta, revisión documental, acción legal o acompañamiento empresarial."
        secondaryHref="/consulta-juridica"
        secondaryLabel="Ver consulta"
      />

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionHeader
              title="Datos listos para editar."
              description="Estos campos centralizan teléfono, correo, ciudad y canales definitivos para mantener la comunicación consistente antes de publicar."
            />
            <div className="mt-8 space-y-4 border border-ink/10 p-6">
              <p className="text-sm text-muted">Teléfono</p>
              <p className="font-semibold text-ink">{siteConfig.phone}</p>
              <p className="pt-3 text-sm text-muted">Correo</p>
              <p className="font-semibold text-ink">{siteConfig.email}</p>
              <p className="pt-3 text-sm text-muted">Ubicacion</p>
              <p className="font-semibold text-ink">{siteConfig.address}</p>
              <div className="pt-4">
                <ButtonLink external href={whatsappUrl}>
                  Escribir por WhatsApp
                </ButtonLink>
              </div>
            </div>
          </div>
          <LeadForm context="contacto" />
        </div>
      </section>
    </>
  );
}
