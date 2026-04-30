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
      <div className="absolute inset-y-0 right-0 -z-10 w-1/2 border-l border-white/8 bg-[linear-gradient(135deg,rgba(166,46,46,0.18),transparent_42%)]" />
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
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
      </div>
    </section>
  );
}
