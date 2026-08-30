import type { Metadata } from "next";
import Script from "next/script";
import { LaborChatWidget } from "@/components/labor-chat-widget";
import { MobileContactBar } from "@/components/mobile-contact-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { siteConfig } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Leal Abogados | Abogados en Colombia y consulta jurídica estratégica",
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
    "abogado de familia Colombia",
    "abogado laboral Colombia",
    "abogados para empresas Colombia",
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
    title: "Leal Abogados | Abogados en Colombia y consulta jurídica estratégica",
    description: siteConfig.description,
    images: [
      {
        url: "/assets/leal-og-launch.png",
        width: 1200,
        height: 630,
        alt: "Consulta jurídica estratégica de Leal Abogados Compañía",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leal Abogados | Abogados en Colombia y consulta jurídica estratégica",
    description: siteConfig.description,
    images: ["/assets/leal-og-launch.png"],
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
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yao7gausnp");
          `}
        </Script>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <LaborChatWidget />
        <MobileContactBar />
      </body>
    </html>
  );
}
