import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { ConsultationBrief } from "@/components/consultation-brief";
import { CtaBand } from "@/components/cta-band";
import { HeroDossier } from "@/components/hero-dossier";
import { ShieldIcon } from "@/components/icons";
import { ProcessSteps } from "@/components/process-steps";
import { SectionHeader } from "@/components/section-header";
import { companyPackages, enterpriseServices, practiceAreas, teamProfiles, trustHighlights, valuePillars, whatsappUrl } from "@/data/site";

const trustPoints = [
  { value: "18 años", label: "de experiencia asesorando personas, familias y empresas." },
  { value: "Cobertura", label: "atención remota en toda Colombia con posibilidad de reuniones coordinadas según el caso." },
  { value: "Ágil", label: "diagnóstico, valoración y siguiente paso con respuesta rápida y ordenada." },
];

const consultationOutcomes = [
  "Claridad sobre viabilidad",
  "Riesgos y tiempos probables",
  "Soportes relevantes",
  "Siguiente acción posible",
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 -z-10 legal-grid-dark opacity-88" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(180deg,rgba(7,7,7,0),#070707)]" />
        <div className="section-shell grid gap-10 py-14 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
          <div className="min-w-0 max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-white/54">Leal Abogados Compañía</p>
            <div className="mb-6 h-px w-16 bg-brand-red sm:w-20" />
            <h1 className="max-w-3xl text-balance font-serif text-3xl font-semibold leading-[1.04] tracking-normal sm:text-5xl lg:text-7xl">
              Atención jurídica ágil para actuar con criterio en toda Colombia.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
              Acompañamos a personas, familias y empresas con una ruta legal seria y ágil: entender el caso, valorar la situación y definir desde cualquier lugar del país, con atención remota y reuniones coordinadas cuando se requiera, si conviene prevenir, reclamar, negociar o iniciar una acción.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink external href={whatsappUrl} variant="primary" eventLocation="hero-v2">
                Agendar consulta
              </ButtonLink>
              <ButtonLink href="/consulta-juridica" variant="ghost" className="border border-white/16 text-white hover:bg-white/8 hover:text-white">
                Cómo funciona
              </ButtonLink>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/64">
              {trustHighlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <HeroDossier />
        </div>

        <div className="border-y border-white/10 bg-black/34 backdrop-blur-md">
          <div className="section-shell grid gap-0 md:grid-cols-3">
            {trustPoints.map((point) => (
              <div className="border-white/10 py-7 md:border-r md:px-8 first:md:pl-0 last:md:border-r-0" key={point.value}>
                <p className="font-serif text-4xl font-semibold text-white">{point.value}</p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-white/58">{point.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <SectionHeader
              title="Áreas de práctica que empiezan por una consulta bien hecha."
            description="El visitante debe identificar rápido si su caso encaja y avanzar hacia una consulta con información suficiente para valorar el asunto con criterio."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {practiceAreas.slice(0, 6).map((area) => (
                <a
                  className="group border-l border-ink/12 px-5 py-4 transition hover:border-brand-red"
                  href={`/areas-de-practica#${area.slug}`}
                  key={area.slug}
                >
                  <ShieldIcon className="h-7 w-7 text-brand-red" />
                  <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{area.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{area.summary}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-brand-red transition group-hover:translate-x-1">
                    Ver enfoque
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink px-5 py-20 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-y-0 right-0 w-[42%] bg-[url('/assets/leal-enterprise-consulting.png')] bg-cover bg-center opacity-28" />
        <div className="absolute inset-y-0 right-0 w-2/3 bg-[linear-gradient(90deg,#070707,rgba(7,7,7,0.84),rgba(7,7,7,0.15))]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="mb-6 h-px w-16 bg-brand-red" />
            <h2 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              La consulta jurídica es el primer paso hacia la solución.
            </h2>
            <p className="mt-6 max-w-xl leading-8 text-white/66">
              Sirve para ordenar hechos, soportes y expectativas. También permite saber si el siguiente paso debe ser
              preventivo, administrativo, judicial o empresarial.
            </p>
            <div className="mt-8">
              <ButtonLink external href={whatsappUrl} variant="dark" eventLocation="consultation-band-v2">
                Agendar consulta
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {consultationOutcomes.map((item) => (
              <article className="premium-panel min-h-36 p-6" key={item}>
                <span className="block h-px w-10 bg-brand-red" />
                <h3 className="mt-6 font-serif text-2xl font-semibold">{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-smoke px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            align="center"
            title="Un recorrido legal con menos improvisación."
            description="El objetivo no es empujar todos los casos a litigio. Es decidir con estructura qué camino conviene y cuándo vale la pena escalar."
          />
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Una firma que combina litigio, criterio y atención jurídica bien estructurada."
            description="Tomamos del perfil de la firma lo que más construye confianza: trayectoria real, liderazgo visible y una forma de trabajo clara para acompañar casos en toda Colombia, de forma remota o con encuentros coordinados cuando haga falta."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-6 md:grid-cols-2">
              {teamProfiles.map((profile) => (
                <article className="border border-ink/10 bg-white p-7 shadow-[0_24px_70px_rgba(7,7,7,0.05)]" key={profile.name}>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">{profile.role}</p>
                  <h3 className="mt-4 font-serif text-3xl font-semibold text-ink">{profile.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{profile.summary}</p>
                  <ul className="mt-6 space-y-3">
                    {profile.highlights.map((item) => (
                      <li className="flex gap-3 text-sm text-ink/76" key={item}>
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-red" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="border border-ink/10 bg-smoke p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">Lo que sostiene la marca</p>
              <h3 className="mt-4 font-serif text-3xl font-semibold text-ink">Compromiso, estrategia y confianza.</h3>
              <div className="mt-8 space-y-5">
                {valuePillars.map((item) => (
                  <article className="border-t border-ink/10 pt-5" key={item.title}>
                    <h4 className="font-serif text-2xl font-semibold text-ink">{item.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConsultationBrief />

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div className="overflow-hidden border border-ink/10 bg-ink">
            <Image
              alt="Dossier de estrategia jurídica para soporte preventivo empresarial"
              className="h-full min-h-[28rem] w-full object-cover"
              height={760}
              src="/assets/leal-enterprise-consulting.png"
              width={980}
            />
          </div>
          <div>
            <div className="mb-6 h-px w-16 bg-brand-red" />
            <h2 className="font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Apoyo preventivo para empresas en cualquier lugar de Colombia.
            </h2>
            <p className="mt-6 max-w-2xl leading-8 text-muted">
              Servicios pensados para reducir contingencias, respaldar decisiones laborales y acompañar situaciones sensibles con atención remota y reuniones coordinadas cuando la operación lo necesite.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {enterpriseServices.map((service) => (
                <article className="border-t border-ink/12 pt-5" key={service.title}>
                  <h3 className="font-serif text-2xl font-semibold text-ink">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{service.summary}</p>
                </article>
              ))}
            </div>
            <div className="mt-9">
              <ButtonLink href="/servicios-empresariales" variant="secondary">
                Ver servicios empresariales
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-smoke px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Paquetes sugeridos para crecer sin perder control jurídico."
            description="Los paquetes funcionan como punto de partida para conversaciones empresariales de mayor valor y se ajustan según alcance, riesgo y recurrencia."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {companyPackages.map((pack) => (
              <article className="border border-ink/10 bg-white p-7 shadow-[0_24px_70px_rgba(7,7,7,0.06)] transition hover:-translate-y-1 hover:border-brand-red/45" key={pack.name}>
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
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Cada decisión legal cuenta. Hablemos."
        text="Desde el primer mensaje, la firma puede orientar el caso de forma remota, rápida y estratégica en cualquier lugar de Colombia, con posibilidad de encuentros coordinados cuando se requiera."
      />
    </>
  );
}
