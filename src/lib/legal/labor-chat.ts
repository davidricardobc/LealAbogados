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
  role: LaborRole;
  caseType: LaborCaseType;
  urgency: LaborUrgency;
  summary: string;
  documents: string[];
  missingFields: string[];
  recommendedNextStep: LaborRecommendedNextStep;
  flags: string[];
};

type ConversationFacts = {
  hasDate: boolean;
  hasCity: boolean;
  hasContract: boolean;
  hasDocuments: boolean;
  hasSchedulingIntent: boolean;
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
  { role: "empresa", keywords: ["soy empresa", "mi empresa", "somos empresa", "tenemos empleados", "trabajadores", "nomina"] },
  { role: "empleador", keywords: ["soy empleador", "empleador", "quiero despedir", "quiero sancionar"] },
  {
    role: "trabajador",
    keywords: ["soy trabajador", "soy empleado", "me despidieron", "trabajo en", "mi jefe", "mi empresa no me"],
  },
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

export function evaluateLaborConversation(messages: LaborChatMessage[]): LaborChatResult {
  const userMessages = messages.filter((message) => message.role === "user");
  const latestUserText = userMessages.at(-1)?.content.trim() ?? "";
  const fullText = userMessages.map((message) => message.content).join(" ");
  const searchableText = normalizeText(fullText);
  const latestSearchableText = normalizeText(latestUserText);

  const selectedRule = pickCaseRule(searchableText);
  const role = pickRole(searchableText);
  const urgency = pickUrgency(searchableText, selectedRule.type);
  const facts = pickConversationFacts(searchableText);
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
      : shouldEscalate
        ? "consulta"
        : "orientacion_general";

  const lead: LaborLead = {
    role,
    caseType: selectedRule.type,
    urgency,
    summary: buildSummary(fullText || latestUserText),
    documents: selectedRule.documents,
    missingFields,
    recommendedNextStep,
    flags,
  };

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

function pickCaseRule(text: string) {
  const scoredRules = caseRules
    .map((rule) => ({
      rule,
      score: rule.keywords.reduce((score, keyword) => score + (text.includes(normalizeText(keyword)) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score);

  return scoredRules[0]?.score ? scoredRules[0].rule : fallbackRule;
}

const fallbackRule: CaseRule = {
  type: "otro",
  label: "consulta laboral",
  keywords: [],
  documents: ["contrato", "fechas clave", "pagos", "comunicaciones", "documentos recibidos"],
  route: "Primero hay que identificar el tipo de relacion laboral, fechas y documentos disponibles.",
  followUp: "¿Eres trabajador, empleador o empresa, y que paso exactamente?",
};

function pickRole(text: string): LaborRole {
  const match = roleSignals.find((signal) => signal.keywords.some((keyword) => text.includes(normalizeText(keyword))));

  return match?.role ?? "desconocido";
}

function pickUrgency(text: string, caseType: LaborCaseType): LaborUrgency {
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
}

function pickConversationFacts(text: string): ConversationFacts {
  return {
    hasDate:
      /\b\d{1,2}[/-]\d{1,2}([/-]\d{2,4})?\b/.test(text) ||
      /(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ayer|hoy|manana|esta semana|semana pasada|mes pasado|hace \d+|hace un|hace una|desde hace|desde el|desde la|llevo \d+)/.test(
        text,
      ),
    hasCity: /(bogota|medellin|cali|barranquilla|cartagena|bucaramanga|villavicencio|colombia|ciudad|departamento)/.test(text),
    hasContract: /(contrato|verbal|indefinido|fijo|obra labor|prestacion de servicios|ops|nomina|empleado|trabajador|contratista)/.test(text),
    hasDocuments: /(carta|liquidacion|desprendible|correo|chat|contrato|incapacidad|certificacion|prueba|soporte|documento)/.test(text),
    hasSchedulingIntent:
      /(agenda|agendar|cita|consulta|reunion|reunirme|hablar con abogado|whatsapp|llamar|contactar|precio|valor|pagar|consignar|nequi|comprobante|respuesta experta)/.test(
        text,
      ),
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

function pickFlags(text: string) {
  const flags: string[] = [];

  if (/(embarazo|embarazada|maternidad)/.test(text)) flags.push("embarazo o maternidad");
  if (/(incapacidad|discapacidad|salud|enfermedad)/.test(text)) flags.push("salud o incapacidad");
  if (/(accidente|arl|culpa patronal)/.test(text)) flags.push("riesgo laboral");
  if (/(minimo vital|tutela|urgente)/.test(text)) flags.push("posible urgencia constitucional");
  if (/(audiencia|citacion|ministerio)/.test(text)) flags.push("termino o citacion");

  return flags;
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

  return Array.from(new Set(questions)).slice(0, 2);
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
    return "Hola. Te puedo orientar de forma general en derecho laboral colombiano y ayudarte a saber si conviene agendar una consulta. No reemplazo la revision de un abogado, pero si puedo ordenar el caso.\n\nPara empezar: ¿eres trabajador, empleador o empresa, y que situacion necesitas revisar?";
  }

  if (phase === "agendamiento") {
    return "Perfecto. El siguiente paso es agendar una consulta con un abogado laboral para revisar documentos, fechas y pruebas.\n\nTe sugiero enviar por WhatsApp un resumen corto del caso, tu ciudad, fechas clave y los documentos que tengas. Con eso el equipo puede decirte como avanzar sin que pierdas tiempo repitiendo todo desde cero.";
  }

  if (phase === "preguntas") {
    return `Te entiendo. Ya tengo una parte del caso, pero me falta este dato para darte una ruta clara:\n\n${formatNumberedList(clarifyingQuestions)}\n\nRespondeme eso en una frase y avanzo con la orientacion inicial.`;
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

  return `Respuesta inicial clara:\n\n1. Lo que entiendo: estas consultando por ${selectedRule.label} desde el perfil de ${roleLabelByType[lead.role]}.\n2. Lectura inicial: ${caseGuidance}\n3. Ruta sugerida: ${selectedRule.route}\n4. Urgencia: ${urgencyLabelByType[lead.urgency]}. ${urgencyLine}\n5. Documentos utiles: ${formatList(selectedRule.documents.slice(0, 4))}.${missingContext}\n\nMi recomendacion es agendar una consulta con un abogado laboral para revisar documentos, fechas y pruebas antes de tomar decisiones. Esta orientacion es general y no reemplaza la revision personalizada del caso.`;
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
    `Perfil: ${roleLabelByType[lead.role]}.`,
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

function formatList(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";

  return `${items.slice(0, -1).join(", ")} y ${items.at(-1)}`;
}

function formatNumberedList(items: string[]) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
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
