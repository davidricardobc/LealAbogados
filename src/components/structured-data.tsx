import { enterpriseServices, localMarkets, practiceAreas, serviceSeoPages, siteConfig, socialProfiles, teamProfiles } from "@/data/site";

export function StructuredData() {
  const founder = teamProfiles[0];
  const publicSocialUrls = socialProfiles.map((profile) => profile.href).filter(Boolean);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/assets/leal-logo.png`,
        image: `${siteConfig.url}/assets/leal-hero-logo-original.png`,
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: siteConfig.phone,
            email: siteConfig.email,
            availableLanguage: ["es-CO"],
            areaServed: "CO",
          },
        ],
        founder: {
          "@id": `${siteConfig.url}/quienes-somos#juan-berley-leal-bernal`,
        },
        ...(publicSocialUrls.length > 0 ? { sameAs: publicSocialUrls } : {}),
      },
      {
        "@type": "LegalService",
        "@id": `${siteConfig.url}/#legal-service`,
        name: siteConfig.name,
        url: siteConfig.url,
        image: `${siteConfig.url}/assets/leal-hero-logo-original.png`,
        description: siteConfig.description,
        areaServed: localMarkets.map((market) => ({
          "@type": market.type,
          name: market.name,
        })),
        address: {
          "@type": "PostalAddress",
          addressCountry: "CO",
        },
        availableLanguage: ["es-CO"],
        telephone: siteConfig.phone,
        email: siteConfig.email,
        knowsAbout: [
          "Derecho de familia",
          "Derecho laboral",
          "Seguridad social",
          "Derecho civil",
          "Sucesiones",
          "Tutelas",
          "Servicios jurídicos empresariales",
          "Abogados en Meta",
          "Abogados en Cundinamarca",
          "Abogados en Bogotá",
        ],
        parentOrganization: {
          "@id": `${siteConfig.url}/#organization`,
        },
        serviceType: practiceAreas.map((area) => area.title),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios jurídicos",
          itemListElement: [
            ...practiceAreas.map((area) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: area.title,
                description: area.summary,
                url: `${siteConfig.url}/${serviceSeoPages.find((page) => page.practiceAreaSlug === area.slug)?.slug ?? `areas-de-practica#${area.slug}`}`,
              },
            })),
            ...enterpriseServices.map((service) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: service.title,
                description: service.summary,
                url: `${siteConfig.url}/servicios-empresariales`,
              },
            })),
          ],
        },
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/quienes-somos#juan-berley-leal-bernal`,
        name: siteConfig.founder,
        jobTitle: founder?.role ?? "Fundador · Abogado litigante",
        image: `${siteConfig.url}${founder?.portrait ?? "/assets/juan-berley-leal-bernal.png"}`,
        worksFor: {
          "@id": `${siteConfig.url}/#organization`,
        },
        description: founder?.summary,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: "es-CO",
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
