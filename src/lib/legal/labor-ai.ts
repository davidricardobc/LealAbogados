import {
  caseLabelByType,
  buildWhatsappMessage,
  evaluateLaborConversation,
  roleLabelByType,
  urgencyLabelByType,
  type LaborCaseType,
  type LaborChatMessage,
  type LaborChatPhase,
  type LaborChatResult,
  type LaborLead,
  type LaborLeadProfile,
  type LaborRole,
  type LaborUrgency,
} from "@/lib/legal/labor-chat";

type OpenAiResponse = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      text?: string;
      type?: string;
    }>;
  }>;
};

type GeminiResponse = {
  output_text?: string;
  steps?: Array<{
    content?: Array<{
      text?: string;
      type?: string;
    }>;
  }>;
};

type AiDraft = {
  reply?: unknown;
  phase?: unknown;
  quickReplies?: unknown;
  lead?: Partial<Record<keyof LaborLead, unknown>>;
};

const openAiModel = process.env.OPENAI_MODEL?.trim() || "gpt-4.1-mini";
const geminiModel = process.env.GEMINI_MODEL?.trim() || "gemini-3.5-flash";
const openAiEndpoint = "https://api.openai.com/v1/responses";
const geminiEndpoint = "https://generativelanguage.googleapis.com/v1beta/interactions";
const n8nWebhookUrl = process.env.LABOR_N8N_WEBHOOK_URL?.trim();

const validRoles = new Set<LaborRole>(["trabajador", "empleador", "empresa", "otro", "desconocido"]);
const validCaseTypes = new Set<LaborCaseType>([
  "despido",
  "liquidacion",
  "prestaciones",
  "acoso",
  "estabilidad_reforzada",
  "accidente_enfermedad_laboral",
  "contrato_realidad",
  "jornada_salario",
  "ministerio_trabajo",
  "tutela",
  "preventivo_empresa",
  "otro",
]);
const validUrgencies = new Set<LaborUrgency>(["baja", "media", "alta", "critica"]);
const validPhases = new Set<LaborChatPhase>(["saludo", "preguntas", "orientacion_inicial", "agendamiento"]);
const validTemperatures = new Set<LaborLead["temperature"]>(["frio", "tibio", "caliente"]);
const validRelationStatuses = new Set<NonNullable<LaborLead["relationStatus"]>>(["activo", "terminado", "desconocido"]);

export async function evaluateLaborConversationWithAi(
  messages: LaborChatMessage[],
  leadProfile?: LaborLeadProfile,
): Promise<LaborChatResult> {
  const fallback = evaluateLaborConversation(messages, leadProfile);
  const openAiKey = process.env.OPENAI_API_KEY?.trim();
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const preferredProvider = process.env.LABOR_AI_PROVIDER?.trim().toLowerCase();

  if (!openAiKey && !geminiKey && !n8nWebhookUrl) {
    return fallback;
  }

  if (preferredProvider === "n8n" && n8nWebhookUrl) {
    try {
      const aiDraft = await requestN8nDraft({ fallback, leadProfile, messages, webhookUrl: n8nWebhookUrl });
      return mergeAiDraft(fallback, aiDraft);
    } catch (error) {
      console.error("labor_chat_n8n_failed", error);
    }
  }

  if (preferredProvider === "openai" && openAiKey) {
    try {
      const aiDraft = await requestOpenAiDraft({ apiKey: openAiKey, fallback, leadProfile, messages });
      return mergeAiDraft(fallback, aiDraft);
    } catch (error) {
      console.error("labor_chat_openai_failed", error);
    }
  }

  if (geminiKey) {
    try {
      const aiDraft = await requestGeminiDraft({ apiKey: geminiKey, fallback, leadProfile, messages });
      return mergeAiDraft(fallback, aiDraft);
    } catch (error) {
      console.error("labor_chat_gemini_failed", error);
    }
  }

  if (openAiKey) {
    try {
      const aiDraft = await requestOpenAiDraft({ apiKey: openAiKey, fallback, leadProfile, messages });
      return mergeAiDraft(fallback, aiDraft);
    } catch (error) {
      console.error("labor_chat_openai_failed", error);
    }
  }

  if (n8nWebhookUrl) {
    try {
      const aiDraft = await requestN8nDraft({ fallback, leadProfile, messages, webhookUrl: n8nWebhookUrl });
      return mergeAiDraft(fallback, aiDraft);
    } catch (error) {
      console.error("labor_chat_n8n_failed", error);
    }
  }

  return fallback;
}

