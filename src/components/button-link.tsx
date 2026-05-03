import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/icons";
import { conversionEvents, type ConversionEvent } from "@/lib/conversion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  external?: boolean;
  showArrow?: boolean;
  eventName?: ConversionEvent;
  eventLocation?: string;
  eventLabel?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-brand-red bg-brand-red text-white shadow-[0_18px_44px_rgba(166,46,46,0.28)] hover:bg-brand-redDark hover:shadow-[0_22px_54px_rgba(166,46,46,0.38)] active:translate-y-px",
  secondary:
    "border border-ink/15 bg-white text-ink hover:border-brand-red/50 hover:text-brand-red active:translate-y-px",
  ghost: "text-ink hover:bg-ink/5 hover:text-brand-red active:translate-y-px",
  dark:
    "border border-white/18 bg-white text-ink shadow-[0_18px_48px_rgba(0,0,0,0.24)] hover:border-brand-red hover:bg-brand-red hover:text-white active:translate-y-px",
};

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  external = false,
  showArrow = true,
  eventName,
  eventLocation,
  eventLabel,
}: ButtonLinkProps) {
  const inferredEvent = href.includes("wa.me")
    ? conversionEvents.whatsappClick
    : href === "/consulta-juridica"
      ? conversionEvents.consultationPageClick
      : undefined;
  const trackingEvent = eventName ?? inferredEvent;
  const resolvedLabel = eventLabel ?? (typeof children === "string" ? children : undefined);
  const sharedClassName = cn(
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold tracking-[0.01em] transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <ArrowRightIcon className="h-4 w-4 transition duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        className={sharedClassName}
        data-event={trackingEvent}
        data-event-label={resolvedLabel}
        data-event-location={eventLocation}
        href={href}
        rel="noreferrer"
        target="_blank"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      className={sharedClassName}
      data-event={trackingEvent}
      data-event-label={resolvedLabel}
      data-event-location={eventLocation}
      href={href}
    >
      {content}
    </Link>
  );
}
