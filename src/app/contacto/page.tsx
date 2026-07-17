import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { LeadForm } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { siteConfig, socialProfiles, whatsappLinks } from "@/data/site";

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
        title="Contacto directo para iniciar una consulta bien preparada."
        description="Comparte el contexto inicial del caso y la firma podrá orientar el siguiente paso de forma ágil desde cualquier lugar de Colombia: consulta, revisión del caso, acción legal o acompañamiento empresarial."
        secondaryHref="/consulta-juridica"
        secondaryLabel="Ver consulta"
      />

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionHeader
              title="Canales directos para iniciar la conversación."
              description="WhatsApp sigue siendo la vía más rápida para una primera consulta. También puedes dejar el caso por formulario para una revisión más ordenada en cualquier lugar de Colombia, con atención remota y coordinación presencial cuando aplique."
            />
            <div className="mt-8 space-y-4 border border-ink/10 p-6">
              <p className="text-sm text-muted">Teléfono</p>
              <p className="font-semibold text-ink">{siteConfig.phone}</p>
              <p className="pt-3 text-sm text-muted">Correo</p>
              <p className="font-semibold text-ink">{siteConfig.email}</p>
              <p className="pt-3 text-sm text-muted">Dominio</p>
              <p className="font-semibold text-ink">{siteConfig.domain}</p>
              {socialProfiles.length > 0 ? (
                <>
                  <p className="pt-3 text-sm text-muted">Redes sociales</p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {socialProfiles.map((profile) =>
                      profile.href ? (
                        <a
                          className="inline-flex items-center rounded-sm border border-ink/12 px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand-red hover:text-brand-red"
                          href={profile.href}
                          key={profile.label}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {profile.label} · {profile.handle}
                        </a>
                      ) : (
                        <span
                          className="inline-flex items-center rounded-sm border border-ink/12 px-4 py-2 text-sm font-semibold text-ink"
                          key={profile.label}
                        >
                          {profile.label} · {profile.handle}
                        </span>
                      ),
                    )}
                  </div>
                </>
              ) : null}
              <div className="pt-4">
                <ButtonLink external href={whatsappLinks.contact}>
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
