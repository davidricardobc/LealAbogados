# Chatbot laboral MVP

## Vision CEO

El chatbot debe convertir visitas frias en consultas juridicas laborales calificadas.
No debe reemplazar al abogado, ni prometer resultados, ni dar conceptos definitivos.
Su trabajo es escuchar, ordenar los hechos, detectar urgencia, explicar riesgos generales y llevar al usuario hacia una consulta con Leal Abogados cuando el caso lo justifique.

Objetivo comercial:

- Aumentar agendamientos laborales desde web y WhatsApp.
- Mejorar la calidad del lead antes de que llegue al abogado.
- Reducir conversaciones repetitivas de primer contacto.
- Crear una base escalable para sumar nuevas areas despues: familia, seguridad social, civil, sucesiones y empresas.

## Alcance inicial

Area unica: derecho laboral colombiano.

Casos que el bot debe reconocer:

- Despido sin justa causa.
- Liquidacion laboral.
- Prestaciones sociales.
- Acoso laboral.
- Estabilidad laboral reforzada.
- Accidente o enfermedad laboral y posible culpa patronal.
- Contrato laboral vs prestacion de servicios.
- Horas extra, recargos, jornada y salario.
- Tramites ante el Ministerio del Trabajo.
- Tutela laboral cuando haya derechos fundamentales o minimo vital.
- Necesidad empresarial: contratos, reglamento interno, terminaciones, riesgos preventivos.

## Principio juridico

El bot da orientacion general y pedagogica, no asesoria legal personalizada.
Cada respuesta sensible debe cerrar con una invitacion clara a consulta cuando falten documentos, fechas, pruebas, montos o analisis estrategico.

Texto base de limite:

> Te puedo orientar de forma general con base en derecho laboral colombiano, pero esto no reemplaza la revision de un abogado. Para definir la ruta correcta hay que revisar documentos, fechas, pagos y pruebas.

## Fuentes normativas base

La base de conocimiento debe mantenerse actualizada desde fuentes oficiales o institucionales:

- Codigo Sustantivo del Trabajo en SUIN-Juriscol: https://www.suin-juriscol.gov.co/viewDocument.asp?id=30019323
- Codigos publicados por el Ministerio del Trabajo: https://www.mintrabajo.gov.co/normatividad/leyes-y-decretos-ley/codigos
- Calculadora Laboral del Ministerio del Trabajo: https://www.mintrabajo.gov.co/atencion-al-ciudadano/tramites-y-servicios/mi-calculadora
- LegalApp de MinJusticia para rutas ciudadanas: https://www.minjusticia.gov.co/programas-co/LegalApp/
- Ley 2466 de 2025, reforma laboral: https://www.suin-juriscol.gov.co/viewDocument.asp?id=30055086
- Codigo Procesal del Trabajo y de la Seguridad Social, Ley 2452 de 2025: https://www.suin-juriscol.gov.co/viewDocument.asp?id=30054744

Regla tecnica: el modelo no debe responder sobre cambios recientes sin recuperar fuente vigente o sin marcar baja confianza.

## Flujo conversacional MVP

1. Entrada
   - Saludo breve.
   - Confirmar que atiende asuntos laborales en Colombia.
   - Preguntar si el usuario es trabajador, empleador o empresa.

2. Identificacion del caso
   - Tipo de problema.
   - Ciudad o departamento.
   - Tipo de vinculacion: contrato laboral, prestacion de servicios, verbal, fijo, indefinido, obra labor, otro.
   - Fecha clave: despido, accidente, inicio, terminacion, ultimo pago o citacion.
   - Si hay documentos: contrato, carta de despido, liquidacion, desprendibles, incapacidades, chats, correos, certificaciones.

3. Triage
   - Urgente: tutela, minimo vital, embarazo, fuero, incapacidad, discapacidad, acoso fuerte, accidente grave, citacion cercana, terminos procesales.
   - Alto valor: despido, indemnizacion, liquidacion grande, empresa con riesgo recurrente.
   - Educativo: dudas generales sin conflicto activo.

4. Orientacion responsable
   - Explicar el problema en lenguaje simple.
   - Listar documentos que conviene reunir.
   - Indicar posibles rutas: reclamacion, conciliacion, Ministerio, tutela, demanda laboral, prevencion empresarial.
   - No calcular montos exactos sin datos completos; si se calcula, marcar como estimado.

5. Respuesta experta por escrito
   - Antes de ofrecer un documento o respuesta experta, el bot debe haber pedido los datos minimos del caso.
   - El bot puede dar orientacion inicial gratuita, pero no debe entregar concepto experto escrito sin pago.
   - Valor MVP: consignacion de $10.000 COP por Nequi.
   - Despues del pago, el usuario debe enviar comprobante por WhatsApp junto con resumen y documentos disponibles.

