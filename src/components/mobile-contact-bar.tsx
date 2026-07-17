import { MailIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig, whatsappUrl } from "@/data/site";
import { conversionEvents } from "@/lib/conversion";

const emailHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  "Consulta jurídica - Leal Abogados",
)}&body=${encodeURIComponent("Hola, quiero recibir orientación jurídica sobre mi caso.")}`;

export function MobileContactBar() {
  return (
    <>
      <div className="h-[4.75rem] md:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-white/96 px-4 py-3 shadow-[0_-18px_44px_rgba(7,7,7,0.16)] backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
          <a
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-ink/14 bg-white px-4 text-sm font-semibold text-ink transition active:translate-y-px"
            data-event={conversionEvents.emailClick}
            data-event-label="Correo"
            data-event-location="mobile-sticky"
            href={emailHref}
          >
            <MailIcon className="h-4 w-4" />
            <span>Correo</span>
          </a>
          <a
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-brand-red bg-brand-red px-4 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(166,46,46,0.24)] transition active:translate-y-px"
            data-event={conversionEvents.whatsappClick}
            data-event-label="WhatsApp"
            data-event-location="mobile-sticky"
            href={whatsappUrl}
            rel="noreferrer"
            target="_blank"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}
