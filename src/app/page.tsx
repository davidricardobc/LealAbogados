import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { ConsultationBrief } from "@/components/consultation-brief";
import { CtaBand } from "@/components/cta-band";
import { ShieldIcon } from "@/components/icons";
import { Reveal, RevealFrame, Stagger, StaggerItem } from "@/components/motion-primitives";
import { ProcessSteps } from "@/components/process-steps";
import { SectionHeader } from "@/components/section-header";
import { companyPackages, enterpriseServices, practiceAreas, whatsappLinks } from "@/data/site";

const trustPoints = [
  { value: "18 años", label: "de experiencia en asesoría, litigio y acompañamiento jurídico." },
  { value: "Casos ganados", label: "trayectoria defendiendo derechos e intereses de clientes reales." },
  { value: "Colombia", label: "atención remota con reuniones coordinadas cuando el caso lo exige." },
];

const consultationOutcomes = [
  "Claridad sobre viabilidad",
  "Riesgos y tiempos probables",
  "Soportes relevantes",
  "Siguiente acción posible",
];

const proofMarkers = [
  "Litigio y prevención",
  "Familia, laboral, civil y empresas",
  "Consulta remota o coordinada",
];

export default function Home() {
  return (
    <>
      <section className="relative isolate min-h-[calc(86svh-4.75rem)] overflow-hidden bg-ink text-white sm:min-h-[calc(84svh-5rem)]">
        <Image
          alt="Firma de documentos legales en una oficina sobria"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[62%_center] sm:object-center"
          fill
          priority
          sizes="100vw"
          src="/assets/leal-hero-editorial-v3.png"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,7,7,0.86)_0%,rgba(7,7,7,0.78)_48%,rgba(7,7,7,0.62)_100%)] sm:bg-[linear-gradient(90deg,#070707_0%,rgba(7,7,7,0.94)_28%,rgba(7,7,7,0.62)_58%,rgba(7,7,7,0.12)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-[linear-gradient(180deg,rgba(7,7,7,0),#070707)]" />
        <div className="section-shell flex min-h-[calc(86svh-4.75rem)] items-center py-12 sm:min-h-[calc(84svh-5rem)] md:py-20">
          <Reveal className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/62 sm:tracking-[0.28em]">Leal Abogados Compañía</p>
            <div className="mb-7 h-px w-20 bg-brand-red" />
            <h1 className="max-w-3xl text-balance font-serif text-[2.85rem] font-semibold leading-[0.98] tracking-normal sm:text-6xl lg:text-7xl">
              Defensa legal con criterio, firmeza y estrategia.
            </h1>
            <p className="mt-7 max-w-xl text-[1.05rem] leading-8 text-white/78 sm:text-lg sm:leading-8">
              Consulta jurídica seria para decidir si conviene reclamar, negociar, prevenir o iniciar una acción.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink external href={whatsappLinks.consultation} variant="primary" eventLocation="hero-v2">
                Agendar consulta
              </ButtonLink>
            </div>
            <Stagger className="mt-9 flex max-w-2xl flex-wrap gap-x-6 gap-y-3 text-sm text-white/64" delay={0.18}>
              {proofMarkers.map((item) => (
                <StaggerItem key={item}>
                  <span>{item}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>

        <div className="border-y border-white/10 bg-black/44 backdrop-blur-md">
          <Stagger className="section-shell grid gap-0 md:grid-cols-3">
            {trustPoints.map((point) => (
              <StaggerItem className="border-white/10 py-8 md:border-r md:px-9 first:md:pl-0 last:md:border-r-0" key={point.value}>
                <div>
                  <p className="font-serif text-3xl font-semibold text-white sm:text-4xl">{point.value}</p>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-white/58">{point.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">Consulta inicial</p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Primero entendemos el caso. Luego definimos la ruta.
            </h2>
            <p className="mt-6 max-w-lg leading-8 text-muted">
              La consulta no es un trámite. Es el filtro para ordenar hechos, medir riesgos y actuar con intención.
            </p>
            <div className="mt-8">
              <ButtonLink external href={whatsappLinks.consultation} variant="secondary" eventLocation="home-consulta-editorial">
                Agendar consulta
              </ButtonLink>
            </div>
          </Reveal>
          <div>
            <RevealFrame className="relative mb-12 overflow-hidden bg-ink">
              <Image
                alt="Consulta jurídica estratégica con documentos organizados"
                className="aspect-[4/3] w-full object-cover"
                height={1086}
                loading="eager"
                src="/assets/leal-consultation-editorial-v3.png"
                width={1448}
              />
            </RevealFrame>
            <Stagger className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
              {practiceAreas.slice(0, 6).map((area) => (
                <StaggerItem key={area.slug}>
                  <a
                    className="group block border-t border-ink/12 pt-6 transition hover:border-brand-red"
                    href={`/areas-de-practica#${area.slug}`}
                  >
                    <ShieldIcon className="h-7 w-7 text-brand-red" />
                    <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{area.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{area.escalation}</p>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink px-5 py-24 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-y-0 right-0 w-[52%] bg-[url('/assets/leal-enterprise-prevention-v2.png')] bg-cover bg-center opacity-22" />
        <div className="absolute inset-y-0 right-0 w-3/4 bg-[linear-gradient(90deg,#070707,rgba(7,7,7,0.9),rgba(7,7,7,0.18))]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <div className="mb-6 h-px w-16 bg-brand-red" />
            <h2 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Menos ruido. Más ruta legal.
            </h2>
            <p className="mt-6 max-w-xl leading-8 text-white/66">
              Una buena consulta separa lo urgente de lo importante y convierte un problema disperso en próximos pasos.
            </p>
            <div className="mt-8">
              <ButtonLink external href={whatsappLinks.consultation} variant="dark" eventLocation="consultation-band-v2">
                Agendar consulta
              </ButtonLink>
            </div>
          </Reveal>
          <Stagger className="grid gap-4 sm:grid-cols-2" delay={0.08}>
            {consultationOutcomes.map((item) => (
              <StaggerItem key={item}>
                <article className="premium-panel min-h-36 p-7">
                  <span className="block h-px w-10 bg-brand-red" />
                  <h3 className="mt-6 font-serif text-2xl font-semibold">{item}</h3>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-smoke px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader
              align="center"
              title="Un proceso claro para actuar sin improvisar."
              description="Diagnóstico, estrategia y acción. No todos los casos deben litigarse; todos deben entenderse bien antes de escalar."
            />
            <div className="mt-12">
              <ProcessSteps />
            </div>
          </Reveal>
        </div>
      </section>

      <ConsultationBrief />

      <section className="bg-white px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <RevealFrame className="overflow-hidden border border-ink/10 bg-ink">
            <Image
              alt="Dossier de estrategia jurídica para soporte preventivo empresarial"
              className="h-full min-h-[28rem] w-full object-cover"
              height={760}
              src="/assets/leal-enterprise-prevention-v2.png"
              width={980}
            />
          </RevealFrame>
          <Reveal>
            <div className="mb-6 h-px w-16 bg-brand-red" />
            <h2 className="font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Prevención jurídica para empresas que necesitan decidir bien.
            </h2>
            <p className="mt-6 max-w-2xl leading-8 text-muted">
              Acompañamiento laboral y empresarial para reducir contingencias, documentar decisiones y actuar antes de que el conflicto escale.
            </p>
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
              {enterpriseServices.map((service) => (
                <StaggerItem key={service.title}>
                  <article className="border-t border-ink/12 pt-5">
                    <h3 className="font-serif text-2xl font-semibold text-ink">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{service.summary}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-9">
              <ButtonLink href="/servicios-empresariales" variant="secondary">
                Ver servicios empresariales
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-smoke px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader
              title="Planes empresariales como punto de partida."
              description="Se ajustan según alcance, riesgo y recurrencia. La conversación empieza por el diagnóstico."
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {companyPackages.map((pack) => (
              <StaggerItem key={pack.name}>
                <article className="border border-ink/10 bg-white p-7 shadow-[0_24px_70px_rgba(7,7,7,0.06)] transition hover:-translate-y-1 hover:border-brand-red/45">
                  <h3 className="font-serif text-2xl font-semibold text-ink">{pack.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{pack.fit}</p>
                  <ul className="mt-6 space-y-3">
                    {pack.includes.map((item) => (
                      <li className="border-t border-ink/8 pt-3 text-sm text-ink/72" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        title="Cada decisión legal cuenta. Hablemos."
        text="Desde el primer mensaje, la firma puede orientar el caso de forma remota, rápida y estratégica en cualquier lugar de Colombia, con posibilidad de encuentros coordinados cuando se requiera."
      />
    </>
  );
}
