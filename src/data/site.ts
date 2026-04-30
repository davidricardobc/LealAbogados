export type PracticeArea = {
  title: string;
  slug: string;
  summary: string;
  signals: string[];
  escalation: string;
};

export type EnterpriseService = {
  title: string;
  summary: string;
  deliverables: string[];
};

export type ConversionItem = {
  title: string;
  text: string;
};

export const siteConfig = {
  name: "Leal Abogados",
  domain: "LealAbogados.co",
  url: "https://lealabogados.co",
  description:
    "Firma juridica colombiana orientada a consulta estrategica, prevencion y accion legal bien estructurada para personas y empresas.",
  phone: "+57 300 000 0000",
  whatsappNumber: "573000000000",
  email: "contacto@lealabogados.co",
  address: "Ciudad, Colombia",
  consultationMessage:
    "Hola, quiero agendar una consulta juridica con Leal Abogados. Mi caso esta relacionado con: ",
};

export const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  siteConfig.consultationMessage,
)}`;

export const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Areas", href: "/areas-de-practica" },
  { label: "Empresas", href: "/servicios-empresariales" },
  { label: "Consulta", href: "/consulta-juridica" },
  { label: "Contacto", href: "/contacto" },
];

export const practiceAreas: PracticeArea[] = [
  {
    title: "Laboral y seguridad social",
    slug: "laboral-seguridad-social",
    summary:
      "Orientacion para conflictos laborales, prestaciones, incapacidades, pensiones, despidos y decisiones que requieren soporte juridico claro.",
    signals: [
      "Terminacion o presion laboral",
      "Pago de acreencias e incapacidades",
      "Pension, afiliaciones o riesgos",
    ],
    escalation:
      "Puede escalar a reclamacion, conciliacion, proceso laboral o acompaniamiento preventivo.",
  },
  {
    title: "Familia",
    slug: "familia",
    summary:
      "Acompaniamiento en decisiones familiares sensibles con enfoque de claridad, proteccion patrimonial y actuacion oportuna.",
    signals: [
      "Cuotas alimentarias y custodia",
      "Divorcio o union marital",
      "Acuerdos familiares complejos",
    ],
    escalation:
      "Puede escalar a acuerdo, tramite notarial, conciliacion o proceso judicial.",
  },
  {
    title: "Testamentos y sucesiones",
    slug: "testamentos",
    summary:
      "Estructuracion preventiva para proteger la voluntad, reducir friccion familiar y ordenar decisiones patrimoniales.",
    signals: [
      "Planeacion de herencia",
      "Redaccion o revision de testamento",
      "Sucesion con desacuerdos",
    ],
    escalation:
      "Puede escalar a tramite notarial, sucesion, revision documental o estrategia preventiva.",
  },
  {
    title: "Tutelas y acciones constitucionales",
    slug: "tutelas-acciones-constitucionales",
    summary:
      "Analisis de vulneracion de derechos fundamentales y construccion de una ruta juridica accionable.",
    signals: [
      "Salud, minimo vital o educacion",
      "Respuesta insuficiente de entidad",
      "Riesgo urgente de derecho",
    ],
    escalation:
      "Puede escalar a tutela, incidente, desacato o acompaniamiento posterior.",
  },
  {
    title: "Denuncias, quejas y tramites",
    slug: "denuncias-quejas-tramites",
    summary:
      "Revision del caso para decidir si conviene denunciar, quejarse, solicitar informacion o agotar una via previa.",
    signals: [
      "Abuso, incumplimiento o negligencia",
      "Entidad publica o privada no responde",
      "Necesidad de dejar constancia formal",
    ],
    escalation:
      "Puede escalar a denuncia, queja, derecho de peticion, reclamacion o representacion.",
  },
  {
    title: "Acompaniamiento preventivo",
    slug: "acompanamiento-preventivo",
    summary:
      "Criterio legal antes de firmar, responder, contratar, renunciar, conciliar o tomar una decision irreversible.",
    signals: [
      "Revision antes de firmar",
      "Riesgo de conflicto",
      "Decision con impacto economico",
    ],
    escalation:
      "Puede escalar a revision documental, concepto, negociacion o seguimiento mensual.",
  },
  {
    title: "Empresas y compliance laboral",
    slug: "empresas-compliance-laboral",
    summary:
      "Soporte juridico preventivo para ordenar documentos, reducir contingencias laborales y tomar decisiones con respaldo.",
    signals: [
      "Reglamento interno de trabajo",
      "SG-SST y soporte laboral",
      "Revision documental recurrente",
    ],
    escalation:
      "Puede escalar a paquete mensual, auditoria documental o implementacion de medidas preventivas.",
  },
];

export const enterpriseServices: EnterpriseService[] = [
  {
    title: "Reglamento interno de trabajo",
    summary:
      "Revision, actualizacion o estructuracion del reglamento con enfoque preventivo y coherencia operativa.",
    deliverables: [
      "Diagnostico documental inicial",
      "Mapa de ajustes prioritarios",
      "Version editable lista para revision final",
    ],
  },
  {
    title: "Sistema de seguridad y salud en el trabajo",
    summary:
      "Acompaniamiento juridico para ordenar responsabilidades, soportes y decisiones asociadas al SG-SST.",
    deliverables: [
      "Revision de documentos clave",
      "Alertas de riesgo laboral",
      "Ruta de cumplimiento gradual",
    ],
  },
  {
    title: "Revision de documentos",
    summary:
      "Analisis de contratos, comunicaciones, politicas internas y documentos sensibles antes de firmar o enviar.",
    deliverables: [
      "Comentarios juridicos accionables",
      "Riesgos identificados",
      "Recomendaciones de redaccion",
    ],
  },
  {
    title: "Acompaniamiento preventivo mensual",
    summary:
      "Soporte recurrente para decisiones laborales, consultas internas y revision de casos antes de que escalen.",
    deliverables: [
      "Canal de consulta programado",
      "Revision de casos priorizados",
      "Informe ejecutivo mensual",
    ],
  },
];

export const journeySteps = [
  {
    title: "1. Consulta con contexto",
    text: "El caso se ordena con hechos, documentos y objetivo del cliente. La prioridad es entender antes de prometer.",
  },
  {
    title: "2. Criterio juridico",
    text: "Se identifican riesgos, escenarios, rutas posibles y el costo de actuar o esperar.",
  },
  {
    title: "3. Ruta de accion",
    text: "Si el caso lo amerita, la consulta se convierte en tutela, queja, tramite, proceso o acompanamiento preventivo.",
  },
  {
    title: "4. Seguimiento",
    text: "Los servicios de mayor valor se estructuran con entregables, tiempos y alcance claros.",
  },
];

export const companyPackages = [
  {
    name: "Base preventiva",
    fit: "Empresas que necesitan ordenar documentos y resolver dudas puntuales.",
    includes: ["Consulta mensual", "Revision documental limitada", "Alertas de riesgo"],
  },
  {
    name: "Gestion laboral",
    fit: "Equipos con decisiones laborales recurrentes y necesidad de soporte preventivo.",
    includes: ["Canal de consultas", "Revision de casos", "Informe ejecutivo"],
  },
  {
    name: "Compliance laboral",
    fit: "Empresas que quieren reducir contingencias y mejorar soporte documental.",
    includes: ["Diagnostico inicial", "Plan de ajustes", "Acompaniamiento mensual"],
  },
];

export const consultationChecklist: ConversionItem[] = [
  {
    title: "Hechos principales",
    text: "Que ocurrio, cuando ocurrio, quienes intervinieron y que respuesta necesitas tomar ahora.",
  },
  {
    title: "Documentos disponibles",
    text: "Contratos, chats, cartas, respuestas de entidades, soportes de pago o cualquier evidencia relevante.",
  },
  {
    title: "Objetivo del cliente",
    text: "Prevenir un riesgo, responder una comunicacion, reclamar, negociar, demandar o proteger un derecho urgente.",
  },
  {
    title: "Nivel de urgencia",
    text: "Si hay fechas limite, audiencias, despidos, amenazas, vencimientos o afectacion inmediata de derechos.",
  },
];

export const escalationPaths: ConversionItem[] = [
  {
    title: "Accion constitucional",
    text: "Cuando existe vulneracion de derechos fundamentales y una respuesta ordinaria no es suficiente.",
  },
  {
    title: "Reclamacion o queja",
    text: "Cuando conviene dejar constancia formal, exigir respuesta o agotar una via previa.",
  },
  {
    title: "Proceso judicial",
    text: "Cuando hay base probatoria, pretension clara y una estrategia razonable para litigar.",
  },
  {
    title: "Prevencion o acompanamiento",
    text: "Cuando actuar antes de firmar, responder o contratar reduce el costo del problema.",
  },
];

export const trustPrinciples = [
  "Sin promesas de resultado.",
  "Alcance y honorarios claros antes de escalar.",
  "Recomendacion basada en hechos y documentos.",
  "Prioridad en prevenir errores evitables.",
];
