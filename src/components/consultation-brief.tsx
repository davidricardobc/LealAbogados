import { consultationChecklist, escalationPaths, trustPrinciples } from "@/data/site";

export function ConsultationBrief() {
  return (
    <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <div className="mb-5 h-px w-16 bg-brand-red" />
          <h2 className="font-serif text-3xl font-semibold tracking-normal text-ink sm:text-4xl lg:text-5xl">
            Una consulta mejor preparada filtra mejor el caso.
          </h2>
          <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
            La web debe ayudar a que el cliente llegue con informacion util. Esto reduce friccion, mejora la calidad del lead y permite orientar con mas criterio.
          </p>
          <div className="mt-8 border border-ink/10 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/46">Criterios de confianza</h3>
            <ul className="mt-5 space-y-3">
              {trustPrinciples.map((principle) => (
                <li className="flex gap-3 text-sm text-ink/74" key={principle}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-red" />
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="border border-ink/10 bg-smoke p-5 sm:p-6">
            <h3 className="font-serif text-2xl font-semibold text-ink">Que preparar antes de escribir</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {consultationChecklist.map((item) => (
                <article className="bg-white p-5" key={item.title}>
                  <span className="block h-px w-10 bg-brand-red" />
                  <h4 className="mt-5 font-serif text-xl font-semibold text-ink">{item.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="border border-ink/10 bg-ink p-5 text-white sm:p-6">
            <h3 className="font-serif text-2xl font-semibold">A que puede escalar</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {escalationPaths.map((item) => (
                <article className="border border-white/12 bg-white/[0.03] p-5" key={item.title}>
                  <span className="block h-px w-10 bg-brand-red" />
                  <h4 className="mt-5 font-serif text-xl font-semibold">{item.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-white/62">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
