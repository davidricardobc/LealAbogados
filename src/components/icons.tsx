import type { SVGProps } from "react";

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path
        d="M5 12h13m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path
        d="M12 3 19 6v5.6c0 4.4-2.8 7.8-7 9.4-4.2-1.6-7-5-7-9.4V6l7-3Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path d="m9 12 2 2 4-5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

export function MarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true" fill="none" {...props}>
      <path d="M22 3 37 10v12c0 9-6.2 15.8-15 19-8.8-3.2-15-10-15-19V10L22 3Z" fill="currentColor" />
      <path d="M14 29h17" stroke="white" strokeLinecap="round" strokeWidth="2" />
      <path d="M18 15v14M18 15h8c3 0 5 1.9 5 4.6 0 2.7-2 4.6-5 4.6h-8" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
