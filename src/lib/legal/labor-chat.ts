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

export type LaborChatResult = {
  reply: string;
  lead: LaborLead;
  quickReplies: string[];
  ctaLabel: string;
  shouldEscalate: boolean;
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
  { role: "empresa", keywords: ["mi empresa", "somos empresa", "tenemos empleados", "trabajadores", "nomina"] },
  { role: "empleador", keywords: ["soy empleador", "empleador", "quiero despedir", "quiero sancionar"] },
  { role: "trabajador", keywords: ["soy trabajador", "me despidieron", "trabajo en", "mi jefe", "mi empresa no me"] },
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
  const missingFields = pickMissingFields(searchableText);
  const flags = pickFlags(searchableText);
  const shouldEscalate = urgency === "critica" || urgency === "alta" || selectedRule.type !== "otro";
  const recommendedNextStep: LaborRecommendedNextStep =
    urgency === "critica" ? "urgente_abogado" : shouldEscalate ? "consulta" : "orientacion_general";

  const lead: LaborLead = {
    role,
    caseType: selectedRule.type,
    urgency,
    summary: buildSummary(latestUserText || fullText),
    documents: selectedRule.documents,
    missingFields,
    recommendedNextStep,
    flags,
  };

  const reply = buildReply({
    latestSearchableText,
    lead,
    selectedRule,
    shouldEscalate,
  });

  return {
    reply,
    lead,
    quickReplies: buildQuickReplies(lead, selectedRule),
    ctaLabel: urgency === "critica" ? "Hablar con un abogado" : "Agendar por WhatsApp",
    shouldEscalate,
    whatsappMessage: buildWhatsappMessage(lead),
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

function pickMissingFields(text: string) {
  const missingFields: string[] = [];
  const hasDate =
    /\b\d{1,2}[/-]\d{1,2}([/-]\d{2,4})?\b/.test(text) ||
    /(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ayer|hoy|manana|semana pasada|mes pasado)/.test(
      text,
    );
  const hasCity = /(bogota|medellin|cali|barranquilla|cartagena|bucaramanga|villavicencio|colombia|ciudad|departamento)/.test(text);
  const hasContract = /(contrato|verbal|indefinido|fijo|obra labor|prestacion de servicios|ops)/.test(text);
  const hasDocuments = /(carta|liquidacion|desprendible|correo|chat|contrato|incapacidad|certificacion|prueba)/.test(text);

  if (!hasDate) missingFields.push("fecha clave");
  if (!hasCity) missingFields.push("ciudad");
  if (!hasContract) missingFields.push("tipo de vinculacion");
  if (!hasDocuments) missingFields.push("documentos o pruebas");

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

function buildReply({
  latestSearchableText,
  lead,
  selectedRule,
  shouldEscalate,
}: {
  latestSearchableText: string;
  lead: LaborLead;
  selectedRule: CaseRule;
  shouldEscalate: boolean;
}) {
  if (!latestSearchableText || /^(hola|buenas|buenos dias|buenas tardes|buenas noches)$/.test(latestSearchableText)) {
    return "Hola. Te puedo orientar de forma general en derecho laboral colombiano y ayudarte a saber si conviene agendar una consulta. No reemplazo la revision de un abogado, pero si puedo ordenar el caso.\n\nPara empezar: ¿eres trabajador, empleador o empresa, y que situacion necesitas revisar?";
  }

  const limit =
    "Te puedo orientar de forma general, pero esto no reemplaza la revision de un abogado con documentos, fechas y pruebas.";
  const urgencyLine =
    lead.urgency === "critica"
      ? "Por las senales que aparecen, conviene que un abogado lo revise con prioridad."
      : shouldEscalate
        ? "Por lo que cuentas, si conviene revisar el caso con abogado antes de tomar decisiones."
        : "Todavia falta contexto para saber si hay una ruta juridica concreta.";
  const missingLine = lead.missingFields.length
    ? `Antes de cerrar la ruta, falta precisar: ${formatList(lead.missingFields)}.`
    : "Con esa informacion ya se puede preparar mejor la consulta inicial.";

  return `Esto parece relacionado con ${selectedRule.label}. ${selectedRule.route} ${urgencyLine} ${limit}\n\n${missingLine} ${selectedRule.followUp}`;
}

function buildQuickReplies(lead: LaborLead, selectedRule: CaseRule) {
  const replies = new Set<string>();

  if (lead.missingFields.includes("fecha clave")) replies.add("Ocurrio esta semana");
  if (lead.missingFields.includes("ciudad")) replies.add("Estoy en Colombia");
  if (lead.missingFields.includes("tipo de vinculacion")) replies.add("Tenia contrato escrito");
  if (lead.missingFields.includes("documentos o pruebas")) replies.add("Tengo documentos");
  if (lead.urgency === "critica" || lead.urgency === "alta") replies.add("Quiero agendar consulta");

  replies.add(selectedRule.followUp);

  return Array.from(replies).slice(0, 4);
}

function buildWhatsappMessage(lead: LaborLead) {
  return [
    "Hola, quiero agendar una consulta laboral con Leal Abogados.",
    `Tema: ${caseLabelByType[lead.caseType]}.`,
    `Urgencia: ${urgencyLabelByType[lead.urgency]}.`,
    `Perfil: ${roleLabelByType[lead.role]}.`,
    `Resumen: ${lead.summary || "Pendiente de ampliar en consulta"}.`,
    lead.flags.length ? `Senales sensibles: ${formatList(lead.flags)}.` : "",
    lead.documents.length ? `Documentos sugeridos para revisar: ${formatList(lead.documents)}.` : "",
    "Fuente: chatbot laboral web.",
  ]
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
