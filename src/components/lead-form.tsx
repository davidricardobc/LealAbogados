import { practiceAreas, siteConfig } from "@/data/site";
import { conversionEvents } from "@/lib/conversion";

type LeadFormProps = {
  context: string;
};

export function LeadForm({ context }: LeadFormProps) {
  return (
    <form
      action="#"
      className="border border-ink/10 bg-white p-5 shadow-2xl shadow-ink/8 sm:p-7"
      data-event="lead_form_view"
      data-crm-ready="true"
      data-form-context={context}
      method="post"
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
          <span className="text-sm font-semibold text-ink">Telefono</span>
          <input
            className="h-12 w-full border border-ink/12 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-brand-red"
            name="phone"
            placeholder={siteConfig.phone}
            required
            type="tel"
          />
        </label>
        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm font-semibold text-ink">Correo electronico</span>
          <input
            className="h-12 w-full border border-ink/12 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-brand-red"
            name="email"
            placeholder={siteConfig.email}
            type="email"
          />
        </label>
        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm font-semibold text-ink">Area del caso</span>
          <select
            className="h-12 w-full border border-ink/12 bg-white px-4 text-sm text-ink outline-none transition focus:border-brand-red"
            name="practice_area"
            required
          >
            <option value="">Selecciona una opcion</option>
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
            <option value="">Selecciona una opcion</option>
            <option value="inmediata">Necesito orientacion inmediata</option>
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
            <option value="">Selecciona una opcion</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="llamada">Llamada</option>
            <option value="correo">Correo</option>
          </select>
        </label>
        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm font-semibold text-ink">Resumen breve</span>
          <textarea
            className="min-h-32 w-full resize-y border border-ink/12 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-brand-red"
            name="case_summary"
            placeholder="Cuentanos que ocurrio, que necesitas decidir y si tienes documentos relacionados."
            required
          />
        </label>
      </div>
      <button
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-brand-red px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(166,46,46,0.22)] transition hover:bg-brand-redDark active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red sm:w-auto"
        data-event={conversionEvents.leadFormSubmit}
        data-event-label="Enviar solicitud de consulta"
        data-event-location={context}
        type="submit"
      >
        Enviar solicitud de consulta
      </button>
      <p className="mt-4 text-xs leading-6 text-muted">
        Formulario preparado para integracion futura con CRM, analitica y automatizaciones.
      </p>
    </form>
  );
}
