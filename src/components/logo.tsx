import Image from "next/image";
import Link from "next/link";
import { MarkIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type LogoProps = {
  inverse?: boolean;
};

export function Logo({ inverse = false }: LogoProps) {
  if (inverse) {
    return (
      <Link
        className="group inline-flex overflow-hidden border border-white/10 bg-black/70 shadow-[0_18px_44px_rgba(0,0,0,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
        href="/"
      >
        <Image
          alt="Leal Abogados Compañía"
          className="h-14 w-auto object-contain sm:h-16"
          height={1254}
          priority
          src="/assets/leal-logo.png"
          width={1254}
        />
      </Link>
    );
  }

  return (
    <Link className="group flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red" href="/">
      <MarkIcon className="h-10 w-10 text-brand-red transition duration-200 group-hover:text-brand-redDark" />
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif text-xl font-semibold tracking-wide", inverse ? "text-white" : "text-ink")}>Leal</span>
        <span className={cn("text-[0.67rem] font-semibold uppercase tracking-[0.28em]", inverse ? "text-white/52" : "text-muted")}>
          Abogados
        </span>
      </span>
    </Link>
  );
}
