export type LaborRole = "trabajador" | "empleador" | "empresa" | "otro" | "desconocido";

export type LaborCaseType =
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

export type LaborUrgency = "baja" | "media" | "alta" | "critica";

export type LaborChatPhase = "saludo" | "preguntas" | "orientacion_inicial" | "agendamiento";

export type LaborLeadTemperature = "frio" | "tibio" | "caliente";

export type LaborRecommendedNextStep =
  | "consulta"
  | "whatsapp"
  | "reunir_documentos"
  | "orientacion_general"
  | "urgente_abogado";

export type LaborChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type LaborLead = {
  sessionId?: string;
  name?: string;
  phone?: string;
  city?: string;
  keyDates: string[];
  employmentType?: string;
  relationStatus?: "activo" | "terminado" | "desconocido";
  schedulingIntent: boolean;
  temperature: LaborLeadTemperature;
  confidence: number;
  role: LaborRole;
  caseType: LaborCaseType;
  urgency: LaborUrgency;
  summary: string;
  documents: string[];
  missingFields: string[];
  recommendedNextStep: LaborRecommendedNextStep;
  flags: string[];
};

export type LaborLeadProfile = Partial<LaborLead>;

type ConversationFacts = {
  hasDate: boolean;
  hasCity: boolean;
  hasContract: boolean;
  hasDocuments: boolean;
  hasSchedulingIntent: boolean;
  hasName: boolean;
  hasPhone: boolean;
};

export type LaborChatResult = {
  reply: string;
  lead: LaborLead;
  phase: LaborChatPhase;
  quickReplies: string[];
  ctaLabel: string;
  shouldEscalate: boolean;
  paymentRequired: boolean;
  whatsappMessage: string;
};

type CaseRule = {
  type: LaborCaseType;
  label: string;
  keywords: string[];
  documents: string[];
  route: string;
  followUp: string;
};

type PickedLeadDetails = {
  name?: string;
  phone?: string;
  city?: string;
  keyDates: string[];
  employmentType?: string;
  relationStatus?: LaborLead["relationStatus"];
};

