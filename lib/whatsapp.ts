import { WHATSAPP_URL } from "@/lib/constants";
import type { QuoteFormValues } from "@/types";

function serviciosLine(values: QuoteFormValues): string | null {
  const necesidades = values.necesidades ?? [];
  if (necesidades.length === 0) return null;

  const items = necesidades.map((item) =>
    item === "Otro" && values.necesidadOtro?.trim() ? `Otro (${values.necesidadOtro.trim()})` : item
  );
  return items.join(", ");
}

/** Builds the client-facing message exactly as the customer would write it — no field dump. */
export function buildWhatsAppMessage(values: QuoteFormValues): string {
  const nombreCompleto = [values.nombre, values.apellido].filter((part) => part?.trim()).join(" ").trim();
  const servicios = serviciosLine(values);

  const lines = [
    "Hola, me comunico desde la página web de DORA Electroservices.",
    "",
    `Nombre: ${nombreCompleto}`,
    `Teléfono: ${values.telefono.trim()}`,
  ];

  if (values.correo?.trim()) lines.push(`Correo: ${values.correo.trim()}`);
  if (values.empresa?.trim()) lines.push(`Empresa: ${values.empresa.trim()}`);
  if (values.ubicacion?.trim()) lines.push(`Ubicación: ${values.ubicacion.trim()}`);
  if (values.tipoCliente) lines.push(`Tipo de cliente: ${values.tipoCliente}`);
  if (servicios) lines.push(`Servicio / proyecto: ${servicios}`);
  if (values.prioridad) lines.push(`Prioridad: ${values.prioridad}`);

  lines.push(`Descripción: ${values.descripcion.trim()}`);
  lines.push("");
  lines.push("Quisiera recibir orientación o una cotización.");

  return lines.join("\n");
}

export function buildWhatsAppLink(values: QuoteFormValues): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(buildWhatsAppMessage(values))}`;
}
