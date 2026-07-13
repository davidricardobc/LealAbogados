import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  inverse?: boolean;
  className?: string;
  imageClassName?: string;
};

export function Logo({ inverse = false, className, imageClassName }: LogoProps) {
  return (
    <Link
      className={cn(
        "group inline-flex overflow-hidden border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red",
        inverse
          ? "border-white/10 bg-black/70 shadow-[0_18px_44px_rgba(0,0,0,0.24)]"
          : "border-ink/10 bg-black shadow-[0_18px_44px_rgba(0,0,0,0.16)]",
        className,
      )}
      href="/"
    >
      <Image
        alt="Leal Abogados Compañía"
        className={cn("h-14 w-auto object-contain sm:h-16", imageClassName)}
        height={1402}
        priority
        src="/assets/leal-logo.png"
        width={1122}
      />
    </Link>
  );
}
