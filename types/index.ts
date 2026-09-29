export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface ProcessStepData {
  number: string;
  title: string;
  text: string;
  image: string;
}

export interface Commitment {
  title: string;
  text: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  rating: number;
  avatar: string;
  /** Development placeholder — never a real client quote until replaced. */
  placeholder: true;
}

export type ClientType = "Empresa" | "Comercio" | "Residencial" | "Institución" | "Otro";

export type Priority =
  | "Quiero planificar un proyecto"
  | "Necesito una evaluación"
  | "Tengo una falla actual"
  | "No estoy seguro";

export interface QuoteFormValues {
  nombre: string;
  apellido?: string;
  telefono: string;
  correo?: string;
  empresa?: string;
  ubicacion?: string;
  tipoCliente?: ClientType;
  necesidades?: string[];
  necesidadOtro?: string;
  prioridad?: Priority;
  descripcion: string;
  consentimiento: boolean;
  honeypot?: string;
}
