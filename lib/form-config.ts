export const CLIENT_TYPES = ["Empresa", "Comercio", "Residencial", "Institución", "Otro"] as const;

export const PRIORITIES = [
  "Quiero planificar un proyecto",
  "Necesito una evaluación",
  "Tengo una falla actual",
  "No estoy seguro",
] as const;

export const NEEDS_OPTIONS = [
  { id: "instalacion-electrica", label: "Instalación eléctrica" },
  { id: "mantenimiento-electromecanico", label: "Mantenimiento electromecánico" },
  { id: "diagnostico-fallas", label: "Diagnóstico de fallas" },
  { id: "reparacion-adecuacion", label: "Reparación o adecuación" },
  { id: "control-automatizacion", label: "Control o automatización" },
  { id: "otro", label: "Otro" },
] as const;