const caseRules: CaseRule[] = [
  {
    type: "estabilidad_reforzada",
    label: "estabilidad laboral reforzada",
    keywords: [
      "embarazada",
      "embarazo",
      "maternidad",
      "incapacidad",
      "incapacitado",
      "discapacidad",
      "fuero",
      "reintegro",
      "salud",
      "enfermedad",
    ],
    documents: ["contrato", "incapacidades", "historia o certificacion medica", "carta de despido", "pagos"],
    route: "Puede requerir revision urgente porque podria involucrar estabilidad laboral reforzada, tutela o reintegro.",
    followUp: "¿La empresa conocia esa condicion antes de despedir o cambiar tus condiciones?",
  },
  {
    type: "accidente_enfermedad_laboral",
    label: "accidente o enfermedad laboral",
    keywords: ["accidente", "arl", "culpa patronal", "riesgo laboral", "enfermedad laboral", "calificacion", "secuela"],
    documents: ["reporte de accidente", "historia clinica", "incapacidades", "comunicaciones con ARL o empresa"],
    route: "Conviene revisar soportes medicos, reporte del evento y respuesta de empresa o ARL antes de definir reclamacion.",
    followUp: "¿El accidente o enfermedad ya fue reportado a la empresa o a la ARL?",
  },
  {
    type: "despido",
    label: "despido",
    keywords: ["despidieron", "despido", "terminaron", "terminacion", "echaron", "justa causa", "sin justa causa"],
    documents: ["contrato", "carta de despido", "liquidacion", "desprendibles de pago", "comunicaciones"],
    route: "La ruta puede ir desde reclamacion y conciliacion hasta proceso laboral, segun documentos y fechas.",
    followUp: "¿Te entregaron carta de terminacion o liquidacion?",
  },
  {
    type: "liquidacion",
    label: "liquidacion laboral",
    keywords: ["liquidacion", "liquidaron", "cesantias", "intereses", "prima", "vacaciones"],
    documents: ["liquidacion", "contrato", "fechas de ingreso y retiro", "salario", "pagos recibidos"],
    route: "Se debe comparar fecha de ingreso, retiro, salario y pagos para saber si la liquidacion requiere reclamacion.",
    followUp: "¿Tienes fecha de ingreso, fecha de retiro y salario base?",
  },
  {
    type: "prestaciones",
    label: "prestaciones sociales o salarios",
    keywords: ["prestaciones", "salario", "no me pagan", "deben", "pago pendiente", "seguridad social", "aportes"],
    documents: ["desprendibles", "comprobantes de pago", "contrato", "certificacion laboral", "mensajes o correos"],
    route: "Puede iniciar con requerimiento, conciliacion o reclamacion formal, segun monto, mora y pruebas.",
    followUp: "¿Que te deben exactamente: salario, prestaciones, seguridad social u otro concepto?",
  },
  {
    type: "acoso",
    label: "acoso laboral",
    keywords: ["acoso", "maltrato", "hostigamiento", "humillacion", "persecucion", "amenazas", "jefe me grita"],
    documents: ["chats", "correos", "testigos", "incapacidades", "quejas internas"],
    route: "Es importante ordenar pruebas, afectaciones y canales internos antes de actuar.",
    followUp: "¿Tienes chats, correos, testigos o algun soporte medico relacionado?",
  },
  {
    type: "contrato_realidad",
    label: "posible contrato realidad",
    keywords: ["prestacion de servicios", "ops", "independiente", "contratista", "subordinacion", "horario", "jefe"],
    documents: ["contrato de prestacion", "ordenes", "horarios", "pagos", "mensajes de subordinacion"],
    route: "Si habia horario, subordinacion y pagos periodicos, un abogado debe revisar si existio relacion laboral real.",
    followUp: "¿Tenias horario, jefe directo y tareas permanentes dentro de la empresa?",
  },
  {
    type: "jornada_salario",
    label: "jornada, recargos u horas extra",
    keywords: ["horas extra", "recargo", "dominical", "festivo", "jornada", "turnos", "nocturno"],
    documents: ["turnos", "desprendibles", "registro de horas", "chats", "contrato"],
    route: "La revision depende de jornada, pruebas de turnos y forma en que se pagaron los recargos.",
    followUp: "¿Tienes registro de turnos o desprendibles donde aparezcan esos pagos?",
  },
  {
    type: "ministerio_trabajo",
    label: "tramite ante el Ministerio del Trabajo",
    keywords: ["ministerio", "inspector", "querella", "audiencia", "citacion", "conciliacion"],
    documents: ["citacion", "queja", "correos", "contrato", "soportes del conflicto"],
    route: "Si ya hay citacion o audiencia, conviene preparar documentos y postura antes de asistir.",
    followUp: "¿Ya tienes fecha de citacion o audiencia?",
  },
  {
    type: "tutela",
    label: "posible tutela laboral",
    keywords: ["tutela", "minimo vital", "derecho fundamental", "salud", "urgente", "medicamentos"],
    documents: ["pruebas del derecho afectado", "peticiones", "respuestas", "historia clinica", "pagos"],
    route: "Si hay minimo vital, salud o estabilidad reforzada, puede requerir accion urgente con abogado.",
    followUp: "¿Que derecho se esta afectando ahora mismo y desde cuando?",
  },
  {
    type: "preventivo_empresa",
    label: "prevencion laboral empresarial",
    keywords: ["empresa", "empleados", "trabajadores", "reglamento", "contratar", "sancionar", "despedir", "empleador"],
    documents: ["contratos", "reglamento interno", "comunicaciones", "historial del caso", "politicas internas"],
    route: "Antes de despedir, sancionar o cambiar condiciones, conviene revisar riesgo y soportes.",
    followUp: "¿La empresa busca prevenir un riesgo o ya hay un conflicto abierto?",
  },
];

const roleSignals: Array<{ role: LaborRole; keywords: string[] }> = [
  {
    role: "trabajador",
    keywords: [
      "trabajador",
      "trbajdor",
      "trabajdor",
      "soy trabajador",
      "soy trbajdor",
      "soy trabajdor",
      "soy empleado",
      "empleado",
      "me despidieron",
      "trabajo en",
      "mi jefe",
      "mi empresa no me",
    ],
  },
  { role: "empresa", keywords: ["soy empresa", "mi empresa", "somos empresa", "tenemos empleados", "tenemos trabajadores", "nomina"] },
  { role: "empleador", keywords: ["soy empleador", "empleador", "quiero despedir", "quiero sancionar"] },
];

const criticalSignals = [
  "embarazo",
  "embarazada",
  "incapacidad",
  "discapacidad",
  "fuero",
  "minimo vital",
  "tutela",
  "accidente",
  "secuela",
  "salud",
  "audiencia manana",
  "citacion manana",
];

const highSignals = [
  "despido",
  "despidieron",
  "liquidacion",
  "no me pagan",
  "acoso",
  "indemnizacion",
  "demanda",
  "ministerio",
  "audiencia",
  "citacion",
  "carta",
];

