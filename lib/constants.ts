import type { Service, ProcessStepData, Commitment, Testimonial } from "@/types";

export const COMPANY = {
  name: "DORA Electroservices",
  tagline: "Soluciones electromecánicas respaldadas por experiencia real.",
  experienceYears: 35,
  serviceArea: "Pedro Brand y zonas cercanas",
  address:
    "Km 23 Autopista Duarte, Residencial Marien, B13, Pedro Brand, República Dominicana",
} as const;

/**
 * Single source of truth for the WhatsApp number — the floating button and
 * the quote form both derive their link from this instead of hardcoding
 * their own, so the two can never drift apart.
 */
export const WHATSAPP_NUMBER = "18094475799";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * Contact placeholders — none of these are real values.
 * Replace once the client confirms them; keep as non-clickable text until then.
 */
export const CONTACT_PLACEHOLDERS = {
  phone: "+1 809 447 5799",
  whatsapp: "+1 809 447 5799",
  email: "[CORREO POR CONFIRMAR]",
  hours: "24 horas, los 7 días de la semana",
  googleMapsUrl: "https://maps.app.goo.gl/JuYGKjdpndfPUoAK9?g_st=ic",
  formEndpoint: "[DESTINO DEL FORMULARIO POR CONFIGURAR]",
} as const;

/**
 * Resolved from the real Google Business listing behind `googleMapsUrl`
 * (ftid = that place's exact feature id, more precise than a text-address
 * guess) — used only for the embedded map iframe, which can't follow a
 * maps.app.goo.gl short link directly.
 */
export const GOOGLE_MAPS_EMBED_SRC =
  "https://www.google.com/maps?q=Dora+Electroservices,+Marien+B13,+Pedro+Brand+11200&ftid=0x8eaff5580ea2b50b:0x96ceea0afcb58517&output=embed";

export const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#soluciones", label: "Soluciones" },
  { href: "#proceso", label: "Proceso" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#cotizacion", label: "Cotización" },
] as const;

export const SERVICES: Service[] = [
  {
    id: "instalaciones-electricas",
    title: "Instalaciones eléctricas",
    description: "Instalaciones adaptadas a las condiciones y necesidades del proyecto.",
    icon: "bolt",
    image: "/images/service-instalaciones-electricas.jpg",
  },
  {
    id: "mantenimiento-electromecanico",
    title: "Mantenimiento electromecánico",
    description: "Seguimiento periódico orientado a preservar el funcionamiento de la instalación.",
    icon: "wrench",
    image: "/images/service-mantenimiento-electromecanico.jpg",
  },
  {
    id: "diagnostico-fallas",
    title: "Diagnóstico de fallas",
    description: "Evaluación técnica para identificar el origen de un problema puntual.",
    icon: "search",
    image: "/images/service-diagnostico-fallas.jpg",
  },
  {
    id: "reparacion-adecuacion",
    title: "Reparación y adecuación",
    description: "Intervenciones dirigidas a corregir o ajustar una instalación existente.",
    icon: "tool",
    image: "/images/service-reparacion-adecuacion.jpg",
  },
  {
    id: "control-automatizacion",
    title: "Control y automatización",
    description: "Soluciones orientadas a mejorar el control de procesos electromecánicos.",
    icon: "cpu",
    image: "/images/service-control-automatizacion.jpg",
  },
  {
    id: "soluciones-personalizadas",
    title: "Soluciones personalizadas",
    description: "Propuestas específicas cuando el proyecto no encaja en una categoría estándar.",
    icon: "clipboard",
    image: "/images/service-soluciones-personalizadas.jpg",
  },
];

export const PROCESS_STEPS: ProcessStepData[] = [
  {
    number: "01",
    title: "Cuéntanos tu necesidad",
    text: "Explícanos qué sucede, qué instalación está involucrada y qué resultado necesitas.",
    image: "/images/process-01-consulta.jpg",
  },
  {
    number: "02",
    title: "Evaluamos el proyecto",
    text: "Revisamos la información disponible y definimos qué evaluación técnica requiere el caso.",
    image: "/images/process-02-evaluacion.jpg",
  },
  {
    number: "03",
    title: "Proponemos la solución",
    text: "Presentamos una propuesta adaptada al alcance y a las condiciones del proyecto.",
    image: "/images/process-03-propuesta.jpg",
  },
  {
    number: "04",
    title: "Ejecutamos y verificamos",
    text: "Realizamos el trabajo acordado y verificamos el funcionamiento de la intervención.",
    image: "/images/process-04-ejecucion.jpg",
  },
];

