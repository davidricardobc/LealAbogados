import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { buildWhatsappUrl, localMarkets, practiceAreas, serviceSeoPageBySlug, serviceSeoPages, siteConfig } from "@/data/site";

type ServicePageProps = {
  params: Promise<{
    serviceSlug: string;
  }>;
};

export function generateStaticParams() {
  return serviceSeoPages.map((page) => ({
    serviceSlug: page.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const page = serviceSeoPageBySlug.get(serviceSlug);

  if (!page) {
    return {};
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.focusKeywords,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: `${page.metaTitle} | Leal Abogados`,
      description: page.metaDescription,
      url: `/${page.slug}`,
      images: [
        {
          url: "/assets/leal-og-launch.png",
          width: 1200,
          height: 630,
          alt: `${page.title} de Leal Abogados en Colombia`,
        },
      ],
    },
    twitter: {
      title: `${page.metaTitle} | Leal Abogados`,
      description: page.metaDescription,
      images: ["/assets/leal-og-launch.png"],
    },
  };
}

export default async function ServiceSeoPage({ params }: ServicePageProps) {
  const { serviceSlug } = await params;
  const page = serviceSeoPageBySlug.get(serviceSlug);

  if (!page) {
    notFound();
  }

  const practiceArea = practiceAreas.find((area) => area.slug === page.practiceAreaSlug);
  const whatsappHref = buildWhatsappUrl(
    `Hola, quiero agendar una consulta con Leal Abogados sobre ${page.title.toLowerCase()}. Mi caso está ubicado en: `,
  );
  const serviceUrl = `${siteConfig.url}/${page.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${serviceUrl}#service`,
        name: page.title,
        url: serviceUrl,
        description: page.metaDescription,
        provider: {
          "@id": `${siteConfig.url}/#legal-service`,
        },
        areaServed: localMarkets.map((market) => ({
          "@type": market.type,
          name: market.name,
        })),
        serviceType: page.title,
      },
      {
        "@type": "FAQPage",
        "@id": `${serviceUrl}#faq`,
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <PageHero
        title={page.heroTitle}
        description={page.heroDescription}
        primaryHref={whatsappHref}
        primaryLabel={`Consultar ${page.title.toLowerCase()}`}
        secondaryHref="/areas-de-practica"
        secondaryLabel="Ver áreas"
        visualAlt={`${page.title} para casos en Meta, Cundinamarca, Bogotá y Colombia`}
        visualPosition="object-[58%_center]"
        visualSrc="/assets/leal-consultation-editorial-v3.png"
      />

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <aside className="border-l-2 border-brand-red bg-smoke p-6 lg:sticky lg:top-32">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">SEO local</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-ink">Prioridad regional.</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{page.localIntro}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {localMarkets.map((market) => (
                <span className="border border-ink/10 bg-white px-3 py-2 text-xs font-semibold text-ink/70" key={market.name}>
                  {market.name}
                </span>
              ))}
            </div>
            <div className="mt-7">
              <ButtonLink external href={whatsappHref} variant="primary" eventLocation={`service-${page.slug}`}>
                Hablar por WhatsApp
              </ButtonLink>
            </div>
          </aside>

          <div>
            <SectionHeader
              title={`¿Cuándo buscar ${page.title.toLowerCase()}?`}
              description={page.intro}
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {page.situations.map((item) => (
                <article className="border border-ink/10 bg-white p-6 shadow-[0_18px_48px_rgba(7,7,7,0.04)]" key={item}>
                  <span className="block h-px w-10 bg-brand-red" />
                  <p className="mt-5 text-sm leading-7 text-ink/78">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-smoke px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">Ruta de trabajo</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-tight text-ink">
              Consulta, criterio y siguiente acción.
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-muted">
              La consulta no reemplaza el estudio completo del caso, pero sí permite saber qué revisar, qué evitar y qué camino jurídico tiene más sentido.
            </p>
          </div>
          <div className="grid gap-4">
            {page.process.map((step, index) => (
              <article className="grid gap-4 border border-ink/10 bg-white p-6 sm:grid-cols-[3.5rem_1fr] sm:items-start" key={step}>
                <span className="flex h-12 w-12 items-center justify-center bg-ink font-serif text-xl font-semibold text-white">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-ink/78">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title={`Preguntas frecuentes sobre ${page.title.toLowerCase()}.`}
            description="Respuestas orientativas. La recomendación final depende de documentos, fechas, pruebas y objetivo del cliente."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {page.faq.map((item) => (
              <article className="border-t border-ink/12 pt-6" key={item.question}>
                <h2 className="font-serif text-2xl font-semibold text-ink">{item.question}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-smoke px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/46">Búsquedas relacionadas</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {page.focusKeywords.map((keyword) => (
              <span className="border border-ink/10 bg-white px-3 py-2 text-sm text-ink/72" key={keyword}>
                {keyword}
              </span>
            ))}
          </div>
          {practiceArea ? (
            <p className="mt-6 text-sm leading-7 text-muted">
              También puedes revisar el área general de <a className="font-semibold text-brand-red underline underline-offset-4" href={`/areas-de-practica#${practiceArea.slug}`}>{practiceArea.title}</a>.
            </p>
          ) : null}
        </div>
      </section>

      <CtaBand
        title={`Agenda una consulta con ${page.title.toLowerCase()}.`}
        text="Cuéntanos qué ocurrió, dónde está ubicado el caso y qué decisión necesitas tomar. Revisaremos la ruta inicial con seriedad y confidencialidad."
      />
    </>
  );
}
