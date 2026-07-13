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

export type EnterpriseScenario = {
  title: string;
  points: string[];
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
  portrait?: string;
};

export type SocialProfile = {
  label: string;
  handle: string;
  href?: string;
};

export type InstitutionalValue = {
  title: string;
  text: string;
};

export const siteConfig = {
  name: "Leal Abogados Compañía",
  domain: "lealabogados.co",
  url: "https://lealabogados.co",
  description:
    "Firma jurídica colombiana con más de 18 años de experiencia en asesoría, representación y acompañamiento legal estratégico para personas, familias y empresas.",
  phone: "+57 315 284 9591",
  whatsappNumber: "573152849591",
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
  { label: "Quiénes somos", href: "/quienes-somos" },
  { label: "Áreas", href: "/areas-de-practica" },
  { label: "Empresas", href: "/servicios-empresariales" },
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
  "Atención remota en toda Colombia con reuniones coordinadas según el caso.",
  "Respuesta ágil, confidencial y personalizada.",
];

export const teamProfiles: TeamProfile[] = [
  {
    name: "Juan Berley Leal Bernal",
    role: "Fundador · Abogado litigante",
    portrait: "/assets/juan-berley-leal-bernal-oficial.png",
    summary:
      "Especialista en Derechos Humanos y conciliador extrajudicial en Derecho. Además de su amplia experiencia en litigio, se ha desempeñado como docente universitario en pregrado y posgrado, jurado de preparatorios, asesor y consultor de empresas.",
    highlights: [
      "Atención clara, confiable y estratégica",
      "Docencia universitaria y jurado de preparatorios",
      "Asesoría y consultoría a empresas",
    ],
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
    text: "La firma puede orientar y acompañar casos en toda Colombia con atención remota desde el primer contacto y reuniones coordinadas cuando el caso o la empresa lo requieran.",
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
      "Privación de patria potestad, filiación o medidas de protección",
      "Liquidación de sociedad conyugal, sociedad patrimonial u ocultamiento de bienes",
      "Unión marital de hecho o adopción de persona mayor de edad",
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
      "Procesos de sucesión notariales o judiciales",
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
      "Despido sin justa causa, liquidaciones laborales o prestaciones sociales",
      "Acoso laboral, indemnizaciones o estabilidad laboral reforzada",
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
      "Pensión de vejez, pensión de invalidez o de sobrevivientes",
      "Calificación de origen o pérdida de capacidad laboral",
      "Licencias de maternidad, incapacidades o pagos pendientes",
      "Defensa de derechos en salud, pensión o prestaciones del sistema de seguridad social",
    ],
    escalation:
      "Puede escalar a reclamación administrativa, tutela o proceso judicial.",
  },
  {
    title: "Derecho civil y trámites notariales",
    slug: "derecho-civil-tramites",
    summary:
      "Soluciones jurídicas en relaciones civiles, patrimoniales, contractuales y trámites notariales que exigen claridad y soporte jurídico.",
    signals: [
      "Contratos de arrendamiento o compraventa",
      "Responsabilidad civil, daños y perjuicios",
      "Procesos ejecutivos, cobro de cartera o restitución de inmuebles",
      "Conflictos contractuales o demandas de simulación",
    ],
    escalation:
      "Puede escalar a revisión contractual, trámite notarial, reclamación, proceso ejecutivo o demanda civil.",
  },
  {
    title: "Tutelas y acciones constitucionales",
    slug: "tutelas-acciones-constitucionales",
    summary:
      "Defensa de derechos fundamentales y definición de una ruta jurídica urgente cuando el caso lo exige.",
    signals: [
      "Salud, mínimo vital, pensiones, educación o estabilidad laboral",
      "Respuesta insuficiente de entidad pública o privada",
      "Mora judicial injustificada o vía de hecho",
      "Necesidad de incidente de desacato o defensa urgente del derecho afectado",
    ],
    escalation:
      "Puede escalar a tutela, incidente de desacato, reclamación previa o acompañamiento posterior.",
  },
  {
    title: "Empresas y prevención laboral",
    slug: "empresas-prevencion-laboral",
    summary:
      "Soporte jurídico preventivo para empleadores que necesitan respaldo en contratación, reglamentos, trámites y decisiones laborales sensibles.",
    signals: [
      "Reglamento interno de trabajo",
      "Contratación laboral, otrosíes y comunicaciones sensibles",
      "Trámites ante el Ministerio de Trabajo",
      "Riesgos laborales, accidentes y culpa patronal",
    ],
    escalation:
      "Puede escalar a acompañamiento mensual, ajuste de documentos laborales, concepto jurídico o representación en conflicto laboral.",
  },
];

