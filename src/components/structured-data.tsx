import { practiceAreas, siteConfig, teamProfiles } from "@/data/site";

export function StructuredData() {
  const founder = teamProfiles[0];
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
        founder: {
          "@id": `${siteConfig.url}/quienes-somos#juan-berley-leal-bernal`,
        },
        sameAs: [siteConfig.instagram].filter(Boolean),
      },
      {
        "@type": "LegalService",
        "@id": `${siteConfig.url}/#legal-service`,
        name: siteConfig.name,
        url: siteConfig.url,
        image: `${siteConfig.url}/assets/leal-hero-logo-original.png`,
        description: siteConfig.description,
        areaServed: {
          "@type": "Country",
          name: "Colombia",
        },
        availableLanguage: ["es-CO"],
        telephone: siteConfig.phone,
        email: siteConfig.email,
        parentOrganization: {
          "@id": `${siteConfig.url}/#organization`,
        },
        serviceType: practiceAreas.map((area) => area.title),
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/quienes-somos#juan-berley-leal-bernal`,
        name: siteConfig.founder,
        jobTitle: founder?.role ?? "Fundador · Abogado litigante",
        image: `${siteConfig.url}/assets/juan-berley-leal-bernal-oficial.png`,
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
