export type PracticeArea = {
  title: string;
  slug: string;
  summary: string;
  signals: string[];
  escalation: string;
};

export type LocalMarket = {
  name: string;
  type: "AdministrativeArea" | "City" | "Country";
};

export type ServiceSeoPage = {
  title: string;
  slug: string;
  practiceAreaSlug: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
  intro: string;
  focusKeywords: string[];
  situations: string[];
  process: string[];
  localIntro: string;
  faq: {
    question: string;
    answer: string;
  }[];
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
    "Firma jurídica colombiana con más de 18 años de experiencia en Meta, Cundinamarca, Bogotá y toda Colombia, con asesoría, representación y acompañamiento legal estratégico para personas, familias y empresas.",
  phone: "+57 315 284 9591",
  whatsappNumber: "573152849591",
  email: "contactolealabogados@gmail.com",
  address: "Atención en Meta, Cundinamarca, Bogotá y toda Colombia",
  primaryMarkets: ["Meta", "Cundinamarca", "Bogotá"],
  instagram: "https://www.instagram.com/lealabogadosoficial",
  instagramHandle: "@lealabogadosoficial",
  facebookLabel: "Abogado LEAL",
  facebookUrl: "",
  founder: "Juan Berley Leal Bernal",
  consultationMessage:
    "Hola, quiero agendar una consulta jurídica con Leal Abogados. Mi caso está relacionado con: ",
};

