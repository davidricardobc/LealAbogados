import type { Metadata } from "next";
import { MobileContactBar } from "@/components/mobile-contact-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { siteConfig } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Leal Abogados | Consulta jurídica estratégica en Colombia",
    template: "%s | Leal Abogados",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "abogados Colombia",
    "consulta jurídica",
    "derecho laboral",
    "tutela",
    "familia",
    "sucesiones",
    "derecho civil",
    "servicios jurídicos empresas",
    "prevención laboral empresarial",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Leal Abogados | Consulta jurídica estratégica",
    description: siteConfig.description,
    images: [
      {
        url: "/assets/leal-hero-logo-original.png",
        width: 1448,
        height: 1086,
        alt: "Dossier jurídico de Leal Abogados Compañía",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leal Abogados | Consulta jurídica estratégica",
    description: siteConfig.description,
    images: ["/assets/leal-hero-logo-original.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO">
      <body>
        <StructuredData />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileContactBar />
      </body>
    </html>
  );
}
