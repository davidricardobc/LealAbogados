# LealAbogados.co - fases de producto, arquitectura y UX

## Fase 1: Analisis del negocio

- Objetivo comercial principal: convertir visitas en consultas juridicas calificadas que puedan escalar a servicios de mayor valor.
- Tipo de usuario dominante: persona natural o decisor empresarial con un problema legal activo, riesgo preventivo o decision sensible.
- Accion principal: agendar una consulta juridica por WhatsApp o dejar informacion por formulario.
- Riesgos de conversion:
  - Mensaje demasiado institucional que no explique el siguiente paso.
  - Exceso de areas sin priorizar la consulta como entrada.
  - Falta de confianza si el sitio parece generico, antiguo o sin criterio.
  - Formularios extensos sin alternativa rapida por WhatsApp.
  - Promesas exageradas que reducen credibilidad juridica.
- Oportunidades de diferenciacion:
  - Posicionar la consulta como diagnostico estrategico.
  - Mostrar escalamiento claro: consulta, criterio, ruta y accion.
  - Unir personas y empresas bajo la idea de prevencion y estructura.
  - Usar una identidad sobria de alto contraste, mas firme que amigable.
  - Preparar formularios y datos para CRM, tracking y automatizacion.

## Fase 2: Arquitectura del sitio

- Sitemap:
  - Inicio
  - Areas de practica
  - Servicios empresariales
  - Consulta juridica
  - Contacto
- Navegacion:
  - Header con acceso directo a consulta y WhatsApp.
  - Footer con rutas principales y datos editables.
  - CTAs repetidos al final de paginas de decision.
- Jerarquia:
  - Home como narrativa comercial principal.
  - Consulta juridica como pagina de conversion.
  - Areas de practica como pagina de reconocimiento de problema.
  - Servicios empresariales como pagina de valor recurrente.
  - Contacto como cierre operativo.
- Flujo hacia conversion:
  - Usuario identifica su problema.
  - Entiende que la consulta es la entrada.
  - Ve que la consulta puede escalar a accion legal.
  - Decide entre WhatsApp rapido o formulario estructurado.

## Fase 3: Sistema de componentes

- `SiteHeader`: navegacion principal, CTA a consulta y WhatsApp.
  - Props principales: no requiere props; consume `navItems`.
- `SiteFooter`: cierre institucional, datos editables y rutas.
  - Props principales: no requiere props; consume `siteConfig`.
- `ButtonLink`: CTA reusable con variantes.
  - Props: `href`, `children`, `variant`, `external`, `showArrow`.
- `PageHero`: hero reusable para paginas internas.
  - Props: `title`, `description`, `primaryLabel`, `secondaryLabel`, `secondaryHref`.
- `SectionHeader`: encabezado editorial para secciones.
  - Props: `title`, `description`, `align`, `className`.
- `PracticeCard`: card de area de practica.
  - Props: `area`, `compact`.
- `CtaBand`: bloque fuerte de conversion.
  - Props: `title`, `text`, `dark`.
- `LeadForm`: formulario preparado para CRM.
  - Props: `context`.
- `ProcessSteps`: recorrido del cliente desde consulta hasta seguimiento.
  - Props: no requiere props; consume `journeySteps`.

## Fase 4: Diseno y UX

- Estilo visual:
  - Alto contraste con negro, blanco y rojo `#A62E2E`.
  - Composicion editorial, sobria y juridica.
  - Sin fotografias ni imagenes decorativas pesadas en esta version.
  - Uso de lineas, bordes, grillas sutiles y bloques tipograficos.
- Espaciado:
  - Secciones amplias entre `py-20` y `py-28`.
  - Contenedor maximo `max-w-7xl`.
  - Cards y formularios con padding consistente entre `p-5` y `p-7`.
- Tipografia:
  - Serif editorial para titulares.
  - Sans contemporanea para navegacion, formularios y copy operativo.
  - Sin escalado por viewport; tamanos responsive por breakpoints.
- Botones:
  - CTA primario rojo con sombra sobria.
  - CTA secundario blanco con borde.
  - Estado hover con cambio de color, sombra y pequeno desplazamiento.
  - Focus visible para accesibilidad.
- Microinteracciones:
  - Hover en cards con elevacion discreta.
  - Flechas de CTA con desplazamiento sutil.
  - Header sticky con blur ligero.
  - Respeto a `prefers-reduced-motion`.

## Fase 5: Implementacion entregada

- Stack:
  - Next.js App Router.
  - TypeScript.
  - Tailwind CSS.
  - React.
- Paginas:
  - Home.
  - Areas de practica.
  - Servicios empresariales.
  - Consulta juridica.
  - Contacto.
- SEO tecnico:
  - Metadata global y por pagina.
  - Open Graph.
  - Sitemap.
  - Robots.
  - Icono de marca.
- Conversion:
  - CTA principal a WhatsApp.
  - Formulario preparado para CRM.
  - Bloques de consulta, escalamiento y confianza.
  - Atributos `data-event` para tracking futuro.

## Fase 6: Base para crecimiento

- Integraciones futuras:
  - Google Tag Manager o Vercel Analytics.
  - CRM o base de leads.
  - Automatizacion de seguimiento.
  - Chatbot juridico con reglas de elegibilidad.
  - Blog SEO por area de practica.
  - Testimonios y casos anonimizados.
  - Dashboard interno de leads.
- Eventos sugeridos:
  - `whatsapp_click`.
  - `consultation_page_click`.
  - `lead_form_submit`.
- Campos sugeridos de lead:
  - `lead_source`.
  - `practice_area`.
  - `urgency`.
  - `preferred_channel`.
  - `case_summary`.
  - `utm_source`, `utm_medium`, `utm_campaign`.

## Fase 7: Chatbot laboral

- Primer asistente especializado: derecho laboral colombiano.
- Objetivo: orientar de forma general, calificar casos y llevar a consulta con abogado cuando corresponda.
- Alcance inicial:
  - Despido, liquidacion, prestaciones, acoso laboral, estabilidad laboral reforzada, contrato realidad, accidente o enfermedad laboral, jornada, salario y prevencion empresarial.
- Guardrails:
  - No reemplaza asesoria legal personalizada.
  - No garantiza resultados.
  - No inventa normas, plazos ni jurisprudencia.
  - Escala a abogado cuando hay urgencia, documentos, fechas, terminos, tutela, indemnizacion o estrategia.
- Flujo comercial:
  - Primero pregunta datos minimos para entender rol, hechos, fechas, ciudad, vinculacion y pruebas.
  - Luego entrega una orientacion inicial clara.
  - Antes de respuesta experta escrita, solicita consignacion de $10.000 COP por Nequi y comprobante por WhatsApp.
- Arquitectura:
  - Widget web.
  - API interna.
  - Prompt servidor.
  - Base de conocimiento curada.
  - Handoff a WhatsApp/n8n/CRM.
  - Eventos de medicion.
- Documento operativo: `docs/labor-chatbot-mvp.md`.