export const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  siteConfig.consultationMessage,
)}`;

export function buildWhatsappUrl(message = siteConfig.consultationMessage) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappLinks = {
  general: buildWhatsappUrl("Hola, quiero agendar una consulta jurídica con Leal Abogados. Mi caso está relacionado con: "),
  consultation: buildWhatsappUrl("Hola, quiero agendar una consulta jurídica con Leal Abogados. Quiero revisar mi caso y definir una ruta de acción."),
  enterprise: buildWhatsappUrl("Hola, quiero orientación jurídica empresarial con Leal Abogados. Me interesa revisar una situación preventiva o laboral de mi empresa."),
  contact: buildWhatsappUrl("Hola, quiero contactar a Leal Abogados para iniciar una consulta jurídica."),
};

export const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Quiénes somos", href: "/quienes-somos" },
  { label: "Áreas", href: "/areas-de-practica" },
  { label: "Empresas", href: "/servicios-empresariales" },
];

export const socialProfiles: SocialProfile[] = [];

export const trustHighlights = [
  "Más de 18 años de experiencia.",
  "Especialista en Derechos Humanos.",
  "Atención prioritaria en Meta, Cundinamarca y Bogotá, con cobertura remota en toda Colombia.",
  "Respuesta ágil, confidencial y personalizada.",
];

export const localMarkets: LocalMarket[] = [
  { name: "Meta", type: "AdministrativeArea" },
  { name: "Cundinamarca", type: "AdministrativeArea" },
  { name: "Bogotá", type: "City" },
  { name: "Colombia", type: "Country" },
];

export const teamProfiles: TeamProfile[] = [
  {
    name: "Juan Berley Leal Bernal",
    role: "Fundador · Abogado litigante",
    portrait: "/assets/juan-berley-leal-bernal.png",
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

export const serviceSeoPages: ServiceSeoPage[] = [
  {
    title: "Abogado laboral",
    slug: "abogado-laboral",
    practiceAreaSlug: "derecho-laboral",
    metaTitle: "Abogado laboral en Meta, Cundinamarca y Bogotá",
    metaDescription:
      "Abogado laboral para despidos, liquidaciones, acoso laboral, estabilidad reforzada, contratos y procesos laborales en Meta, Cundinamarca, Bogotá y Colombia.",
    heroTitle: "Abogado laboral en Meta, Cundinamarca, Bogotá y toda Colombia.",
    heroDescription:
      "Orientación y representación en conflictos laborales para trabajadores, empleadores y empresas que necesitan actuar con criterio antes de reclamar, responder o conciliar.",
    intro:
      "Un caso laboral exige ordenar fechas, documentos, pagos, comunicaciones y riesgos antes de tomar una decisión. Leal Abogados acompaña asuntos laborales con enfoque estratégico, tanto para reclamaciones de trabajadores como para prevención y defensa de empleadores.",
    focusKeywords: [
      "abogado laboral en Meta",
      "abogado laboral en Cundinamarca",
      "abogado laboral en Bogotá",
      "liquidación laboral Colombia",
      "despido sin justa causa",
    ],
    situations: [
      "Despido sin justa causa, indemnización o liquidación incompleta",
      "Acoso laboral, sanciones, llamados de atención o terminación sensible",
      "Estabilidad laboral reforzada, incapacidades o fuero",
      "Contratos de trabajo, otrosíes, reglamento interno y decisiones empresariales",
      "Reclamaciones, conciliaciones, tutelas, procesos laborales o casación",
    ],
    process: [
      "Revisión de contrato, soportes de pago, comunicaciones y cronología del caso",
      "Identificación de derechos reclamables, riesgos probatorios y posibles salidas",
      "Definición de ruta: reclamación, conciliación, tutela, proceso o prevención empresarial",
    ],
    localIntro:
      "La firma prioriza casos laborales en Meta, Cundinamarca y Bogotá, y también atiende clientes en otras ciudades de Colombia mediante reuniones remotas y coordinación documental.",
    faq: [
      {
        question: "¿Atienden casos laborales en Villavicencio, municipios del Meta, Cundinamarca y Bogotá?",
        answer:
          "Sí. Leal Abogados prioriza Meta, Cundinamarca y Bogotá, y puede orientar casos laborales en toda Colombia cuando la documentación permite avanzar de forma remota o coordinada.",
      },
      {
        question: "¿Qué documentos debo tener para una consulta laboral?",
        answer:
          "Contrato, desprendibles de pago, liquidación, comunicaciones, chats, incapacidades, llamados de atención y cualquier soporte que ayude a reconstruir la cronología.",
      },
      {
        question: "¿La consulta sirve antes de demandar?",
        answer:
          "Sí. La consulta permite medir viabilidad, riesgos, tiempos y alternativas antes de iniciar una reclamación, conciliación o proceso judicial.",
      },
    ],
  },
  {
    title: "Abogado de familia",
    slug: "abogado-de-familia",
    practiceAreaSlug: "derecho-familia",
    metaTitle: "Abogado de familia en Meta, Cundinamarca y Bogotá",
    metaDescription:
      "Abogado de familia para divorcios, custodia, alimentos, unión marital, sociedad conyugal y conflictos familiares en Meta, Cundinamarca, Bogotá y Colombia.",
    heroTitle: "Abogado de familia en Meta, Cundinamarca, Bogotá y toda Colombia.",
    heroDescription:
      "Acompañamiento jurídico en decisiones familiares sensibles, con claridad sobre derechos, patrimonio, menores de edad y rutas de conciliación o proceso.",
    intro:
      "Los asuntos de familia mezclan emociones, patrimonio y decisiones de largo alcance. Por eso la primera tarea es ordenar el caso, proteger derechos y evitar actuaciones impulsivas que compliquen una conciliación o un proceso.",
    focusKeywords: [
      "abogado de familia en Meta",
      "abogado de familia en Cundinamarca",
      "abogado de familia en Bogotá",
      "divorcio en Colombia",
      "cuota alimentaria Colombia",
    ],
    situations: [
      "Divorcios de mutuo acuerdo o contenciosos",
      "Custodia, visitas, cuota alimentaria o medidas de protección",
      "Unión marital de hecho y sociedad patrimonial",
      "Liquidación de sociedad conyugal u ocultamiento de bienes",
      "Filiación, patria potestad o adopción de persona mayor de edad",
    ],
    process: [
      "Ordenar hechos familiares, documentos civiles, bienes y acuerdos existentes",
      "Definir si conviene conciliación, trámite notarial, medida urgente o proceso judicial",
      "Preparar una ruta que cuide derechos, tiempos y soportes probatorios",
    ],
    localIntro:
      "La atención se enfoca en Meta, Cundinamarca y Bogotá, con posibilidad de consulta remota para familias ubicadas en otras ciudades de Colombia.",
    faq: [
      {
        question: "¿Puedo iniciar una consulta de familia si vivo fuera de Bogotá?",
        answer:
          "Sí. La primera revisión puede hacerse de forma remota para clientes en Meta, Cundinamarca, Bogotá o cualquier ciudad de Colombia.",
      },
      {
        question: "¿Todo caso de familia debe terminar en demanda?",
        answer:
          "No. Según el caso, puede ser mejor buscar conciliación, trámite notarial, acuerdo formal o proceso judicial.",
      },
      {
        question: "¿Qué debo llevar a una consulta de familia?",
        answer:
          "Registros civiles, documentos de bienes, acuerdos previos, chats, soportes de pago, citaciones y cualquier evidencia relacionada con menores o patrimonio.",
      },
    ],
  },
  {
    title: "Abogado de sucesiones",
    slug: "abogado-sucesiones",
    practiceAreaSlug: "sucesiones-testamentos",
    metaTitle: "Abogado de sucesiones en Meta, Cundinamarca y Bogotá",
    metaDescription:
      "Abogado para sucesiones, herencias, testamentos, conflictos entre herederos y trámites notariales o judiciales en Meta, Cundinamarca, Bogotá y Colombia.",
    heroTitle: "Abogado de sucesiones en Meta, Cundinamarca, Bogotá y toda Colombia.",
    heroDescription:
      "Acompañamiento en herencias, testamentos y conflictos patrimoniales para definir si el caso debe avanzar por vía notarial, judicial o estratégica.",
    intro:
      "Una sucesión mal ordenada puede convertirse en conflicto entre herederos, pérdida de tiempo o bloqueo patrimonial. La consulta permite revisar bienes, herederos, testamentos, deudas y riesgos antes de iniciar el trámite.",
    focusKeywords: [
      "abogado de sucesiones en Meta",
      "abogado de sucesiones en Cundinamarca",
      "abogado de sucesiones en Bogotá",
      "sucesión notarial Colombia",
      "conflicto entre herederos",
    ],
    situations: [
      "Sucesiones notariales o judiciales",
      "Conflictos entre herederos o petición de herencia",
      "Elaboración, revisión o nulidad de testamento",
      "Desheredamiento, indignidad sucesoral o planeación patrimonial",
      "Bienes sin repartir, deudas sucesorales o desacuerdos familiares",
    ],
    process: [
      "Identificar herederos, bienes, deudas, documentos civiles y posibles conflictos",
      "Definir si procede trámite notarial, proceso judicial o negociación entre interesados",
      "Preparar documentos, estrategia y representación según la complejidad del patrimonio",
    ],
    localIntro:
      "Leal Abogados prioriza sucesiones en Meta, Cundinamarca y Bogotá, y puede orientar procesos con bienes o herederos en distintas zonas de Colombia.",
    faq: [
      {
        question: "¿Una sucesión puede hacerse por notaría?",
        answer:
          "Puede hacerse por notaría cuando se cumplen las condiciones legales y existe acuerdo suficiente. Si hay conflicto, puede requerir vía judicial.",
      },
      {
        question: "¿Qué información se revisa primero en una sucesión?",
        answer:
          "Herederos, registros civiles, bienes, deudas, testamento si existe, acuerdos previos y posibles controversias.",
      },
      {
        question: "¿Atienden sucesiones con herederos en varias ciudades?",
        answer:
          "Sí. Se puede iniciar con revisión remota y coordinar la ruta según ubicación de herederos, bienes y trámite aplicable.",
      },
    ],
  },
  {
    title: "Abogado de seguridad social",
    slug: "abogado-seguridad-social",
    practiceAreaSlug: "seguridad-social",
    metaTitle: "Abogado de seguridad social en Meta, Cundinamarca y Bogotá",
    metaDescription:
      "Abogado para pensiones, incapacidades, licencias, salud, calificación de pérdida laboral y seguridad social en Meta, Cundinamarca, Bogotá y Colombia.",
    heroTitle: "Abogado de seguridad social en Meta, Cundinamarca, Bogotá y toda Colombia.",
    heroDescription:
      "Orientación jurídica para reclamar, controvertir o proteger derechos relacionados con pensiones, salud, incapacidades y pérdida de capacidad laboral.",
    intro:
      "Los problemas de seguridad social suelen depender de historia laboral, semanas cotizadas, dictámenes, incapacidades, respuestas de entidades y tiempos estrictos. Una revisión estratégica ayuda a escoger la vía correcta.",
    focusKeywords: [
      "abogado seguridad social Meta",
      "abogado seguridad social Cundinamarca",
      "abogado seguridad social Bogotá",
      "pensión de invalidez Colombia",
      "incapacidades laborales Colombia",
    ],
    situations: [
      "Pensión de vejez, invalidez o sobrevivientes",
      "Calificación de origen o pérdida de capacidad laboral",
      "Incapacidades, licencias de maternidad o pagos pendientes",
      "Negaciones o demoras de EPS, fondo de pensiones, ARL o entidad responsable",
      "Tutelas o procesos para proteger derechos en salud y pensión",
    ],
    process: [
      "Revisión de historia laboral, dictámenes, incapacidades y respuestas de entidades",
      "Identificación de vía administrativa, tutela o proceso judicial",
      "Preparación de reclamación, acción o estrategia de seguimiento",
    ],
    localIntro:
      "La firma atiende asuntos de seguridad social con prioridad en Meta, Cundinamarca y Bogotá, y acompaña casos remotos en toda Colombia.",
    faq: [
      {
        question: "¿Una tutela sirve para casos de salud o pensión?",
        answer:
          "Puede servir cuando hay afectación de derechos fundamentales y la situación exige una respuesta urgente. Cada caso debe revisarse con documentos.",
      },
      {
        question: "¿Qué documentos ayudan en casos de seguridad social?",
        answer:
          "Historia laboral, incapacidades, dictámenes, conceptos médicos, respuestas de EPS, fondo de pensión o ARL, y comunicaciones relacionadas.",
      },
      {
        question: "¿Atienden reclamaciones contra EPS, ARL o fondos de pensión?",
        answer:
          "Sí. La consulta revisa la entidad involucrada, la respuesta recibida y la vía más conveniente para reclamar o escalar.",
      },
    ],
  },
  {
    title: "Abogado para tutelas",
    slug: "abogado-tutelas",
    practiceAreaSlug: "tutelas-acciones-constitucionales",
    metaTitle: "Abogado para tutelas en Meta, Cundinamarca y Bogotá",
    metaDescription:
      "Abogado para tutelas, incidentes de desacato y defensa de derechos fundamentales en salud, pensión, trabajo y educación en Meta, Cundinamarca, Bogotá y Colombia.",
    heroTitle: "Abogado para tutelas en Meta, Cundinamarca, Bogotá y toda Colombia.",
    heroDescription:
      "Defensa de derechos fundamentales cuando existe urgencia, respuesta insuficiente o riesgo actual que exige una ruta constitucional bien sustentada.",
    intro:
      "La tutela requiere claridad: no basta con sentir que hubo una injusticia. Es necesario identificar el derecho fundamental afectado, la urgencia, la entidad responsable y las pruebas que muestran la vulneración.",
    focusKeywords: [
      "abogado tutela Meta",
      "abogado tutela Cundinamarca",
      "abogado tutela Bogotá",
      "tutela salud Colombia",
      "incidente de desacato",
    ],
    situations: [
      "Negación o demora en servicios de salud",
      "Afectación al mínimo vital, pensión, educación o trabajo",
      "Respuesta insuficiente de entidad pública o privada",
      "Mora judicial injustificada o posible vía de hecho",
      "Incidente de desacato por incumplimiento de fallo de tutela",
    ],
    process: [
      "Identificar derecho fundamental, entidad responsable, urgencia y pruebas",
      "Revisar si existe reclamación previa o si procede actuar de forma inmediata",
      "Preparar tutela, seguimiento o incidente de desacato según corresponda",
    ],
    localIntro:
      "Leal Abogados atiende tutelas en Meta, Cundinamarca, Bogotá y toda Colombia, especialmente cuando la consulta puede avanzar con soportes digitales y tiempos definidos.",
    faq: [
      {
        question: "¿Cuándo procede una tutela?",
        answer:
          "Procede cuando hay amenaza o vulneración de derechos fundamentales y la situación requiere protección constitucional. La viabilidad depende de los hechos y pruebas.",
      },
      {
        question: "¿Qué es un incidente de desacato?",
        answer:
          "Es una solicitud para exigir el cumplimiento de un fallo de tutela cuando la entidad obligada no cumple lo ordenado.",
      },
      {
        question: "¿Puedo consultar una tutela urgente por WhatsApp?",
        answer:
          "Sí. Conviene enviar una explicación breve, documentos clave, respuestas de la entidad y fechas relevantes para revisar la urgencia.",
      },
    ],
  },
  {
    title: "Abogado civil",
    slug: "abogado-civil",
    practiceAreaSlug: "derecho-civil-tramites",
    metaTitle: "Abogado civil en Meta, Cundinamarca y Bogotá",
    metaDescription:
      "Abogado civil para contratos, arrendamientos, cobros, responsabilidad civil, restitución de inmueble y trámites notariales en Meta, Cundinamarca, Bogotá y Colombia.",
    heroTitle: "Abogado civil en Meta, Cundinamarca, Bogotá y toda Colombia.",
    heroDescription:
      "Asesoría y representación en conflictos civiles, contractuales, patrimoniales y notariales que necesitan soporte jurídico antes de reclamar o demandar.",
    intro:
      "Los asuntos civiles dependen mucho de documentos, obligaciones, pagos, comunicaciones y pruebas. Antes de iniciar una demanda o firmar un acuerdo, conviene revisar la fuerza real del caso.",
    focusKeywords: [
      "abogado civil en Meta",
      "abogado civil en Cundinamarca",
      "abogado civil en Bogotá",
      "contratos civiles Colombia",
      "restitución de inmueble Colombia",
    ],
    situations: [
      "Contratos de arrendamiento, compraventa o prestación de servicios",
      "Responsabilidad civil, daños y perjuicios",
      "Procesos ejecutivos, cobro de cartera o acuerdos de pago",
      "Restitución de inmueble o incumplimientos contractuales",
      "Trámites notariales, demandas de simulación o conflictos patrimoniales",
    ],
    process: [
      "Revisión de contrato, obligaciones, soportes de pago y comunicaciones",
      "Evaluación de pruebas, pretensiones, riesgos y ruta de reclamación",
      "Preparación de requerimiento, negociación, trámite notarial o proceso judicial",
    ],
    localIntro:
      "La atención civil se concentra en Meta, Cundinamarca y Bogotá, con posibilidad de revisión remota para casos ubicados en otras ciudades de Colombia.",
    faq: [
      {
        question: "¿Qué se revisa primero en un caso civil?",
        answer:
          "Contrato, obligaciones, pagos, incumplimientos, comunicaciones, pruebas y objetivo del cliente.",
      },
      {
        question: "¿Puedo consultar antes de firmar un acuerdo?",
        answer:
          "Sí. La revisión previa ayuda a evitar compromisos riesgosos o acuerdos difíciles de ejecutar.",
      },
      {
        question: "¿Atienden procesos de cobro o restitución?",
        answer:
          "Sí. Se revisa la documentación para definir si conviene requerimiento, conciliación, proceso ejecutivo o restitución de inmueble.",
      },
    ],
  },
  {
    title: "Abogados para empresas",
    slug: "abogados-empresas",
    practiceAreaSlug: "empresas-prevencion-laboral",
    metaTitle: "Abogados para empresas en Meta, Cundinamarca y Bogotá",
    metaDescription:
      "Abogados para empresas en Meta, Cundinamarca, Bogotá y Colombia: contratos laborales, reglamento interno, seguridad social, riesgos laborales y prevención jurídica.",
    heroTitle: "Abogados para empresas en Meta, Cundinamarca, Bogotá y toda Colombia.",
    heroDescription:
      "Soporte jurídico preventivo para empresas que necesitan ordenar contratación, reglamento interno, decisiones laborales sensibles y contingencias antes de que escalen.",
    intro:
      "Una empresa no solo necesita abogado cuando ya hay demanda. La prevención jurídica ayuda a documentar decisiones, reducir riesgos laborales y responder con más control ante conflictos internos o requerimientos de autoridades.",
    focusKeywords: [
      "abogados para empresas en Meta",
      "abogados para empresas en Cundinamarca",
      "abogados para empresas en Bogotá",
      "reglamento interno de trabajo Colombia",
      "asesoría jurídica empresarial Colombia",
    ],
    situations: [
      "Reglamento interno de trabajo y políticas laborales",
      "Contratos de trabajo, otrosíes y comunicaciones sensibles",
      "Trámites ante el Ministerio de Trabajo",
      "Incapacidades, licencias, accidentes y riesgos laborales",
      "Acompañamiento preventivo mensual y defensa en conflictos laborales",
    ],
    process: [
      "Diagnóstico de documentos, decisiones recurrentes y riesgos prioritarios",
      "Mapa de ajustes laborales, contractuales o de seguridad social",
      "Acompañamiento puntual o recurrente según tamaño, riesgo y volumen de consultas",
    ],
    localIntro:
      "La firma prioriza empresas ubicadas en Meta, Cundinamarca y Bogotá, y puede prestar soporte remoto a negocios en otras zonas de Colombia.",
    faq: [
      {
        question: "¿Una empresa pequeña necesita asesoría jurídica preventiva?",
        answer:
          "Sí. La prevención ayuda a evitar errores en contratación, pagos, comunicaciones internas, terminaciones y respuesta ante conflictos.",
      },
      {
        question: "¿Pueden revisar reglamento interno de trabajo?",
        answer:
          "Sí. Leal Abogados puede revisar, actualizar o estructurar reglamentos internos con enfoque preventivo y operativo.",
      },
      {
        question: "¿El acompañamiento empresarial puede ser mensual?",
        answer:
          "Sí. Puede estructurarse como soporte recurrente según frecuencia de consultas, complejidad y necesidades de la empresa.",
      },
    ],
  },
];

export const serviceSeoPageBySlug = new Map(serviceSeoPages.map((page) => [page.slug, page]));

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
