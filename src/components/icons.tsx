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

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path
        d="M8.7 5.2 10.4 9c.2.5.1 1.1-.3 1.4l-1 1c1.1 2.1 2.8 3.8 4.9 4.9l1-1c.4-.4 1-.5 1.5-.3l3.7 1.7c.5.2.8.7.7 1.3l-.4 2c-.1.6-.6 1-1.2 1A16.3 16.3 0 0 1 3 4.7c0-.6.4-1.1 1-1.2l2-.4c.6-.1 1.1.2 1.4.7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path
        d="M4.1 19.9 5.2 16A8.2 8.2 0 1 1 8 18.8l-3.9 1.1Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path
        d="M9.1 8.7c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.4.5c-.1.1-.2.3-.1.5.4.8 1.1 1.5 1.9 1.9.2.1.4 0 .5-.1l.5-.4c.2-.2.5-.2.7-.1l1.6.7c.3.1.4.3.4.6v.4c0 .3-.1.6-.4.8-.5.4-1.2.6-1.8.5-3.2-.5-5.9-3.2-6.4-6.4-.1-.6.1-1.3.5-1.8Z"
        fill="currentColor"
      />
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
