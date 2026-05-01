import { ButtonLink } from "@/components/button-link";
import { whatsappUrl } from "@/data/site";

type CtaBandProps = {
  title?: string;
  text?: string;
  dark?: boolean;
};

export function CtaBand({
  title = "Antes de actuar, ordenemos el caso.",
  text = "La consulta jurídica permite entender hechos, riesgos y rutas posibles antes de invertir tiempo y dinero en una acción legal.",
  dark = true,
}: CtaBandProps) {
  return (
    <section className={dark ? "bg-ink text-white" : "bg-white text-ink"}>
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-5 h-px w-16 bg-brand-red" />
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{title}</h2>
          <p className={dark ? "mt-4 max-w-2xl leading-8 text-white/66" : "mt-4 max-w-2xl leading-8 text-muted"}>{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
          <ButtonLink external href={whatsappUrl} variant={dark ? "dark" : "primary"}>
            Agendar consulta
          </ButtonLink>
          <ButtonLink href="/consulta-juridica" variant={dark ? "ghost" : "secondary"} className={dark ? "text-white hover:bg-white/8 hover:text-white" : ""}>
            Como funciona
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
