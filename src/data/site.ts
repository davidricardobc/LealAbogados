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

export type TeamProfile = {
  name: string;
  role: string;
  summary: string;
  highlights: string[];
};

export type SocialProfile = {
  label: string;
  handle: string;
  href?: string;
};

export const siteConfig = {
  name: "Leal Abogados Compañía",
  domain: "lealabogados.co",
  url: "https://lealabogados.co",
  description:
    "Firma jurídica colombiana con más de 18 años de experiencia en asesoría, representación y acompañamiento legal estratégico para personas, familias y empresas.",
  phone: "+57 300 000 0000",
  whatsappNumber: "573000000000",
  email: "contacto@lealabogados.co",
  address: "Colombia",
  instagram: "https://www.instagram.com/lealabogados2015",
  instagramHandle: "@lealabogados2015",
  facebookLabel: "Abogado LEAL",
  facebookUrl: "",
  founder: "Juan Berley Leal Bernal",
  consultationMessage:
    "Hola, quiero agendar una consulta jurídica con Leal Abogados. Mi caso está relacionado con: ",
};

export const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  siteConfig.consultationMessage,
)}`;

export const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Áreas", href: "/areas-de-practica" },
  { label: "Empresas", href: "/servicios-empresariales" },
  { label: "Consulta", href: "/consulta-juridica" },
  { label: "Contacto", href: "/contacto" },
];

export const socialProfiles: SocialProfile[] = [
  {
    label: "Instagram",
    handle: "@lealabogados2015",
    href: siteConfig.instagram,
  },
  {
    label: "Facebook",
    handle: "Abogado LEAL",
    href: siteConfig.facebookUrl || undefined,
  },
];

export const trustHighlights = [
  "Más de 18 años de experiencia.",
  "Especialista en Derechos Humanos.",
  "Atención 100% remota en toda Colombia.",
  "Respuesta ágil, confidencial y personalizada.",
];

export const teamProfiles: TeamProfile[] = [
  {
    name: "Juan Berley Leal Bernal",
    role: "Fundador · Abogado litigante",
    summary:
      "Especialista en Derechos Humanos y conciliador extrajudicial en Derecho. Ha combinado litigio, docencia universitaria, consultoría y asesoría empresarial con un enfoque firme y estratégico.",
    highlights: ["Litigio y representación", "Docencia universitaria", "Consultoría y asesoría a empresas"],
  },
  {
    name: "Diana Carolina Leal Neira",
    role: "Gerencia general",
    summary:
      "Administradora de Empresas con experiencia en sector financiero, gestión de calidad y procesos. Refuerza una experiencia de cliente responsable, moderna y ordenada.",
    highlights: ["Atención personalizada", "Gestión de calidad", "Mejora continua y procesos"],
  },
];

export const valuePillars = [
  {
    title: "Compromiso real",
    text: "Cada caso se asume con responsabilidad, lealtad y seguimiento serio de principio a fin.",
  },
  {
    title: "Estrategia clara",
    text: "La consulta busca ordenar hechos, riesgos y documentos antes de actuar o escalar el caso.",
  },
  {
    title: "Confianza y transparencia",
    text: "Comunicación honesta, alcance claro y recomendación basada en hechos, no en promesas vacías.",
  },
  {
    title: "Cobertura nacional remota",
    text: "La firma puede orientar y acompañar casos en toda Colombia con atención remota, rápida y ordenada desde el primer contacto.",
  },
];

export const practiceAreas: PracticeArea[] = [
  {
    title: "Derecho de familia",
    slug: "derecho-familia",
    summary:
      "Asesoría y representación en asuntos familiares sensibles, priorizando soluciones justas, protección de derechos y claridad patrimonial.",
    signals: [
      "Divorcios de mutuo acuerdo o contenciosos",
      "Custodia, régimen de visitas y cuota alimentaria",
      "Unión marital de hecho, filiación o medidas de protección",
      "Liquidación de sociedad conyugal u ocultamiento de bienes",
    ],
    escalation:
      "Puede escalar a acuerdo, conciliación, trámite notarial, medida de protección o proceso judicial.",
  },
  {
    title: "Sucesiones y testamentos",
    slug: "sucesiones-testamentos",
    summary:
      "Acompañamiento en procesos sucesorales, conflictos entre herederos, planificación patrimonial y revisión de testamentos.",
    signals: [
      "Sucesión notarial o judicial",
      "Petición de herencia o conflicto entre herederos",
      "Elaboración, revisión o nulidad de testamento",
      "Desheredamiento, indignidad sucesoral o planificación patrimonial",
    ],
    escalation:
      "Puede escalar a trámite notarial, proceso judicial, estrategia patrimonial o representación en controversia sucesoral.",
  },
  {
    title: "Derecho laboral",
    slug: "derecho-laboral",
    summary:
      "Defensa de derechos de trabajadores y asesoría a empleadores en relaciones laborales, contratación, reglamentos y conflictos.",
    signals: [
      "Despido sin justa causa, liquidación o prestaciones sociales",
      "Acoso laboral, indemnización o estabilidad laboral reforzada",
      "Contratos de trabajo, reglamento interno o trámites ante el Ministerio",
      "Procesos judiciales, tutelas o recurso de casación",
    ],
    escalation:
      "Puede escalar a reclamación, conciliación, proceso laboral, tutela, casación o acompañamiento preventivo empresarial.",
  },
  {
    title: "Seguridad social",
    slug: "seguridad-social",
    summary:
      "Orientación y representación en pensiones, incapacidades, licencias y calificación de origen o pérdida de capacidad laboral.",
    signals: [
      "Pensión de vejez, invalidez o sobrevivientes",
      "Calificación de origen o pérdida de capacidad laboral",
      "Licencias de maternidad, incapacidades o pagos pendientes",
      "Tutelas por afectación de derechos en seguridad social",
    ],
    escalation:
      "Puede escalar a reclamación administrativa, tutela, proceso judicial o seguimiento frente a entidad responsable.",
  },
  {
    title: "Derecho civil y trámites notariales",
    slug: "derecho-civil-tramites",
    summary:
      "Soluciones jurídicas en relaciones civiles, patrimoniales, contractuales y trámites notariales que requieren precisión documental.",
    signals: [
      "Contratos de arrendamiento o compraventa",
      "Responsabilidad civil, daños y perjuicios",
      "Procesos ejecutivos, cobro de cartera o restitución de inmueble",
      "Conflictos contractuales o demandas de simulación",
    ],
    escalation:
      "Puede escalar a revisión contractual, trámite notarial, reclamación, proceso ejecutivo o demanda civil.",
  },
  {
    title: "Tutelas y acciones constitucionales",
    slug: "tutelas-acciones-constitucionales",
    summary:
      "Análisis de vulneración de derechos fundamentales y construcción de una ruta jurídica accionable cuando existe urgencia.",
    signals: [
      "Salud, mínimo vital, pensiones, educación o estabilidad laboral",
      "Respuesta insuficiente de entidad pública o privada",
      "Riesgo urgente de derecho fundamental",
      "Necesidad de incidente, desacato o seguimiento posterior",
    ],
    escalation:
      "Puede escalar a tutela, incidente de desacato, reclamación previa o acompañamiento posterior.",
  },
  {
    title: "Empresas y prevención laboral",
    slug: "empresas-prevencion-laboral",
    summary:
      "Soporte jurídico preventivo para empleadores que necesitan ordenar contratos, reglamentos, trámites y decisiones laborales.",
    signals: [
      "Reglamento interno de trabajo",
      "Contratación laboral y revisión documental",
      "Trámites ante el Ministerio de Trabajo",
      "Riesgos laborales, accidentes y culpa patronal",
    ],
    escalation:
      "Puede escalar a paquete mensual, auditoría documental, implementación preventiva o representación en conflicto laboral.",
  },
];

export const enterpriseServices: EnterpriseService[] = [
  {
    title: "Reglamento interno de trabajo",
    summary:
      "Revisión, actualización o estructuración del reglamento interno con enfoque preventivo, claridad operativa y soporte legal.",
    deliverables: [
      "Diagnóstico documental inicial",
      "Mapa de ajustes prioritarios",
      "Versión editable lista para revisión final",
    ],
  },
  {
    title: "Contratación laboral y documentos internos",
    summary:
      "Elaboración y revisión de contratos de trabajo, comunicaciones internas y documentos laborales sensibles antes de firmar o enviar.",
    deliverables: [
      "Contratos y otrosíes revisados",
      "Comentarios jurídicos accionables",
      "Recomendaciones de redacción y archivo",
    ],
  },
  {
    title: "Seguridad social y riesgos laborales",
    summary:
      "Acompañamiento jurídico en asuntos asociados a incapacidades, licencias, accidentes laborales, enfermedad laboral y culpa patronal.",
    deliverables: [
      "Revisión de soportes y cronología",
      "Alertas de riesgo laboral",
      "Ruta de reclamación o defensa",
    ],
  },
  {
    title: "Acompañamiento preventivo mensual",
    summary:
      "Soporte recurrente para consultas laborales, revisión de casos y decisiones preventivas antes de que escalen a conflicto.",
    deliverables: [
      "Canal de consulta programado",
      "Revisión de casos priorizados",
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
    title: "2. Criterio jurídico",
    text: "Se identifican riesgos, escenarios, rutas posibles y el costo de actuar o esperar.",
  },
  {
    title: "3. Ruta de acción",
    text: "Si el caso lo amerita, la consulta se convierte en tutela, trámite, reclamación, proceso o acompañamiento preventivo.",
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
    includes: ["Consulta mensual", "Revisión documental limitada", "Alertas de riesgo"],
  },
  {
    name: "Gestión laboral",
    fit: "Equipos con decisiones laborales recurrentes y necesidad de soporte preventivo.",
    includes: ["Canal de consultas", "Revisión de casos", "Informe ejecutivo"],
  },
  {
    name: "Compliance laboral",
    fit: "Empresas que quieren reducir contingencias y mejorar soporte documental.",
    includes: ["Diagnóstico inicial", "Plan de ajustes", "Acompañamiento mensual"],
  },
];

export const consultationChecklist: ConversionItem[] = [
  {
    title: "Hechos principales",
    text: "Qué ocurrió, cuándo ocurrió, quiénes intervinieron y qué respuesta necesitas tomar ahora.",
  },
  {
    title: "Documentos disponibles",
    text: "Contratos, chats, cartas, respuestas de entidades, soportes de pago o cualquier evidencia relevante.",
  },
  {
    title: "Objetivo del cliente",
    text: "Prevenir un riesgo, responder una comunicación, reclamar, negociar, demandar o proteger un derecho urgente.",
  },
  {
    title: "Nivel de urgencia",
    text: "Si hay fechas límite, audiencias, despidos, amenazas, vencimientos o afectación inmediata de derechos.",
  },
];

export const escalationPaths: ConversionItem[] = [
  {
    title: "Acción constitucional",
    text: "Cuando existe vulneración de derechos fundamentales y una respuesta ordinaria no es suficiente.",
  },
  {
    title: "Reclamación o queja",
    text: "Cuando conviene dejar constancia formal, exigir respuesta o agotar una vía previa.",
  },
  {
    title: "Proceso judicial",
    text: "Cuando hay base probatoria, pretension clara y una estrategia razonable para litigar.",
  },
  {
    title: "Prevención o acompañamiento",
    text: "Cuando actuar antes de firmar, responder o contratar reduce el costo del problema.",
  },
];

export const trustPrinciples = [
  "Más de 18 años de experiencia.",
  "Atención personalizada y confidencial.",
  "Especialista en Derechos Humanos y conciliación extrajudicial.",
  "Comunicación clara y transparente.",
  "Sin promesas de resultado.",
  "Alcance y honorarios claros antes de escalar.",
  "Recomendación basada en hechos y documentos.",
  "Prioridad en prevenir errores evitables.",
];