export function evaluateLaborConversation(messages: LaborChatMessage[], leadProfile?: LaborLeadProfile): LaborChatResult {
  const profile = sanitizeLeadProfile(leadProfile);
  const userMessages = messages.filter((message) => message.role === "user");
  const latestUserText = userMessages.at(-1)?.content.trim() ?? "";
  const fullText = userMessages.map((message) => message.content).join(" ");
  const searchableText = normalizeText(fullText);
  const latestSearchableText = normalizeText(latestUserText);

  const selectedRule = pickCaseRule(searchableText, profile.caseType);
  const role = pickRole(searchableText, profile.role);
  const urgency = pickUrgency(searchableText, selectedRule.type, profile.urgency);
  const leadDetails = pickLeadDetails(fullText);
  const facts = pickConversationFacts(searchableText, profile, leadDetails);
  const missingFields = pickMissingFields(facts);
  const flags = pickFlags(searchableText);
  const shouldEscalate = urgency === "critica" || urgency === "alta" || selectedRule.type !== "otro";
  const clarifyingQuestions = buildClarifyingQuestions({
    facts,
    role,
    missingFields,
    selectedRule,
  });
  const phase = pickPhase({
    facts,
    latestSearchableText,
    role,
    selectedRule,
    clarifyingQuestions,
  });
  const recommendedNextStep: LaborRecommendedNextStep = urgency === "critica"
      ? "urgente_abogado"
      : facts.hasSchedulingIntent
        ? "whatsapp"
      : shouldEscalate
        ? "consulta"
        : "orientacion_general";

  const lead = enrichLeadProfile({
    profile,
    role,
    caseType: selectedRule.type,
    urgency,
    summary: buildSummary(fullText || latestUserText),
    documents: selectedRule.documents,
    missingFields,
    recommendedNextStep,
    flags,
    leadDetails,
    facts,
  });

  const reply = buildReply({
    lead,
    phase,
    selectedRule,
    clarifyingQuestions,
    shouldEscalate,
  });

  return {
    reply,
    lead,
    phase,
    quickReplies: buildQuickReplies(lead, selectedRule, phase),
    ctaLabel: buildCtaLabel(phase, urgency),
    shouldEscalate,
    paymentRequired: false,
    whatsappMessage: buildWhatsappMessage(lead, phase),
  };
}

