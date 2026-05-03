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
      <div className="absolute inset-0 -z-10 legal-grid-dark opacity-80" />
      <div className="absolute inset-y-0 right-0 -z-10 w-2/3 bg-[linear-gradient(110deg,rgba(7,7,7,0),rgba(166,46,46,0.18),rgba(7,7,7,0.72))]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.82fr_0.62fr] lg:px-8 lg:py-24">
        <div className="max-w-4xl">
          <div className="mb-7 h-px w-20 bg-brand-red" />
          <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-normal sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">{description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink external href={whatsappUrl} variant="dark">
              {primaryLabel}
            </ButtonLink>
            <ButtonLink href={secondaryHref} variant="ghost" className="text-white hover:bg-white/8 hover:text-white">
              {secondaryLabel}
            </ButtonLink>
          </div>
        </div>
        <div className="hidden min-h-64 border border-white/12 bg-[url('/assets/legal-dossier-v2.svg')] bg-cover bg-center shadow-[0_34px_90px_rgba(0,0,0,0.36)] lg:block" />
      </div>
    </section>
  );
}
