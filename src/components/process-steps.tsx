import { journeySteps } from "@/data/site";

export function ProcessSteps() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {journeySteps.map((step) => (
        <article className="border-l border-ink/12 bg-white px-5 py-6 transition hover:border-brand-red" key={step.title}>
          <h3 className="font-serif text-xl font-semibold text-ink">{step.title}</h3>
          <p className="mt-4 text-sm leading-7 text-muted">{step.text}</p>
        </article>
      ))}
    </div>
  );
}
