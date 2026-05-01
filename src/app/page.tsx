import { ButtonLink } from "@/components/button-link";
import { ConsultationBrief } from "@/components/consultation-brief";
import { CtaBand } from "@/components/cta-band";
import { PracticeCard } from "@/components/practice-card";
import { ProcessSteps } from "@/components/process-steps";
import { SectionHeader } from "@/components/section-header";
import { companyPackages, enterpriseServices, practiceAreas, whatsappUrl } from "@/data/site";

const trustPoints = [
  "Más de 18 años de experiencia",
  "Estrategia jurídica sólida",
  "Comunicación clara y transparente",
  "Atención confidencial",
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 -z-10 legal-grid opacity-50" />
        <div className="absolute right-0 top-0 -z-10 h-full w-1/2 bg-[linear-gradient(135deg,rgba(166,46,46,0.26),rgba(7,7,7,0)_52%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-8 h-px w-20 bg-brand-red" />
            <h1 className="font-serif text-5xl font-semibold leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
              Consulta jurídica clara para proteger derechos, patrimonio y tranquilidad.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">
              Leal Abogados Compañía asesora y representa a personas, familias y empresas con una ruta legal seria:
              primero se entiende el caso, luego se define si conviene prevenir, negociar, reclamar o iniciar una acción.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink external href={whatsappUrl} variant="dark">
                Agendar consulta jurídica
              </ButtonLink>
              <ButtonLink href="/areas-de-practica" variant="ghost" className="text-white hover:bg-white/8 hover:text-white">
                Ver áreas de práctica
              </ButtonLink>
            </div>
          </div>

          <div className="relative min-h-[28rem] border border-white/12 bg-white/[0.03] p-6 shadow-2xl shadow-black/30">
            <div className="absolute inset-x-6 top-6 h-px bg-white/12" />
            <div className="absolute bottom-6 left-6 top-6 w-px bg-white/12" />
            <div className="flex h-full flex-col justify-end">
              <p className="max-w-sm text-sm uppercase tracking-[0.3em] text-white/42">Método de entrada</p>
              <div className="mt-8 grid gap-3">
                {["Consulta", "Criterio", "Ruta legal", "Acción"].map((item, index) => (
                  <div className="grid grid-cols-[3rem_1fr] items-center border border-white/10 bg-inkSoft/80" key={item}>
                    <span className="flex h-14 items-center justify-center border-r border-white/10 font-serif text-xl text-brand-red">
                      0{index + 1}
                    </span>
                    <span className="px-5 text-lg font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 max-w-md text-sm leading-7 text-white/58">
                La consulta filtra el caso, aclara riesgos y permite escalar solo cuando existe una ruta jurídica razonable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/8 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-7 sm:px-6 md:grid-cols-4 lg:px-8">
          {trustPoints.map((point) => (
            <div className="border-l border-brand-red pl-4 text-sm font-semibold text-ink/72" key={point}>
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <SectionHeader
              title="Áreas donde la consulta evita decisiones costosas."
              description="Cada caso entra por un diagnóstico jurídico. Si hay base, se estructura la acción adecuada: tutela, proceso, trámite, reclamación o acompañamiento preventivo."
            />
            <p className="text-base leading-8 text-muted lg:pb-2">
              La web está pensada para que el cliente entienda rápido si su problema encaja y avance hacia una consulta con información suficiente para filtrar mejor el caso.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {practiceAreas.slice(0, 6).map((area) => (
              <PracticeCard area={area} compact key={area.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-smoke px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader
              title="La consulta es la puerta de entrada, no un paso menor."
              description="Sirve para ordenar hechos, documentos y expectativas. También permite saber si el siguiente paso debe ser preventivo, administrativo, judicial o empresarial."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink external href={whatsappUrl}>
                Agendar consulta
              </ButtonLink>
              <ButtonLink href="/consulta-juridica" variant="secondary">
                Ver proceso
              </ButtonLink>
            </div>
          </div>
          <div className="border border-ink/10 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Claridad sobre viabilidad",
                "Riesgos y tiempos probables",
                "Documentos necesarios",
                "Siguiente acción posible",
              ].map((item) => (
                <div className="min-h-32 border border-ink/8 p-5" key={item}>
                  <span className="block h-px w-10 bg-brand-red" />
                  <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
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

      <section className="bg-ink px-5 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <div className="mb-5 h-px w-16 bg-brand-red" />
            <h2 className="font-serif text-4xl font-semibold">Soporte jurídico preventivo para empresas.</h2>
            <p className="mt-5 leading-8 text-white/66">
              Servicios pensados para reducir contingencias, ordenar documentación y acompañar decisiones laborales antes de que se vuelvan conflictos.
            </p>
            <div className="mt-8">
              <ButtonLink href="/servicios-empresariales" variant="dark">
                Ver servicios empresariales
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {enterpriseServices.map((service) => (
              <article className="border border-white/12 bg-white/[0.03] p-5" key={service.title}>
                <h3 className="font-serif text-2xl font-semibold">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/62">{service.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Paquetes sugeridos para crecer sin perder control jurídico."
            description="Los paquetes funcionan como punto de partida para conversaciones empresariales de mayor valor y se ajustan según alcance, riesgo y recurrencia."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {companyPackages.map((pack) => (
              <article className="border border-ink/10 p-6 transition hover:border-brand-red/45" key={pack.name}>
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

      <CtaBand />
    </>
  );
}