async function requestN8nDraft({
  fallback,
  leadProfile,
  messages,
  webhookUrl,
}: {
  fallback: LaborChatResult;
  leadProfile?: LaborLeadProfile;
  messages: LaborChatMessage[];
  webhookUrl: string;
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "leal_labor_chat",
        messages: messages.slice(-10),
        leadProfile: leadProfile ?? null,
        currentLead: fallback.lead,
        systemPrompt: buildSystemPrompt(fallback),
        conversationPrompt: buildConversationPrompt(messages, fallback, leadProfile),
        fallback,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`n8n request failed: ${response.status}`);
    }

    const payload = (await response.json()) as AiDraft | { data?: AiDraft; output?: AiDraft; reply?: unknown };

    if ("data" in payload && payload.data) {
      return payload.data;
    }

    if ("output" in payload && payload.output) {
      return payload.output;
    }

    return payload as AiDraft;
  } finally {
    clearTimeout(timeout);
  }
}

async function requestOpenAiDraft({
  apiKey,
  fallback,
  leadProfile,
  messages,
}: {
  apiKey: string;
  fallback: LaborChatResult;
  leadProfile?: LaborLeadProfile;
  messages: LaborChatMessage[];
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch(openAiEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: openAiModel,
        input: [
          {
            role: "developer",
            content: buildSystemPrompt(fallback),
          },
          {
            role: "user",
            content: buildConversationPrompt(messages, fallback, leadProfile),
          },
        ],
        max_output_tokens: 900,
        store: false,
        temperature: 0.35,
        text: {
          format: {
            type: "json_schema",
            name: "labor_chat_response",
            strict: false,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                reply: { type: "string" },
                phase: {
                  type: "string",
                  enum: Array.from(validPhases),
                },
                quickReplies: {
                  type: "array",
                  items: { type: "string" },
                  maxItems: 4,
                },
                lead: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    role: { type: "string", enum: Array.from(validRoles) },
                    caseType: { type: "string", enum: Array.from(validCaseTypes) },
                    urgency: { type: "string", enum: Array.from(validUrgencies) },
                    summary: { type: "string" },
                    name: { type: "string" },
                    phone: { type: "string" },
                    city: { type: "string" },
                    keyDates: { type: "array", items: { type: "string" }, maxItems: 5 },
                    employmentType: { type: "string" },
                    relationStatus: { type: "string", enum: ["activo", "terminado", "desconocido"] },
                    schedulingIntent: { type: "boolean" },
                    temperature: { type: "string", enum: ["frio", "tibio", "caliente"] },
                    confidence: { type: "number" },
                    documents: { type: "array", items: { type: "string" }, maxItems: 6 },
                    missingFields: { type: "array", items: { type: "string" }, maxItems: 4 },
                    flags: { type: "array", items: { type: "string" }, maxItems: 5 },
                  },
                },
              },
              required: ["reply", "phase", "quickReplies", "lead"],
            },
          },
          verbosity: "medium",
        },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed: ${response.status}`);
    }

    return parseOpenAiDraft((await response.json()) as OpenAiResponse);
  } finally {
    clearTimeout(timeout);
  }
}

async function requestGeminiDraft({
  apiKey,
  fallback,
  leadProfile,
  messages,
}: {
  apiKey: string;
  fallback: LaborChatResult;
  leadProfile?: LaborLeadProfile;
  messages: LaborChatMessage[];
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch(geminiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        model: geminiModel,
        system_instruction: buildSystemPrompt(fallback),
        input: buildConversationPrompt(messages, fallback, leadProfile),
        generation_config: {
          thinking_level: "low",
          temperature: 0.35,
        },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Gemini request failed: ${response.status}`);
    }

    return parseGeminiDraft((await response.json()) as GeminiResponse);
  } finally {
    clearTimeout(timeout);
  }
}

