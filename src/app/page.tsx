import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { ConsultationBrief } from "@/components/consultation-brief";
import { CtaBand } from "@/components/cta-band";
import { HeroDossier } from "@/components/hero-dossier";
import { ShieldIcon } from "@/components/icons";
import { ProcessSteps } from "@/components/process-steps";
import { SectionHeader } from "@/components/section-header";
import { companyPackages, enterpriseServices, practiceAreas, whatsappUrl } from "@/data/site";

const trustPoints = [
  { value: "18+", label: "años de experiencia asesorando personas, familias y empresas." },
  { value: "Ruta", label: "consulta, criterio jurídico y siguiente acción con alcance claro." },
  { value: "Doble", label: "enfoque para clientes naturales y soporte preventivo empresarial." },
];

const consultationOutcomes = [
  "Claridad sobre viabilidad",
  "Riesgos y tiempos probables",
  "Documentos necesarios",
  "Siguiente acción posible",
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 -z-10 legal-grid-dark opacity-95" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(180deg,rgba(7,7,7,0),#070707)]" />
        <div className="section-shell grid gap-12 py-16 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-8 h-px w-20 bg-brand-red" />
            <h1 className="font-serif text-5xl font-semibold leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
              Consulta jurídica clara para actuar con criterio.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
              Leal Abogados Compañía asesora y representa a personas, familias y empresas con una ruta legal seria:
              entender el caso, ordenar los documentos y decidir si conviene prevenir, reclamar, negociar o iniciar una acción.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink external href={whatsappUrl} variant="primary" eventLocation="hero-v2">
                Agendar consulta
              </ButtonLink>
              <ButtonLink href="/areas-de-practica" variant="ghost" className="border border-white/16 text-white hover:bg-white/8 hover:text-white">
                Ver áreas
              </ButtonLink>
            </div>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/50">
              Atención confidencial, comunicación clara y recomendaciones basadas en hechos, documentos y riesgo real.
            </p>
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
              description="El visitante debe identificar rápido si su caso encaja y avanzar hacia una consulta con información suficiente para filtrar mejor el asunto."
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
        <div className="absolute inset-y-0 right-0 w-[42%] bg-[url('/assets/legal-dossier-v2.svg')] bg-cover bg-center opacity-28" />
        <div className="absolute inset-y-0 right-0 w-2/3 bg-[linear-gradient(90deg,#070707,rgba(7,7,7,0.84),rgba(7,7,7,0.15))]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="mb-6 h-px w-16 bg-brand-red" />
            <h2 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              La consulta jurídica es el primer paso hacia la solución.
            </h2>
            <p className="mt-6 max-w-xl leading-8 text-white/66">
              Sirve para ordenar hechos, documentos y expectativas. También permite saber si el siguiente paso debe ser
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

      <ConsultationBrief />

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div className="overflow-hidden border border-ink/10 bg-ink">
            <Image
              alt="Dossier de estrategia jurídica para soporte preventivo empresarial"
              className="h-full min-h-[28rem] w-full object-cover"
              height={760}
              src="/assets/legal-dossier-v2.svg"
              width={980}
            />
          </div>
          <div>
            <div className="mb-6 h-px w-16 bg-brand-red" />
            <h2 className="font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Apoyo preventivo para empresas.
            </h2>
            <p className="mt-6 max-w-2xl leading-8 text-muted">
              Servicios pensados para reducir contingencias, ordenar documentación y acompañar decisiones laborales antes
              de que se vuelvan conflictos.
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
        text="Del primer mensaje al siguiente paso: estamos listos para escuchar el caso y acompañarlo con una estrategia adecuada."
      />
    </>
  );
}
