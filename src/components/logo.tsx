import Link from "next/link";
import { MarkIcon } from "@/components/icons";

export function Logo() {
  return (
    <Link className="group flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red" href="/">
      <MarkIcon className="h-10 w-10 text-brand-red transition duration-200 group-hover:text-brand-redDark" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl font-semibold tracking-wide text-ink">Leal</span>
        <span className="text-[0.67rem] font-semibold uppercase tracking-[0.28em] text-muted">Abogados</span>
      </span>
    </Link>
  );
}