function pickCaseRule(text: string, previousCaseType?: LaborCaseType) {
  const scoredRules = caseRules
    .map((rule) => ({
      rule,
      score: rule.keywords.reduce((score, keyword) => score + (hasKeyword(text, keyword) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score);

  if (scoredRules[0]?.score) {
    return scoredRules[0].rule;
  }

  if (previousCaseType && previousCaseType !== "otro") {
    return caseRules.find((rule) => rule.type === previousCaseType) ?? fallbackRule;
  }

  return fallbackRule;
}

const fallbackRule: CaseRule = {
  type: "otro",
  label: "consulta laboral",
  keywords: [],
  documents: ["contrato", "fechas clave", "pagos", "comunicaciones", "documentos recibidos"],
  route: "Primero hay que identificar el tipo de relacion laboral, fechas y documentos disponibles.",
  followUp: "¿Que paso exactamente y desde cuando viene ocurriendo?",
};

function pickRole(text: string, previousRole?: LaborRole): LaborRole {
  const match = roleSignals.find((signal) => signal.keywords.some((keyword) => hasRoleKeyword(text, keyword)));

  return match?.role ?? previousRole ?? "desconocido";
}

function pickUrgency(text: string, caseType: LaborCaseType, previousUrgency?: LaborUrgency): LaborUrgency {
  const detectedUrgency = (() => {
  if (criticalSignals.some((signal) => text.includes(normalizeText(signal)))) {
    return "critica";
  }

  if (highSignals.some((signal) => text.includes(normalizeText(signal)))) {
    return "alta";
  }

  if (caseType !== "otro") {
    return "media";
  }

  return "baja";
  })();

  return pickHigherUrgency(previousUrgency, detectedUrgency);
}

function pickConversationFacts(text: string, profile: LaborLeadProfile, leadDetails: PickedLeadDetails): ConversationFacts {
  return {
    hasDate:
      Boolean(profile.keyDates?.length || leadDetails.keyDates.length) ||
      /\b\d{1,2}[/-]\d{1,2}([/-]\d{2,4})?\b/.test(text) ||
      /(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ayer|hoy|manana|esta semana|semana pasada|mes pasado|hace \d+|hace un|hace una|desde hace|desde el|desde la|llevo \d+)/.test(
        text,
      ),
    hasCity:
      Boolean(profile.city || leadDetails.city) ||
      /(bogota|medellin|cali|barranquilla|cartagena|bucaramanga|villavicencio|colombia|ciudad|departamento)/.test(text),
    hasContract:
      Boolean(profile.employmentType || leadDetails.employmentType) ||
      /(contrato|verbal|indefinido|fijo|obra labor|prestacion de servicios|ops|nomina|empleado|trabajador|contratista)/.test(text),
    hasDocuments: /(carta|liquidacion|desprendible|correo|chat|contrato|incapacidad|certificacion|prueba|soporte|documento)/.test(text),
    hasSchedulingIntent:
      Boolean(profile.schedulingIntent) ||
      /(agenda|agendar|cita|consulta|reunion|reunirme|hablar con abogado|whatsapp|llamar|contactar|precio|valor|costo|honorarios)/.test(
        text,
      ),
    hasName: Boolean(profile.name || leadDetails.name),
    hasPhone: Boolean(profile.phone || leadDetails.phone),
  };
}

function pickMissingFields(facts: ConversationFacts) {
  const missingFields: string[] = [];

  if (!facts.hasDate) missingFields.push("fecha clave");
  if (!facts.hasCity) missingFields.push("ciudad");
  if (!facts.hasContract) missingFields.push("tipo de vinculacion");
  if (!facts.hasDocuments) missingFields.push("documentos o pruebas");

  return missingFields.slice(0, 3);
}

function sanitizeLeadProfile(profile?: LaborLeadProfile): LaborLeadProfile {
  if (!profile || typeof profile !== "object") {
    return {};
  }

  return {
    sessionId: sanitizeShortText(profile.sessionId, 80),
    name: sanitizeShortText(profile.name, 80),
    phone: sanitizeShortText(profile.phone, 40),
    city: sanitizeShortText(profile.city, 80),
    keyDates: sanitizeStringList(profile.keyDates, 5),
    employmentType: sanitizeShortText(profile.employmentType, 80),
    relationStatus: profile.relationStatus,
    schedulingIntent: Boolean(profile.schedulingIntent),
    temperature: profile.temperature,
    confidence: typeof profile.confidence === "number" ? Math.min(Math.max(profile.confidence, 0), 100) : undefined,
    role: profile.role,
    caseType: profile.caseType,
    urgency: profile.urgency,
    summary: sanitizeShortText(profile.summary, 260),
    documents: sanitizeStringList(profile.documents, 8),
    missingFields: sanitizeStringList(profile.missingFields, 6),
    recommendedNextStep: profile.recommendedNextStep,
    flags: sanitizeStringList(profile.flags, 8),
  };
}

function pickLeadDetails(text: string): PickedLeadDetails {
  const normalized = normalizeText(text);

  return {
    name: pickName(text),
    phone: pickPhone(text),
    city: pickCity(normalized),
    keyDates: pickKeyDates(normalized),
    employmentType: pickEmploymentType(normalized),
    relationStatus: pickRelationStatus(normalized),
  };
}

function enrichLeadProfile({
  profile,
  role,
  caseType,
  urgency,
  summary,
  documents,
  missingFields,
  recommendedNextStep,
  flags,
  leadDetails,
  facts,
}: {
  profile: LaborLeadProfile;
  role: LaborRole;
  caseType: LaborCaseType;
  urgency: LaborUrgency;
  summary: string;
  documents: string[];
  missingFields: string[];
  recommendedNextStep: LaborRecommendedNextStep;
  flags: string[];
  leadDetails: PickedLeadDetails;
  facts: ConversationFacts;
}): LaborLead {
  const mergedFlags = uniqueList([...(profile.flags ?? []), ...flags]).slice(0, 8);
  const previousDocuments = profile.caseType && profile.caseType !== "otro" ? (profile.documents ?? []) : [];
  const mergedDocuments = uniqueList([...previousDocuments, ...documents]).slice(0, 8);
  const keyDates = uniqueList([...(profile.keyDates ?? []), ...leadDetails.keyDates]).slice(0, 5);
  const leadWithoutScore = {
    sessionId: profile.sessionId,
    name: leadDetails.name ?? profile.name,
    phone: leadDetails.phone ?? profile.phone,
    city: leadDetails.city ?? profile.city,
    keyDates,
    employmentType: leadDetails.employmentType ?? profile.employmentType,
    relationStatus: leadDetails.relationStatus ?? profile.relationStatus ?? "desconocido",
    schedulingIntent: facts.hasSchedulingIntent,
    role,
    caseType,
    urgency,
    summary: summary || profile.summary || "Usuario solicita orientacion laboral inicial.",
    documents: mergedDocuments.length ? mergedDocuments : documents,
    missingFields,
    recommendedNextStep,
    flags: mergedFlags,
  };
  const score = calculateLeadScore(leadWithoutScore);

  return {
    ...leadWithoutScore,
    temperature: score >= 70 ? "caliente" : score >= 40 ? "tibio" : "frio",
    confidence: score,
  };
}

function calculateLeadScore(lead: Omit<LaborLead, "temperature" | "confidence">) {
  let score = 0;

  if (lead.role !== "desconocido") score += 12;
  if (lead.caseType !== "otro") score += 18;
  if (lead.keyDates.length) score += 12;
  if (lead.city) score += 8;
  if (lead.employmentType) score += 8;
  if (lead.documents.length) score += 8;
  if (lead.phone) score += 10;
  if (lead.name) score += 6;
  if (lead.schedulingIntent) score += 20;
  if (lead.urgency === "alta") score += 14;
  if (lead.urgency === "critica") score += 24;
  if (lead.flags.length) score += 10;

  return Math.min(score, 100);
}

function pickName(text: string) {
  const match = text.match(/\b(?:me llamo|mi nombre es|soy)\s+([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+){0,2})\b/);

  return match?.[1]?.trim();
}

function pickPhone(text: string) {
  const match = text.match(/(?:\+?57\s*)?(3\d{2}[\s.-]?\d{3}[\s.-]?\d{4})/);

  return match?.[1]?.replace(/[^\d]/g, "");
}

function pickCity(text: string) {
  const cities = [
    "bogota",
    "medellin",
    "cali",
    "barranquilla",
    "cartagena",
    "bucaramanga",
    "villavicencio",
    "pereira",
    "manizales",
    "ibague",
    "cucuta",
    "neiva",
    "pasto",
    "tunja",
    "monteria",
    "valledupar",
    "popayan",
  ];
  const match = cities.find((city) => text.includes(city));

  return match ? capitalizeWords(match) : undefined;
}

function pickKeyDates(text: string) {
  const dates = [
    ...text.matchAll(/\b\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?\b/g),
    ...text.matchAll(/\b(?:ayer|hoy|manana|esta semana|semana pasada|mes pasado|hace \d+\s+(?:dias|semanas|meses|anos)|desde hace \d+\s+(?:dias|semanas|meses|anos))\b/g),
  ].map((match) => match[0]);

  return uniqueList(dates).slice(0, 5);
}

function pickEmploymentType(text: string) {
  if (/prestacion de servicios|ops|contratista/.test(text)) return "prestacion de servicios";
  if (/termino fijo|contrato fijo/.test(text)) return "contrato a termino fijo";
  if (/indefinido/.test(text)) return "contrato indefinido";
  if (/obra labor/.test(text)) return "obra o labor";
  if (/verbal|de palabra/.test(text)) return "contrato verbal";
  if (/contrato escrito|contrato laboral|nomina/.test(text)) return "contrato laboral";

  return undefined;
}

function pickRelationStatus(text: string): LaborLead["relationStatus"] | undefined {
  if (/sigo trabajando|aun trabajo|todavia trabajo|activo/.test(text)) return "activo";
  if (/me despidieron|renuncie|termino|ya no trabajo|retire|retiro/.test(text)) return "terminado";

  return undefined;
}

function pickFlags(text: string) {
  const flags: string[] = [];

  if (/(embarazo|embarazada|maternidad)/.test(text)) flags.push("embarazo o maternidad");
  if (/(incapacidad|discapacidad|salud|enfermedad)/.test(text)) flags.push("salud o incapacidad");
  if (/(accidente|arl|culpa patronal)/.test(text)) flags.push("riesgo laboral");
  if (/(minimo vital|tutela|urgente)/.test(text)) flags.push("posible urgencia constitucional");
  if (/(audiencia|citacion|ministerio)/.test(text)) flags.push("termino o citacion");

  return flags;
}

function pickHigherUrgency(previousUrgency: LaborUrgency | undefined, detectedUrgency: LaborUrgency) {
  if (!previousUrgency) {
    return detectedUrgency;
  }

  const rank: Record<LaborUrgency, number> = {
    baja: 1,
    media: 2,
    alta: 3,
    critica: 4,
  };

  return rank[previousUrgency] > rank[detectedUrgency] ? previousUrgency : detectedUrgency;
}

function pickPhase({
  facts,
  latestSearchableText,
  role,
  selectedRule,
  clarifyingQuestions,
}: {
  facts: ConversationFacts;
  latestSearchableText: string;
  role: LaborRole;
  selectedRule: CaseRule;
  clarifyingQuestions: string[];
}): LaborChatPhase {
  if (!latestSearchableText || /^(hola|buenas|buenos dias|buenas tardes|buenas noches)$/.test(latestSearchableText)) {
    return "saludo";
  }

  if (facts.hasSchedulingIntent) {
    return "agendamiento";
  }

  const hasCoreContext = selectedRule.type !== "otro" && role !== "desconocido" && facts.hasDate;
  const hasPartialCase = selectedRule.type !== "otro" || role !== "desconocido";

  if (hasCoreContext) {
    return "orientacion_inicial";
  }

  if (clarifyingQuestions.length && !hasPartialCase) {
    return "preguntas";
  }

  if (clarifyingQuestions.length && !facts.hasDate) {
    return "preguntas";
  }

  return "orientacion_inicial";
}

function buildClarifyingQuestions({
  facts,
  role,
  missingFields,
  selectedRule,
}: {
  facts: ConversationFacts;
  role: LaborRole;
  missingFields: string[];
  selectedRule: CaseRule;
}) {
  const questions: string[] = [];

  if (role === "desconocido") {
    questions.push("¿Hablas como trabajador, empleador o empresa?");
  }

  if (selectedRule.type === "otro") {
    questions.push("¿Que paso exactamente: despido, liquidacion, acoso, accidente, horas extra u otro tema laboral?");
  } else if (!facts.hasDate) {
    questions.push("¿Cuando ocurrio o desde cuando viene pasando?");
  } else {
    questions.push(selectedRule.followUp);
  }

  if (selectedRule.type === "otro" && missingFields.includes("fecha clave")) {
    questions.push("¿Cuando ocurrio o desde cuando viene pasando?");
  }

  if (questions.length < 2 && missingFields.includes("ciudad")) {
    questions.push("¿En que ciudad o departamento de Colombia ocurre?");
  }

  if (questions.length < 2 && missingFields.includes("tipo de vinculacion")) {
    questions.push("¿Tu vinculacion era contrato escrito, verbal, termino fijo, indefinido, obra labor o prestacion de servicios?");
  }

  if (questions.length < 2 && missingFields.includes("documentos o pruebas")) {
    questions.push("¿Tienes algun soporte: contrato, carta, liquidacion, chats, correos, desprendibles o incapacidades?");
  }

  return Array.from(new Set(questions)).slice(0, 1);
}

function buildReply({
  lead,
  phase,
  selectedRule,
  clarifyingQuestions,
  shouldEscalate,
}: {
  lead: LaborLead;
  phase: LaborChatPhase;
  selectedRule: CaseRule;
  clarifyingQuestions: string[];
  shouldEscalate: boolean;
}) {
  if (phase === "saludo") {
    return "Hola. Te puedo orientar de forma general en derecho laboral colombiano y ayudarte a saber si conviene agendar una consulta. No reemplazo la revision de un abogado, pero si puedo ordenar el caso.\n\nPara empezar, cuentame en una frase que paso y si hablas como trabajador, empleador o empresa.";
  }

  if (phase === "agendamiento") {
    const contactPrompt = !lead.name || !lead.phone
      ? "\n\nSi quieres, antes de pasar a WhatsApp dejame tu nombre y celular. Asi el equipo puede ubicarte mas facil y no pierdes tiempo repitiendo la historia."
      : "";

    return `Perfecto. Ya tengo lo importante para pasar este caso a consulta: perfil ${roleLabelByType[lead.role]}, tema ${caseLabelByType[lead.caseType]} y urgencia ${urgencyLabelByType[lead.urgency]}.\n\nEl siguiente paso es hablar con un abogado laboral para revisar documentos, fechas y pruebas. El mensaje de WhatsApp ya va con el resumen del caso para que el equipo llegue con contexto.${contactPrompt}`;
  }

  if (phase === "preguntas") {
    if (lead.role !== "desconocido" && selectedRule.type === "otro") {
      const roleContext =
        lead.role === "trabajador"
          ? "Perfecto, te hablo desde el lado del trabajador."
          : lead.role === "empresa" || lead.role === "empleador"
            ? "Perfecto, te hablo desde el lado del empleador/empresa."
            : "Perfecto, ya ubico tu perfil.";

      return `${roleContext} Para orientarte bien necesito entender el hecho principal, no hacerte llenar un formulario.\n\nCuentame en una frase: ${clarifyingQuestions[0]}\n\nCon eso te doy una ruta inicial clara y vemos si conviene agendar con abogado laboral.`;
    }

    const understood = buildUnderstoodLine(lead, selectedRule);

    return `${understood}\n\nPara no hacerte repetir, solo necesito este dato clave: ${clarifyingQuestions[0]}\n\nCon eso te doy una ruta inicial y vemos si conviene agendar con abogado.`;
  }

  const urgencyLine =
    lead.urgency === "critica"
      ? "Por las senales que aparecen, conviene que un abogado lo revise con prioridad."
      : shouldEscalate
        ? "Por lo que cuentas, si conviene revisar el caso con abogado antes de tomar decisiones."
        : "Todavia falta contexto para saber si hay una ruta juridica concreta.";

  const missingContext = lead.missingFields.length
    ? `\n\nMe ayudaria confirmar despues: ${formatList(lead.missingFields)}. No detengo la orientacion por eso, pero esos datos afinan la respuesta del abogado.`
    : "";
  const caseGuidance = buildCaseGuidance(lead, selectedRule);

  const profileLine = [
    `perfil: ${roleLabelByType[lead.role]}`,
    lead.city ? `ciudad: ${lead.city}` : "",
    lead.keyDates.length ? `fecha: ${lead.keyDates[0]}` : "",
    lead.employmentType ? `vinculo: ${lead.employmentType}` : "",
  ]
    .filter(Boolean)
    .join(", ");

  return `Te escucho. Con lo que cuentas, esto ya no suena como una duda suelta sino como un caso que conviene ordenar bien.\n\n1. Lo que entiendo: ${selectedRule.label} (${profileLine}).\n2. Lectura inicial: ${caseGuidance}\n3. Ruta sugerida: ${selectedRule.route}\n4. Urgencia: ${urgencyLabelByType[lead.urgency]}. ${urgencyLine}\n5. Documentos utiles: ${formatList(selectedRule.documents.slice(0, 4))}.${missingContext}\n\nMi recomendacion es agendar una consulta con un abogado laboral para revisar documentos, fechas y pruebas antes de tomar decisiones. Esta orientacion es general y no reemplaza la revision personalizada del caso.`;
}

function buildUnderstoodLine(lead: LaborLead, selectedRule: CaseRule) {
  const parts = [
    lead.role !== "desconocido" ? `hablas como ${roleLabelByType[lead.role]}` : "",
    selectedRule.type !== "otro" ? `el tema parece ser ${selectedRule.label}` : "",
    lead.keyDates.length ? `ubico como fecha clave: ${lead.keyDates[0]}` : "",
    lead.city ? `en ${lead.city}` : "",
  ].filter(Boolean);

  if (!parts.length) {
    return "Te entiendo. Quiero ordenar bien el caso antes de darte una respuesta.";
  }

  return `Te entiendo. Ya tengo esto claro: ${formatList(parts)}.`;
}

function buildCaseGuidance(lead: LaborLead, selectedRule: CaseRule) {
  if (lead.caseType === "despido") {
    return "hay que revisar si la terminacion tuvo soporte, si hubo justa causa, si la liquidacion corresponde y si existe alguna proteccion especial.";
  }

  if (lead.caseType === "liquidacion") {
    return "la clave es comparar fecha de ingreso, retiro, salario base y pagos recibidos para detectar diferencias reclamables.";
  }

  if (lead.caseType === "acoso") {
    return "conviene ordenar hechos, fechas, testigos y pruebas antes de presentar quejas o tomar decisiones que puedan afectar el caso.";
  }

  if (lead.caseType === "estabilidad_reforzada") {
    return "hay senales sensibles de salud, fuero o proteccion especial; la prioridad es revisar si la empresa conocia la situacion y que documentos existen.";
  }

  if (lead.caseType === "contrato_realidad") {
    return "si habia horario, subordinacion y pagos periodicos, podria existir una discusion sobre relacion laboral real.";
  }

  if (lead.caseType === "preventivo_empresa") {
    return "antes de sancionar, despedir o cambiar condiciones, la empresa debe medir riesgo, soportes y debido proceso.";
  }

  return selectedRule.route;
}

function buildQuickReplies(lead: LaborLead, selectedRule: CaseRule, phase: LaborChatPhase) {
  const replies = new Set<string>();

  if (phase === "agendamiento" || phase === "orientacion_inicial") {
    replies.add("Quiero agendar consulta");
    replies.add("Tengo mas documentos");
    replies.add("Necesito hablar con abogado");
    replies.add("Quiero seguir contando el caso");

    return Array.from(replies);
  }

  if (phase === "preguntas" && lead.role !== "desconocido" && selectedRule.type === "otro") {
    if (lead.role === "trabajador") {
      return ["Me despidieron", "No me pagaron liquidacion", "Creo que hay acoso", "Tuve un accidente laboral"];
    }

    if (lead.role === "empresa" || lead.role === "empleador") {
      return ["Quiero revisar un despido", "Tengo una citacion", "Necesito prevenir un riesgo", "Caso con trabajador"];
    }
  }

  if (lead.role === "desconocido") {
    replies.add("Soy trabajador");
    replies.add("Soy empresa");
  }
  if (lead.missingFields.includes("fecha clave")) replies.add("Ocurrio esta semana");
  if (lead.missingFields.includes("ciudad")) replies.add("Estoy en Colombia");
  if (lead.missingFields.includes("tipo de vinculacion")) replies.add("Tenia contrato escrito");
  if (lead.missingFields.includes("documentos o pruebas")) replies.add("Tengo documentos");
  if (lead.urgency === "critica" || lead.urgency === "alta") replies.add("Quiero agendar consulta");

  replies.add(selectedRule.followUp);

  return Array.from(replies).slice(0, 4);
}

function buildCtaLabel(phase: LaborChatPhase, urgency: LaborUrgency) {
  if (phase === "agendamiento" || phase === "orientacion_inicial") return "Agendar consulta por WhatsApp";
  if (phase === "preguntas") return "Completar datos por WhatsApp";

  return urgency === "critica" ? "Hablar con un abogado" : "Agendar por WhatsApp";
}

export function buildWhatsappMessage(lead: LaborLead, phase: LaborChatPhase) {
  const summary = stripPaymentLanguage(lead.summary);
  const baseMessage = [
    "Hola, quiero agendar una consulta laboral con Leal Abogados.",
    `Tema: ${caseLabelByType[lead.caseType]}.`,
    `Urgencia: ${urgencyLabelByType[lead.urgency]}.`,
    `Temperatura del caso: ${lead.temperature}.`,
    `Perfil: ${roleLabelByType[lead.role]}.`,
    lead.name ? `Nombre: ${lead.name}.` : "",
    lead.phone ? `Celular: ${lead.phone}.` : "",
    lead.city ? `Ciudad: ${lead.city}.` : "",
    lead.keyDates.length ? `Fecha clave: ${formatList(lead.keyDates)}.` : "",
    lead.employmentType ? `Vinculacion: ${lead.employmentType}.` : "",
    lead.relationStatus && lead.relationStatus !== "desconocido" ? `Estado de la relacion: ${lead.relationStatus}.` : "",
    `Resumen: ${summary || "Pendiente de ampliar en consulta"}.`,
    lead.flags.length ? `Senales sensibles: ${formatList(lead.flags)}.` : "",
    lead.documents.length ? `Documentos sugeridos para revisar: ${formatList(lead.documents)}.` : "",
    "Fuente: chatbot laboral web.",
  ];

  if (phase === "agendamiento" || phase === "orientacion_inicial") {
    baseMessage.splice(1, 0, "Quiero agendar una consulta para revisar mi caso con un abogado laboral.");
  }

  return baseMessage
    .filter(Boolean)
    .join("\n");
}

function buildSummary(text: string) {
  const cleanText = text.replace(/\s+/g, " ").trim();

  if (!cleanText) {
    return "Usuario solicita orientacion laboral inicial.";
  }

  return cleanText.length > 220 ? `${cleanText.slice(0, 217)}...` : cleanText;
}

function stripPaymentLanguage(text: string) {
  return text
    .replace(/\b(quiero|deseo)?\s*(pagar|consignar|transferir)\b[^.?!\n]*/gi, "")
    .replace(/\b(nequi|comprobante|respuesta experta pagada)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeShortText(value: unknown, maxLength: number) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, maxLength) : undefined;
}

function sanitizeStringList(value: unknown, maxItems: number) {
  if (!Array.isArray(value)) {
    return [];
  }

  return uniqueList(
    value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean),
  ).slice(0, maxItems);
}

function uniqueList(items: string[]) {
  return Array.from(new Set(items.map((item) => item.trim()).filter(Boolean)));
}

function capitalizeWords(value: string) {
  return value
    .split(" ")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function formatList(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";

  return `${items.slice(0, -1).join(", ")} y ${items.at(-1)}`;
}

function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function hasKeyword(text: string, keyword: string) {
  const normalizedKeyword = normalizeText(keyword);

  if (normalizedKeyword.length <= 4 && /^[a-z0-9]+$/.test(normalizedKeyword)) {
    return new RegExp(`\\b${escapeRegExp(normalizedKeyword)}\\b`).test(text);
  }

  return text.includes(normalizedKeyword);
}

function hasRoleKeyword(text: string, keyword: string) {
  const normalizedKeyword = normalizeText(keyword);

  if (/^[a-z0-9]+$/.test(normalizedKeyword)) {
    return new RegExp(`\\b${escapeRegExp(normalizedKeyword)}\\b`).test(text);
  }

  return hasKeyword(text, normalizedKeyword);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const caseLabelByType: Record<LaborCaseType, string> = {
  despido: "despido",
  liquidacion: "liquidacion laboral",
  prestaciones: "prestaciones sociales o salarios",
  acoso: "acoso laboral",
  estabilidad_reforzada: "estabilidad laboral reforzada",
  accidente_enfermedad_laboral: "accidente o enfermedad laboral",
  contrato_realidad: "posible contrato realidad",
  jornada_salario: "jornada, recargos u horas extra",
  ministerio_trabajo: "tramite ante el Ministerio del Trabajo",
  tutela: "posible tutela laboral",
  preventivo_empresa: "prevencion laboral empresarial",
  otro: "consulta laboral",
};

export const urgencyLabelByType: Record<LaborUrgency, string> = {
  baja: "baja",
  media: "media",
  alta: "alta",
  critica: "critica",
};

export const roleLabelByType: Record<LaborRole, string> = {
  trabajador: "trabajador",
  empleador: "empleador",
  empresa: "empresa",
  otro: "otro",
  desconocido: "por confirmar",
};
