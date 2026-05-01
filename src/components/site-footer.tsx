import Link from "next/link";
import { Logo } from "@/components/logo";
import { navItems, siteConfig, whatsappUrl } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="[&_span]:text-white">
            <Logo />
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/68">
            Firma jurídica colombiana con más de 18 años de experiencia en asesoría, representación y prevención legal.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/48">Navegación</h2>
          <ul className="mt-5 space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="text-sm text-white/72 transition hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/48">Contacto</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/72">
            <li>{siteConfig.phone}</li>
            <li>{siteConfig.email}</li>
            <li>{siteConfig.address}</li>
            <li>
              <a className="text-white underline decoration-brand-red underline-offset-4" href={whatsappUrl} rel="noreferrer" target="_blank">
                Agendar consulta por WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-white/44 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>&copy; {new Date().getFullYear()} Leal Abogados. Todos los derechos reservados.</p>
          <p>La información del sitio es orientativa y no sustituye asesoría jurídica personalizada.</p>
        </div>
      </div>
    </footer>
  );
}
