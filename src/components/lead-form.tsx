"use client";

import type { FormEvent } from "react";
import { practiceAreas, siteConfig } from "@/data/site";
import { conversionEvents } from "@/lib/conversion";

type LeadFormProps = {
  context: string;
};

const urgencyLabels: Record<string, string> = {
  inmediata: "Necesito orientación inmediata",
  "esta-semana": "Esta semana",
  preventiva: "Es preventivo, puedo programar",
};

const channelLabels: Record<string, string> = {
  whatsapp: "WhatsApp",
  reunion: "Reunión coordinada",
  correo: "Correo",
};

function getAttributionLines(context: string) {
  const lines = [`Origen interno: ${context}`];

  if (typeof window === "undefined") {
    return lines;
  }

  const params = new URLSearchParams(window.location.search);
  const source = params.get("utm_source");
  const medium = params.get("utm_medium");
  const campaign = params.get("utm_campaign");
  const term = params.get("utm_term");
  const content = params.get("utm_content");

  lines.push(`Página: ${window.location.pathname}`);

  if (source || medium || campaign) {
    lines.push(`Campaña: ${[source, medium, campaign].filter(Boolean).join(" / ")}`);
  }

  if (term) {
    lines.push(`Término: ${term}`);
  }

  if (content) {
    lines.push(`Contenido: ${content}`);
  }

  if (document.referrer) {
    lines.push(`Referencia: ${document.referrer}`);
  }

  return lines;
}

export function LeadForm({ context }: LeadFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const areaSlug = String(formData.get("practice_area") ?? "");
    const urgency = String(formData.get("urgency") ?? "");
    const preferredChannel = String(formData.get("preferred_channel") ?? "");
    const selectedArea = practiceAreas.find((area) => area.slug === areaSlug)?.title ?? areaSlug;
    const message = [
      "Hola, quiero agendar una consulta jurídica con Leal Abogados.",
      `Nombre: ${formData.get("name") || ""}`,
      `Teléfono: ${formData.get("phone") || ""}`,
      `Correo: ${formData.get("email") || "No indicado"}`,
      `Área del caso: ${selectedArea || "No indicada"}`,
      `Urgencia: ${urgencyLabels[urgency] ?? "No indicada"}`,
      `Canal preferido: ${channelLabels[preferredChannel] ?? "No indicado"}`,
      `Resumen: ${formData.get("case_summary") || ""}`,
      ...getAttributionLines(context),
    ].join("\n");

    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      className="border border-ink/10 bg-white p-5 shadow-2xl shadow-ink/8 sm:p-7"
      data-event="lead_form_view"
      data-crm-ready="true"
      data-form-context={context}
      onSubmit={handleSubmit}
    >
      <input name="lead_source" type="hidden" value={context} />
      <input name="utm_source" type="hidden" value="" />
      <input name="utm_medium" type="hidden" value="" />
      <input name="utm_campaign" type="hidden" value="" />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">Nombre</span>
          <input
            className="h-12 w-full border border-ink/12 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-brand-red"
            name="name"
            placeholder="Nombre completo"
            required
            type="text"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">Teléfono</span>
          <input
            className="h-12 w-full border border-ink/12 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-brand-red"
            name="phone"
            placeholder={siteConfig.phone}
            required
            type="tel"
          />
        </label>
        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm font-semibold text-ink">Correo electrónico</span>
          <input
            className="h-12 w-full border border-ink/12 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-brand-red"
            name="email"
            placeholder={siteConfig.email}
            type="email"
          />
        </label>
        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm font-semibold text-ink">Área del caso</span>
          <select
            className="h-12 w-full border border-ink/12 bg-white px-4 text-sm text-ink outline-none transition focus:border-brand-red"
            name="practice_area"
            required
          >
            <option value="">Selecciona una opción</option>
            {practiceAreas.map((area) => (
              <option key={area.slug} value={area.slug}>
                {area.title}
              </option>
            ))}
            <option value="empresa">Servicio empresarial</option>
            <option value="no-estoy-seguro">No estoy seguro</option>
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">Urgencia</span>
          <select
            className="h-12 w-full border border-ink/12 bg-white px-4 text-sm text-ink outline-none transition focus:border-brand-red"
            name="urgency"
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="inmediata">Necesito orientación inmediata</option>
            <option value="esta-semana">Esta semana</option>
            <option value="preventiva">Es preventivo, puedo programar</option>
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">Canal preferido</span>
          <select
            className="h-12 w-full border border-ink/12 bg-white px-4 text-sm text-ink outline-none transition focus:border-brand-red"
            name="preferred_channel"
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="reunion">Reunión coordinada</option>
            <option value="correo">Correo</option>
          </select>
        </label>
        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm font-semibold text-ink">Resumen breve</span>
          <textarea
            className="min-h-32 w-full resize-y border border-ink/12 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-brand-red"
            name="case_summary"
            placeholder="Cuéntanos qué ocurrió, qué necesitas decidir y si tienes soportes relacionados."
            required
          />
        </label>
      </div>
      <button
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-brand-red px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(166,46,46,0.22)] transition hover:bg-brand-redDark active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red sm:w-auto"
        data-event={conversionEvents.leadFormSubmit}
        data-event-label="Preparar mensaje de consulta"
        data-event-location={context}
        type="submit"
      >
        Preparar mensaje por WhatsApp
      </button>
      <p className="mt-4 text-xs leading-6 text-muted">
        Al continuar se abrirá WhatsApp con la información organizada para que la firma pueda revisar mejor el caso.
      </p>
    </form>
  );
}
