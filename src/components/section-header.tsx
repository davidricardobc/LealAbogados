import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({ title, description, align = "left", className }: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <div className={cn("mb-5 h-px w-16 bg-brand-red", align === "center" && "mx-auto")} />
      <h2 className="font-serif text-3xl font-semibold tracking-normal text-ink sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-muted sm:text-lg">{description}</p> : null}
    </div>
  );
}