6. Conversion
   - Si el caso es urgente o juridicamente sensible: recomendar consulta.
   - Si el usuario esta listo: pedir nombre, telefono, ciudad, resumen, disponibilidad.
   - Generar mensaje WhatsApp prellenado o crear lead en CRM.

## Preguntas base

El bot no debe interrogar como formulario largo desde el inicio. Debe preguntar de a una o dos cosas.

Preguntas esenciales:

- ¿Eres trabajador, empleador o empresa?
- ¿Que paso exactamente?
- ¿Cuando ocurrio?
- ¿En que ciudad estas?
- ¿Tenias contrato escrito, verbal o prestacion de servicios?
- ¿Sigues trabajando ahi o ya termino la relacion?
- ¿Tienes documentos o pruebas?
- ¿Hay embarazo, incapacidad, enfermedad, accidente laboral, discapacidad, acoso o afectacion al minimo vital?
- ¿Quieres que te ayudemos a agendar una consulta para revisar documentos y definir la ruta?

## Senales de escalamiento obligatorio

El bot debe insistir en consulta con abogado cuando detecte:

- Despido durante embarazo, incapacidad, discapacidad, fuero sindical o estabilidad laboral reforzada.
- Accidente o enfermedad laboral con secuelas.
- Acoso laboral con afectacion de salud o pruebas.
- Falta de pago de salarios, liquidacion o prestaciones.
- Contrato de prestacion de servicios que podria encubrir relacion laboral.
- Citacion, audiencia, carta disciplinaria o termino cercano.
- Empresa que va a despedir, sancionar o modificar condiciones laborales.
- Cualquier caso donde el usuario pida estrategia, demanda, tutela, indemnizacion o valor exacto.

## Respuestas prohibidas

El chatbot no debe:

- Garantizar resultados.
- Decir que una demanda "se gana".
- Redactar una demanda completa sin abogado.
- Inventar normas, articulos o jurisprudencia.
- Dar plazos definitivos sin fuente vigente.
- Decir montos exactos si faltan salario, fechas, modalidad, pagos y soportes.
- Pedir datos sensibles innecesarios.
- Recibir documentos altamente sensibles sin aviso de privacidad y consentimiento.

## Arquitectura CTO

Version 1 simple:

- Frontend: widget web en Next.js.
- API interna: `/api/chat-laboral`.
- Modelo: AI server-side con OpenAI Responses API, Gemini Interactions API o webhook n8n, prompt de sistema, salida estructurada JSON y fallback deterministico si no hay API key o si falla el proveedor.
- Base de conocimiento: archivos curados en Markdown/JSON dentro del repo o en una tabla externa.
- Lead handoff: WhatsApp prellenado y registro en CRM/n8n.
- Analitica: eventos de apertura, mensajes, clasificacion, click WhatsApp, agendamiento.

Version 2 escalable:

- RAG con documentos versionados y embeddings.
- Panel interno para revisar conversaciones y calificar leads.
- Integracion con calendario.
- Recordatorios automaticos antes de consulta.
- Sub-bots por area juridica.
- Auditoria de fuentes y respuestas.

## Componentes tecnicos

- `LegalChatWidget`: boton flotante o modulo en pagina de consulta.
- `LegalChatPanel`: historial, input, estados de carga y CTA.
- `LeadQualification`: estructura interna para clasificar caso.
- `POST /api/chat-laboral`: orquesta prompt, contexto y respuesta.
- `POST /api/leads`: guarda o envia lead a n8n/CRM.
- `lib/legal/labor-ai.ts`: capa AI server-side para comprender contexto, redactar mejor, respetar guardrails y devolver clasificacion estructurada.
- `lib/legal/labor-knowledge.ts`: fuentes internas, disclaimers y categorias.
- `lib/legal/lead-scoring.ts`: urgencia, valor, riesgo y proximo paso.

## Configuracion AI

Variables de entorno:

```env
LABOR_AI_PROVIDER=gemini
LABOR_N8N_WEBHOOK_URL=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3.5-flash
```

Reglas de operacion:

