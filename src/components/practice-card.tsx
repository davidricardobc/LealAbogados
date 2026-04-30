import Link from "next/link";
import { ArrowRightIcon, ShieldIcon } from "@/components/icons";
import type { PracticeArea } from "@/data/site";

type PracticeCardProps = {
  area: PracticeArea;
  compact?: boolean;
};

export function PracticeCard({ area, compact = false }: PracticeCardProps) {
  return (
    <article className="group border border-ink/10 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-2xl hover:shadow-ink/8">
      <div className="flex items-start justify-between gap-5">
        <ShieldIcon className="h-7 w-7 shrink-0 text-brand-red" />
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/36">Area</span>
      </div>
      <h3 className="mt-7 font-serif text-2xl font-semibold text-ink">{area.title}</h3>
      <p className="mt-4 text-sm leading-7 text-muted">{area.summary}</p>
      {!compact ? (
        <ul className="mt-6 space-y-2">
          {area.signals.map((signal) => (
            <li className="flex gap-3 text-sm text-ink/74" key={signal}>
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-red" />
              {signal}
            </li>
          ))}
        </ul>
      ) : null}
      <Link
        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-red transition group-hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
        href={`/areas-de-practica#${area.slug}`}
      >
        Ver enfoque <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </article>
  );
}