export const enterpriseServices: EnterpriseService[] = [
  {
    title: "Reglamento interno de trabajo",
    summary:
      "Revisión, actualización o estructuración del reglamento interno con enfoque preventivo, claridad operativa y soporte legal.",
    deliverables: [
      "Diagnóstico inicial",
      "Mapa de ajustes prioritarios",
      "Versión lista para validación final",
    ],
  },
  {
    title: "Contratación laboral y soporte documental",
    summary:
      "Elaboración y revisión de contratos de trabajo, otrosíes, comunicaciones internas y soportes laborales sensibles antes de firmar o comunicar.",
    deliverables: [
      "Contratos y otrosíes revisados",
      "Observaciones jurídicas claras",
      "Recomendaciones de ajuste y uso interno",
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

export const enterpriseScenarios: EnterpriseScenario[] = [
  {
    title: "Contratación y estructura laboral",
    points: [
      "Contratos de trabajo y otrosíes",
      "Reglamento interno de trabajo",
      "Comunicaciones laborales sensibles",
    ],
  },
  {
    title: "Riesgos, seguridad social y contingencias",
    points: [
      "Incapacidades y licencias",
      "Accidentes o enfermedad laboral",
      "Culpa patronal y alertas de riesgo",
    ],
  },
  {
    title: "Trámites y defensa jurídica",
    points: [
      "Actuaciones ante el Ministerio de Trabajo",
      "Procesos judiciales laborales",
      "Acciones de tutela y recurso de casación",
    ],
  },
];

export const journeySteps = [
  {
    title: "1. Consulta con contexto",
    text: "El caso se estudia con hechos, soportes y objetivo del cliente. La prioridad es entender antes de prometer.",
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
    fit: "Empresas que necesitan resolver dudas puntuales y revisar decisiones laborales antes de asumir riesgos innecesarios.",
    includes: ["Consulta mensual", "Revisión inicial de situaciones prioritarias", "Alertas de riesgo"],
  },
  {
    name: "Acompañamiento laboral",
    fit: "Equipos con decisiones laborales recurrentes y necesidad de soporte preventivo con seguimiento claro.",
    includes: ["Canal de consultas programado", "Revisión de casos priorizados", "Informe ejecutivo"],
  },
  {
    name: "Soporte jurídico recurrente",
    fit: "Empresas que quieren reducir contingencias y fortalecer su soporte jurídico laboral de forma continua.",
    includes: ["Diagnóstico inicial", "Plan de ajustes", "Acompañamiento mensual"],
  },
];

export const firmProfile =
  "Leal Abogados nace ante la necesidad del cliente de que quien defienda sus derechos lo haga con compromiso real, transparente y guerrero. La firma entiende que detrás de cada caso existen situaciones personales, familiares y patrimoniales que requieren no solo atención jurídica formal, sino un trabajo combativo y eficaz.";

export const firmApproach =
  "Cada caso se asume con seriedad, empatía y firmeza, entendiendo que no existen causas pequeñas ni perdidas. La firma se compromete realmente con sus clientes bajo una idea central: Firmeza al defender, compromiso hasta el final.";

export const firmMission =
  "En Leal Abogados Compañía creemos que ejercer el derecho va más allá de llevar un proceso o resolver un problema jurídico. Nuestro compromiso es acompañar a personas, familias y empresas en momentos importantes de sus vidas, brindándoles respaldo, orientación y tranquilidad a través de una asesoría y acompañamiento cercano, honesto y profesional. Trabajamos cada caso con responsabilidad, compromiso y sentido humano, entendiendo que detrás de cada situación existen preocupaciones, decisiones difíciles y personas que necesitan ser apoyadas y defendidas con osadía hasta el final.";

export const firmVision =
  "En Leal Abogados Compañía nos proyectamos como una firma jurídica de alto reconocimiento a nivel nacional e internacional, destacada por su compromiso, su criterio profesional y la confianza que genera en cada cliente. Nuestra visión es consolidarnos como un referente en respaldo jurídico serio, transparente y comprometido, manteniendo los valores que nos identifican.";

export const institutionalValues: InstitutionalValue[] = [
  {
    title: "Compromiso",
    text: "Asumimos cada proceso con responsabilidad, lealtad y entrega, acompañando a nuestros clientes con valentía y respaldo real.",
  },
  {
    title: "Eficacia",
    text: "Nos orientamos a obtener soluciones reales y favorables para nuestros clientes.",
  },
  {
    title: "Confiabilidad",
    text: "Contamos con una trayectoria sólida, humana y confiable que nos permite brindar acompañamiento jurídico estratégico y eficaz.",
  },
];

export const generalObjective =
  "Defender con firmeza los derechos e intereses de quienes depositan su confianza en nuestra firma, asumiendo cada caso con compromiso, eficacia y confiabilidad.";

export const specificObjectives = [
  "Brindar una atención clara y cierta a cada cliente.",
  "Ofrecer soluciones jurídicas estratégicas y efectivas.",
  "Mantener una comunicación honesta y permanente en cada etapa del proceso.",
  "Estar a la vanguardia en la práctica jurídica.",
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
    text: "Prevenir un riesgo, responder una comunicación, reclamar, negociar, controvertir judicialmente o proteger un derecho urgente.",
  },
  {
    title: "Nivel de urgencia",
    text: "Si hay fechas límite, audiencias, despidos, amenazas, vencimientos o afectación inmediata de derechos.",
  },
];

export const escalationPaths: ConversionItem[] = [
  {
    title: "Acción constitucional",
    text: "Cuando es necesario defender un derecho fundamental y la vía ordinaria no ofrece una respuesta oportuna.",
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
