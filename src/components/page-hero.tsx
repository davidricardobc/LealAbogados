import { ButtonLink } from "@/components/button-link";
import { whatsappUrl } from "@/data/site";

type PageHeroProps = {
  title: string;
  description: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function PageHero({
  title,
  description,
  primaryLabel = "Agendar consulta",
  secondaryLabel = "Contactar",
  secondaryHref = "/contacto",
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10 legal-grid-dark opacity-70" />
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-2/3 bg-[linear-gradient(110deg,rgba(7,7,7,0),rgba(166,46,46,0.18),rgba(7,7,7,0.72))] lg:block" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.82fr_0.62fr] lg:px-8 lg:py-24">
        <div className="min-w-0 max-w-4xl">
          <div className="mb-6 h-px w-16 bg-brand-red sm:w-20" />
          <h1 className="max-w-4xl text-balance font-serif text-3xl font-semibold leading-[1.06] tracking-normal sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink external href={whatsappUrl} variant="primary">
              {primaryLabel}
            </ButtonLink>
            <ButtonLink href={secondaryHref} variant="ghost" className="text-white hover:bg-white/8 hover:text-white">
              {secondaryLabel}
            </ButtonLink>
          </div>
        </div>
        <div className="hidden min-h-64 border border-white/12 bg-[url('/assets/leal-editorial-accent.png')] bg-cover bg-center shadow-[0_34px_90px_rgba(0,0,0,0.36)] lg:block" />
      </div>
    </section>
  );
}