- La llave nunca debe exponerse al navegador.
- El endpoint `/api/chat-laboral` llama la AI desde servidor.
- Si falta una llave AI valida, el chat responde con el motor deterministico de respaldo.
- La AI debe devolver JSON estructurado para evitar respuestas fuera del flujo comercial/legal.
- El modelo puede cambiarse por ambiente con `OPENAI_MODEL` o `GEMINI_MODEL` sin tocar codigo.
- El proveedor puede fijarse con `LABOR_AI_PROVIDER=openai`, `LABOR_AI_PROVIDER=gemini` o `LABOR_AI_PROVIDER=n8n`.
- Si se usa n8n, `LABOR_N8N_WEBHOOK_URL` debe apuntar a un webhook que reciba `messages`, `systemPrompt`, `conversationPrompt` y `fallback`, y devuelva JSON con `reply`, `phase`, `quickReplies` y `lead`.
- Regla de conversacion: no repetir preguntas ya respondidas; cuando existan perfil, tema laboral y fecha aproximada, avanzar a orientacion inicial y pago de respuesta experta.

## Modelo de lead

```ts
type LaborLead = {
  name?: string;
  phone?: string;
  city?: string;
  role: "trabajador" | "empleador" | "empresa" | "otro" | "desconocido";
  caseType:
    | "despido"
    | "liquidacion"
    | "prestaciones"
    | "acoso"
    | "estabilidad_reforzada"
    | "accidente_enfermedad_laboral"
    | "contrato_realidad"
    | "jornada_salario"
    | "ministerio_trabajo"
    | "tutela"
    | "preventivo_empresa"
    | "otro";
  urgency: "baja" | "media" | "alta" | "critica";
  summary: string;
  dates?: string[];
  documents?: string[];
  recommendedNextStep:
    | "consulta"
    | "whatsapp"
    | "reunir_documentos"
    | "orientacion_general"
    | "urgente_abogado"
    | "pago_respuesta_experta";
  consentToContact: boolean;
  sourcePage?: string;
  utm?: Record<string, string>;
};
```

## Prompt base del sistema

```txt
Eres el asistente de primer contacto de Leal Abogados Compania.
Atiedes solo derecho laboral colombiano en este MVP.
Tu objetivo es orientar de forma general, ordenar los hechos, detectar urgencia y ayudar a agendar una consulta con un abogado cuando corresponda.

No eres abogado, no reemplazas asesoria legal personalizada y no prometes resultados.
No inventes normas, articulos, plazos, jurisprudencia ni valores.
Si faltan datos, pregunta de forma breve.
Si el caso involucra estabilidad laboral reforzada, embarazo, incapacidad, accidente, acoso, no pago, despido, tutela, terminos o empresa con riesgo, recomienda consulta.

Responde en espanol colombiano, claro, sobrio y humano.
Maximo 2 parrafos cortos y luego una pregunta o CTA.
```

## Conversion y tono

El tono debe ser firme, claro y calmado. No debe sonar a robot ni a vendedor agresivo.

CTA recomendado:

> Por lo que cuentas, si conviene que un abogado revise documentos y fechas antes de que tomes una decision. Puedo ayudarte a dejar listo el mensaje para agendar la consulta con Leal Abogados.

## Metricas CEO

- Conversaciones iniciadas.
- Porcentaje que llega a clasificacion.
- Porcentaje que acepta WhatsApp/agendamiento.
- Porcentaje que solicita respuesta experta por escrito.
- Respuestas expertas pagadas por Nequi.
- Tiempo promedio hasta CTA.
- Casos urgentes detectados.
- Leads laborales por fuente.
- Consulta agendada / conversacion.
- Consulta pagada / consulta agendada.
- Servicio contratado / consulta pagada.

## Roadmap de implementacion

### Sprint 1: MVP controlado

- Crear widget web solo en pagina de consulta o area laboral.
- Prompt guardado en servidor.
- Respuestas sin RAG complejo, apoyadas en catalogo curado.
- Handoff a WhatsApp con resumen del caso.
- Eventos de conversion.

### Sprint 2: Calificacion real

- Guardar leads en n8n/CRM.
- Crear lead scoring.
- Agregar consentimiento de contacto.
- Agregar recordatorio de documentos.

### Sprint 3: Conocimiento juridico versionado

- Crear base laboral por temas.
- Agregar fuentes oficiales.
- Revisar con abogado.
- Registrar fecha de ultima revision.

### Sprint 4: Agenda y seguimiento

- Integrar calendario.
- Confirmaciones automaticas.
- Estado del lead.
- Reporte semanal de conversion.

### Sprint 5: Expansion

- Seguridad social.
- Familia.
- Civil.
- Sucesiones.
- Empresas y prevencion laboral.

## Decision recomendada

Empezar con un chatbot laboral cerrado, no con un asistente juridico general.
La promesa publica debe ser:

> Orientacion inicial en derecho laboral colombiano para entender tu situacion y definir si necesitas una consulta especializada.

Esto protege a la firma, mejora conversion y crea una base tecnica replicable.
