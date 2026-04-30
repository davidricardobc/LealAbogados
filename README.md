# LealAbogados.co

Primera version profesional del sitio de Leal Abogados: una base Next.js orientada a conversion de consultas juridicas, autoridad de marca y escalamiento a servicios legales de mayor valor.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- SEO base con metadata, Open Graph, sitemap y robots

## Instalacion

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

Abre `http://localhost:3000`.

Si el puerto `3000` ya esta ocupado:

```bash
npm run dev -- --port 3001
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Estructura

```text
src/
  app/
    page.tsx
    areas-de-practica/
    consulta-juridica/
    servicios-empresariales/
    contacto/
    sitemap.ts
    robots.ts
  components/
  data/
  lib/
docs/
  product-architecture.md
```

## Contenido editable

Los datos principales de marca, telefono, correo, WhatsApp, areas de practica, servicios empresariales y paquetes estan en:

```text
src/data/site.ts
```

Tambien desde ese archivo puedes editar:

- Areas de practica.
- Servicios empresariales.
- Paquetes sugeridos.
- Checklist de preparacion de consulta.
- Posibles rutas de escalamiento.
- Principios de confianza.

## Formularios y crecimiento

Los formularios quedan preparados con nombres de campos estables y atributos `data-crm-ready` / `data-form-context` para una futura integracion con CRM, analitica, automatizaciones, atribucion de leads o A/B testing.

Eventos disponibles para tracking:

```text
whatsapp_click
consultation_page_click
lead_form_submit
```

Los CTAs usan atributos `data-event`, `data-event-label` y `data-event-location`. El formulario incluye campos ocultos para `utm_source`, `utm_medium` y `utm_campaign`.

## Checklist antes de publicar

1. Cambiar telefono, WhatsApp, correo y ciudad en `src/data/site.ts`.
2. Revisar copy legal definitivo con el equipo juridico.
3. Conectar el formulario a CRM, email o automatizacion.
4. Instalar analitica y conversion tracking.
5. Configurar dominio y revisar Open Graph.
6. Ejecutar `npm run lint`, `npm run build` y `npm audit --audit-level=moderate`.

## Deploy en Vercel

1. Sube el proyecto a GitHub.
2. En Vercel, crea un nuevo proyecto desde el repositorio.
3. Framework preset: `Next.js`.
4. Build command: `npm run build`.
5. Output: automatico para Next.js.
6. Configura el dominio `lealabogados.co`.

Antes de publicar, actualiza los placeholders de contacto en `src/data/site.ts`.
