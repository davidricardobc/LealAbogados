import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-6 lg:px-8">
      <div className="mx-auto mb-7 h-px w-16 bg-brand-red" />
      <h1 className="font-serif text-4xl font-semibold text-ink">Página no encontrada</h1>
      <p className="mt-5 text-muted">La ruta que intentas abrir no está disponible. Puedes volver al inicio o agendar una consulta.</p>
      <div className="mt-8 flex justify-center">
        <ButtonLink href="/">Volver al inicio</ButtonLink>
      </div>
    </section>
  );
}