function buildSystemPrompt(fallback: LaborChatResult) {
  return [
    "Eres el asistente laboral de Leal Abogados en Colombia.",
    "Tu trabajo es entender el contexto, hacer preguntas utiles y orientar de forma clara para convertir buenos casos en consulta con abogado laboral.",
    "No eres abogado del usuario, no reemplazas revision legal personalizada, no prometes resultados y no inventas normas, articulos, cuantias exactas ni terminos si no tienes datos suficientes.",
    "No menciones indemnizaciones exactas, dias de salario, articulos o formulas de calculo en la orientacion inicial. Eso queda para la revision personalizada con documentos.",
    "Evita conclusiones categoricas como 'es ilegal', 'se gana', 'es falta grave' o 'tienes derecho seguro'. Usa lenguaje prudente: 'podria', 'puede existir riesgo', 'hay senales de', 'conviene revisar'.",
    "Especialidad actual: derecho laboral colombiano. Si preguntan por otra area, dilo con amabilidad y orienta a agendar por WhatsApp.",
    "Estilo: humano, directo, facil de entender, con criterio. Usa frases cortas y evita tono robotico.",
    "Regla de avance: no repitas una pregunta si el historial ya contiene una respuesta parcial. Reconoce lo entendido y pregunta solo el dato indispensable que falta.",
    "Memoria conversacional: el campo currentLead representa lo que ya sabes del cliente. Debes usarlo como memoria viva y no volver a preguntar role, city, date, phone, name o caseType si ya estan claros.",
    "Si el usuario corrige un dato, actualiza el lead. Si solo agrega informacion, conserva lo anterior.",
    "Venta consultiva: el usuario debe sentirse escuchado. Primero valida brevemente lo que vive, luego ordena hechos y finalmente explica por que una consulta le ahorra riesgo o tiempo.",
    "Haz maximo 1 o 2 preguntas por turno. Si ya conoces perfil, tema y una fecha aproximada, no sigas interrogando: entrega orientacion inicial y deja los demas datos como pendientes utiles.",
    "Cuando preguntes, explica en una frase por que ese dato cambia la ruta. Evita bloques genericos de 3 preguntas repetidas.",
    "Si ya hay contexto suficiente, entrega una orientacion inicial en 3 a 5 puntos: lectura del caso, riesgos o senales importantes, documentos, siguiente paso.",
    "La respuesta debe llevar a algun punto: agendar consulta, reunir documentos para la consulta, enviar resumen por WhatsApp o aclarar un unico dato critico.",
    "No cobres, no pidas consignaciones y no ofrezcas documento pagado. Por ahora el objetivo comercial es motivar una reunion con abogado.",
    "Cuando el caso sea caliente o el usuario muestre intencion de agendar, pide nombre, telefono o disponibilidad solo si faltan; si no faltan, lleva a WhatsApp.",
    "Si el usuario pregunta por precio, dile que el equipo puede confirmarlo por WhatsApp segun el tipo de revision que necesite.",
    "Devuelve solo JSON valido con: reply, phase, quickReplies y lead.",
    `Clasificacion base del sistema: ${JSON.stringify({
      phase: fallback.phase,
      caseType: caseLabelByType[fallback.lead.caseType],
      urgency: urgencyLabelByType[fallback.lead.urgency],
      role: roleLabelByType[fallback.lead.role],
      goal: "orientacion gratuita inicial y agendamiento",
    })}`,
  ].join("\n");
}

