import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { Logo } from "@/components/logo";
import { MenuIcon } from "@/components/icons";
import { navItems, whatsappUrl } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Navegacion principal" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              className="text-sm font-medium text-ink/72 transition hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/consulta-juridica" variant="secondary">
            Ver consulta
          </ButtonLink>
          <ButtonLink external href={whatsappUrl}>
            WhatsApp
          </ButtonLink>
        </div>

        <details className="group relative lg:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-sm border border-ink/15 text-ink transition hover:border-brand-red hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red">
            <span className="sr-only">Abrir menu</span>
            <MenuIcon className="h-5 w-5" />
          </summary>
          <div className="absolute right-0 mt-3 w-[min(88vw,22rem)] border border-ink/10 bg-white p-3 shadow-2xl shadow-ink/15">
            <nav className="flex flex-col" aria-label="Navegacion movil">
              {navItems.map((item) => (
                <Link
                  className="border-b border-ink/8 px-3 py-3 text-sm font-medium text-ink transition hover:bg-ink/5 hover:text-brand-red"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
              <ButtonLink className="mt-3 w-full" external href={whatsappUrl}>
                Agendar por WhatsApp
              </ButtonLink>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