export const COMMITMENTS: Commitment[] = [
  {
    title: "Experiencia",
    text: "Treinta y cinco años de experiencia aplicados al análisis de cada proyecto.",
  },
  {
    title: "Claridad",
    text: "Explicaciones directas para que el cliente comprenda la solución propuesta.",
  },
  {
    title: "Responsabilidad",
    text: "Seguimiento del trabajo acordado y atención a los detalles de la instalación.",
  },
  {
    title: "Solución adaptada",
    text: "Cada recomendación debe responder a las condiciones reales del proyecto.",
  },
];

/**
 * No real testimonials exist yet. Every entry here is explicitly marked
 * `placeholder: true` — plausible, Spanish-language dev filler for the
 * double-marquee layout, never content to ship as-is. Replace name/quote/
 * role (and drop `placeholder`) with real client reviews before production.
 */
export const TESTIMONIALS_TOP: Testimonial[] = [
  {
    name: "Carlos Rodríguez",
    quote: "Excelente servicio, muy profesionales y rápidos en la instalación.",
    role: "Cliente residencial",
    rating: 5,
    avatar: "/images/avatars/carlos-rodriguez.jpg",
    placeholder: true,
  },
  {
    name: "María Fernández",
    quote: "Resolvieron una falla eléctrica que otros técnicos no pudieron identificar.",
    role: "Cliente comercial",
    rating: 5,
    avatar: "/images/avatars/maria-fernandez.jpg",
    placeholder: true,
  },
  {
    name: "Luis Peña",
    quote: "Puntuales, ordenados y con un trabajo impecable de principio a fin.",
    role: "Cliente residencial",
    rating: 5,
    avatar: "/images/avatars/luis-pena.jpg",
    placeholder: true,
  },
  {
    name: "Ana Gómez",
    quote: "El mantenimiento preventivo nos ahorró una parada de producción importante.",
    role: "Cliente industrial",
    rating: 5,
    avatar: "/images/avatars/ana-gomez.jpg",
    placeholder: true,
  },
  {
    name: "Roberto Cruz",
    quote: "Comunicación clara durante todo el proyecto, muy recomendados.",
    role: "Cliente comercial",
    rating: 5,
    avatar: "/images/avatars/roberto-cruz.jpg",
    placeholder: true,
  },
];

export const TESTIMONIALS_BOTTOM: Testimonial[] = [
  {
    name: "Patricia Reyes",
    quote: "Instalación eléctrica nueva impecable, quedamos muy satisfechos.",
    role: "Cliente residencial",
    rating: 5,
    avatar: "/images/avatars/patricia-reyes.jpg",
    placeholder: true,
  },
  {
    name: "José Martínez",
    quote: "Diagnóstico preciso y solución rápida a un problema recurrente.",
    role: "Cliente comercial",
    rating: 5,
    avatar: "/images/avatars/jose-martinez.jpg",
    placeholder: true,
  },
  {
    name: "Carmen Díaz",
    quote: "Equipo técnico muy capacitado, resolvieron todo en una sola visita.",
    role: "Cliente residencial",
    rating: 5,
    avatar: "/images/avatars/carmen-diaz.jpg",
    placeholder: true,
  },
  {
    name: "Miguel Ángel Vargas",
    quote: "La automatización del sistema quedó funcionando mejor de lo esperado.",
    role: "Cliente industrial",
    rating: 5,
    avatar: "/images/avatars/miguel-vargas.jpg",
    placeholder: true,
  },
  {
    name: "Sofía Ramírez",
    quote: "Atención personalizada y presupuesto justo, volveríamos a contratarlos.",
    role: "Cliente comercial",
    rating: 5,
    avatar: "/images/avatars/sofia-ramirez.jpg",
    placeholder: true,
  },
];

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