function buildConversationPrompt(messages: LaborChatMessage[], fallback: LaborChatResult, leadProfile?: LaborLeadProfile) {
  return JSON.stringify({
    conversation: messages.slice(-10),
    latestUserMessage: messages.filter((message) => message.role === "user").at(-1)?.content ?? "",
    previousLeadProfile: leadProfile ?? null,
    currentLead: fallback.lead,
    fallbackLead: fallback.lead,
    fallbackPhase: fallback.phase,
    fallbackReply: fallback.reply,
    outputRules: {
      reply: "Texto final que vera el usuario. Debe estar en espanol colombiano natural.",
      phase: "saludo, preguntas, orientacion_inicial o agendamiento.",
      quickReplies: "Botones cortos de siguiente paso, maximo 4.",
      lead: "Clasificacion del caso y resumen para CRM/WhatsApp.",
      memory:
        "Conserva datos ya capturados. Si currentLead.role es trabajador, no preguntes si es trabajador o empresa. Si currentLead.caseType ya no es otro, no preguntes que tipo de tema es salvo que haya contradiccion.",
      progression:
        "Si fallbackPhase es preguntas pero el historial ya trae perfil, tema laboral y fecha aproximada, cambia a orientacion_inicial o agendamiento. No te quedes repitiendo preguntas.",
      sales:
        "Cuando haya urgencia alta/critica, caso concreto, intencion de cita o telefono, sube temperature a caliente y orienta a reunion con abogado sin sonar agresivo.",
    },
  });
}

function parseOpenAiDraft(response: OpenAiResponse): AiDraft {
  const text = response.output_text || response.output?.flatMap((item) => item.content ?? []).find((content) => content.type === "output_text")?.text;

  if (!text) {
    throw new Error("OpenAI response did not include output text");
  }

  return parseJsonDraft(text);
}

function parseGeminiDraft(response: GeminiResponse): AiDraft {
  const text =
    response.output_text ||
    response.steps
      ?.flatMap((step) => step.content ?? [])
      .map((output) => output.text)
      .filter(Boolean)
      .join("");

  if (!text) {
    throw new Error("Gemini response did not include output text");
  }

  return parseJsonDraft(text);
}

function parseJsonDraft(text: string): AiDraft {
  const cleanText = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "");

  return JSON.parse(cleanText) as AiDraft;
}

function mergeAiDraft(fallback: LaborChatResult, draft: AiDraft): LaborChatResult {
  const lead = mergeLeadDraft(fallback.lead, draft.lead);
  const phase = stringInSet(draft.phase, validPhases) ?? fallback.phase;
  const quickReplies = sanitizeStringArray(draft.quickReplies, 4, fallback.quickReplies);
  const draftedReply =
    typeof draft.reply === "string" && draft.reply.trim().length > 20
      ? softenLegalCertainty(draft.reply.trim())
      : fallback.reply;
  const reply = repeatsKnownLeadQuestion(draftedReply, lead) ? fallback.reply : draftedReply;

  return {
    ...fallback,
    reply,
    lead,
    phase,
    quickReplies,
    paymentRequired: false,
    shouldEscalate: lead.urgency === "critica" || lead.urgency === "alta" || lead.caseType !== "otro",
    whatsappMessage: buildWhatsappMessage(lead, phase),
  };
}

function repeatsKnownLeadQuestion(reply: string, lead: LaborLead) {
  const normalizedReply = normalizeText(reply);
  const asksKnownRole =
    lead.role !== "desconocido" &&
    (normalizedReply.includes("trabajador, empleador o empresa") ||
      normalizedReply.includes("trabajador, empresa o empleador") ||
      normalizedReply.includes("hablas como trabajador") ||
      normalizedReply.includes("eres trabajador") ||
      normalizedReply.includes("como trabajador, empleador"));
  const asksKnownCase =
    lead.caseType !== "otro" &&
    (normalizedReply.includes("despido, liquidacion, acoso") ||
      normalizedReply.includes("que situacion necesitas revisar") ||
      normalizedReply.includes("que paso exactamente"));

  return asksKnownRole || asksKnownCase;
}

