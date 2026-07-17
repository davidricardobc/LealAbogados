import {
  caseLabelByType,
  buildWhatsappMessage,
  evaluateLaborConversation,
  expertPayment,
  roleLabelByType,
  urgencyLabelByType,
  type LaborCaseType,
  type LaborChatMessage,
  type LaborChatPhase,
  type LaborChatResult,
  type LaborLead,
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
const validPhases = new Set<LaborChatPhase>(["saludo", "preguntas", "orientacion_inicial", "pago_experto", "comprobante"]);

export async function evaluateLaborConversationWithAi(messages: LaborChatMessage[]): Promise<LaborChatResult> {
  const fallback = evaluateLaborConversation(messages);
  const openAiKey = process.env.OPENAI_API_KEY?.trim();
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const preferredProvider = process.env.LABOR_AI_PROVIDER?.trim().toLowerCase();

  if (!openAiKey && !geminiKey) {
    return fallback;
  }

  if (preferredProvider === "openai" && openAiKey) {
    try {
      const aiDraft = await requestOpenAiDraft({ apiKey: openAiKey, fallback, messages });
      return mergeAiDraft(fallback, aiDraft);
    } catch (error) {
      console.error("labor_chat_openai_failed", error);
    }
  }

  if (geminiKey) {
    try {
      const aiDraft = await requestGeminiDraft({ apiKey: geminiKey, fallback, messages });
      return mergeAiDraft(fallback, aiDraft);
    } catch (error) {
      console.error("labor_chat_gemini_failed", error);
    }
  }

  if (openAiKey) {
    try {
      const aiDraft = await requestOpenAiDraft({ apiKey: openAiKey, fallback, messages });
      return mergeAiDraft(fallback, aiDraft);
    } catch (error) {
      console.error("labor_chat_openai_failed", error);
    }
  }

  return fallback;
}

async function requestOpenAiDraft({
  apiKey,
  fallback,
  messages,
}: {
  apiKey: string;
  fallback: LaborChatResult;
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
            content: buildConversationPrompt(messages, fallback),
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
  messages,
}: {
  apiKey: string;
  fallback: LaborChatResult;
  messages: LaborChatMessage[];
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

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
        input: buildConversationPrompt(messages, fallback),
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
    "Tu trabajo es entender el contexto, hacer preguntas utiles y orientar de forma clara para convertir buenos casos en consulta o respuesta experta pagada.",
    "No eres abogado del usuario, no reemplazas revision legal personalizada, no prometes resultados y no inventas normas, articulos, cuantias exactas ni terminos si no tienes datos suficientes.",
    "No menciones indemnizaciones exactas, dias de salario, articulos o formulas de calculo en la orientacion inicial. Eso queda para la respuesta experta con documentos.",
    "Evita conclusiones categoricas como 'es ilegal', 'se gana', 'es falta grave' o 'tienes derecho seguro'. Usa lenguaje prudente: 'podria', 'puede existir riesgo', 'hay senales de', 'conviene revisar'.",
    "Especialidad actual: derecho laboral colombiano. Si preguntan por otra area, dilo con amabilidad y orienta a agendar por WhatsApp.",
    "Estilo: humano, directo, facil de entender, con criterio. Usa frases cortas y evita tono robotico.",
    "Si faltan datos importantes, haz maximo 3 preguntas concretas antes de dar una conclusion. Prioriza: rol, fecha, tipo de vinculacion, ciudad, documentos/pruebas y que pide resolver.",
    "Si ya hay contexto suficiente, entrega una orientacion inicial en 3 a 5 puntos: lectura del caso, riesgos o senales importantes, documentos, siguiente paso.",
    "Antes de entregar una respuesta experta por escrito o documento/concepto preparado por abogado, exige el pago: $10.000 COP por Nequi al 315 284 9591 y pide enviar comprobante por WhatsApp.",
    "Nunca digas que el pago ya fue confirmado. Si el usuario dice que pago, pide comprobante por WhatsApp.",
    "Devuelve solo JSON valido con: reply, phase, quickReplies y lead.",
    `Clasificacion base del sistema: ${JSON.stringify({
      phase: fallback.phase,
      caseType: caseLabelByType[fallback.lead.caseType],
      urgency: urgencyLabelByType[fallback.lead.urgency],
      role: roleLabelByType[fallback.lead.role],
      paymentRequired: fallback.paymentRequired,
    })}`,
  ].join("\n");
}

function buildConversationPrompt(messages: LaborChatMessage[], fallback: LaborChatResult) {
  return JSON.stringify({
    conversation: messages.slice(-10),
    fallbackLead: fallback.lead,
    fallbackPhase: fallback.phase,
    payment: fallback.payment,
    outputRules: {
      reply: "Texto final que vera el usuario. Debe estar en espanol colombiano natural.",
      phase: "saludo, preguntas, orientacion_inicial, pago_experto o comprobante.",
      quickReplies: "Botones cortos de siguiente paso, maximo 4.",
      lead: "Clasificacion del caso y resumen para CRM/WhatsApp.",
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
  const paymentRequired = phase === "orientacion_inicial" || phase === "pago_experto" || phase === "comprobante";
  const quickReplies = sanitizeStringArray(draft.quickReplies, 4, fallback.quickReplies);
  const reply =
    typeof draft.reply === "string" && draft.reply.trim().length > 20
      ? softenLegalCertainty(draft.reply.trim())
      : fallback.reply;

  return {
    ...fallback,
    reply,
    lead,
    phase,
    quickReplies,
    paymentRequired,
    payment: paymentRequired ? fallback.payment ?? expertPayment : undefined,
    shouldEscalate: lead.urgency === "critica" || lead.urgency === "alta" || lead.caseType !== "otro",
    whatsappMessage: buildWhatsappMessage(lead, phase),
  };
}

function mergeLeadDraft(fallback: LaborLead, draft: AiDraft["lead"]): LaborLead {
  if (!draft || typeof draft !== "object") {
    return fallback;
  }

  return {
    ...fallback,
    role: stringInSet(draft.role, validRoles) ?? fallback.role,
    caseType: stringInSet(draft.caseType, validCaseTypes) ?? fallback.caseType,
    urgency: stringInSet(draft.urgency, validUrgencies) ?? fallback.urgency,
    summary: typeof draft.summary === "string" && draft.summary.trim() ? draft.summary.trim().slice(0, 260) : fallback.summary,
    documents: sanitizeStringArray(draft.documents, 6, fallback.documents),
    missingFields: sanitizeStringArray(draft.missingFields, 4, fallback.missingFields),
    flags: sanitizeStringArray(draft.flags, 5, fallback.flags),
  };
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