function mergeLeadDraft(fallback: LaborLead, draft: AiDraft["lead"]): LaborLead {
  if (!draft || typeof draft !== "object") {
    return fallback;
  }

  return {
    ...fallback,
    name: typeof draft.name === "string" && draft.name.trim() ? draft.name.trim().slice(0, 80) : fallback.name,
    phone: typeof draft.phone === "string" && draft.phone.trim() ? draft.phone.trim().slice(0, 40) : fallback.phone,
    city: typeof draft.city === "string" && draft.city.trim() ? draft.city.trim().slice(0, 80) : fallback.city,
    keyDates: sanitizeStringArray(draft.keyDates, 5, fallback.keyDates),
    employmentType:
      typeof draft.employmentType === "string" && draft.employmentType.trim()
        ? draft.employmentType.trim().slice(0, 80)
        : fallback.employmentType,
    relationStatus: stringInSet(draft.relationStatus, validRelationStatuses) ?? fallback.relationStatus,
    schedulingIntent: typeof draft.schedulingIntent === "boolean" ? draft.schedulingIntent : fallback.schedulingIntent,
    temperature: stringInSet(draft.temperature, validTemperatures) ?? fallback.temperature,
    confidence:
      typeof draft.confidence === "number" && Number.isFinite(draft.confidence)
        ? Math.min(Math.max(Math.round(draft.confidence), 0), 100)
        : fallback.confidence,
    role: fallback.role !== "desconocido" ? fallback.role : stringInSet(draft.role, validRoles) ?? fallback.role,
    caseType: fallback.caseType !== "otro" ? fallback.caseType : stringInSet(draft.caseType, validCaseTypes) ?? fallback.caseType,
    urgency: pickHigherUrgency(fallback.urgency, stringInSet(draft.urgency, validUrgencies)),
    summary: typeof draft.summary === "string" && draft.summary.trim() ? draft.summary.trim().slice(0, 260) : fallback.summary,
    documents: sanitizeStringArray(draft.documents, 6, fallback.documents),
    missingFields: sanitizeStringArray(draft.missingFields, 4, fallback.missingFields),
    flags: sanitizeStringArray(draft.flags, 5, fallback.flags),
  };
}

function pickHigherUrgency(fallbackUrgency: LaborUrgency, draftUrgency?: LaborUrgency) {
  if (!draftUrgency) {
    return fallbackUrgency;
  }

  const rank: Record<LaborUrgency, number> = {
    baja: 1,
    media: 2,
    alta: 3,
    critica: 4,
  };

  return rank[draftUrgency] > rank[fallbackUrgency] ? draftUrgency : fallbackUrgency;
}

function stringInSet<T extends string>(value: unknown, validValues: Set<T>) {
  return typeof value === "string" && validValues.has(value as T) ? (value as T) : undefined;
}

function sanitizeStringArray(value: unknown, maxItems: number, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems);

  return items.length ? items : fallback;
}

function softenLegalCertainty(reply: string) {
  return reply
    .replace(/\*\*/g, "")
    .replace(/^\* /gm, "- ")
    .replace(/\bdespido ilegal\b/gi, "despido cuestionable o posiblemente ineficaz")
    .replace(/\bes ilegal\b/gi, "podria ser juridicamente cuestionable")
    .replace(/\bEsto te daria el derecho de solicitar\b/gi, "Eso podria abrir la posibilidad de solicitar")
    .replace(/\bte daria el derecho de solicitar\b/gi, "podria permitir solicitar")
    .replace(/\btienes derecho seguro\b/gi, "podrias tener una reclamacion")
    .replace(/\bExiste una alta probabilidad de que puedas solicitar\b/gi, "Podria existir base para solicitar")
    .replace(/\balta probabilidad\b/gi, "posibilidad")
    .replace(/\bindemnizaci[o\u00f3]n especial de 180 d[i\u00ed]as de salario\b/gi, "posibles pagos asociados, si el abogado confirma que aplica")
    .replace(/\bpruebas reinas\b/gi, "soportes importantes")
    .replace(/\bEs una opcion viable\b/gi, "Podria ser una opcion a revisar")
    .replace(/\bse puede exigir\b/gi, "se podria solicitar")
    .replace(/\bNecesitaremos revisar\b/gi, "Conviene revisar")
    .replace(/\bdecirte exactamente\b/gi, "orientarte con mas precision");
}

function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
