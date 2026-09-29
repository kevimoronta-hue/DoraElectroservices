import { z } from "zod";

export const quoteFormSchema = z
  .object({
    nombre: z.string().trim().min(2, "Ingresa tu nombre."),
    apellido: z.string().trim().optional(),
    telefono: z
      .string()
      .trim()
      .min(7, "Ingresa un número de teléfono válido.")
      .regex(/^[0-9+()\-\s]+$/, "Usa solo números y símbolos válidos (+, -, paréntesis)."),
    correo: z
      .string()
      .trim()
      .optional()
      .refine((value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "Ingresa un correo electrónico válido."),
    empresa: z.string().trim().optional(),
    ubicacion: z.string().trim().optional(),
    tipoCliente: z.enum(["Empresa", "Comercio", "Residencial", "Institución", "Otro"]).optional(),
    necesidades: z.array(z.string()).optional(),
    necesidadOtro: z.string().trim().optional(),
    prioridad: z
      .enum([
        "Quiero planificar un proyecto",
        "Necesito una evaluación",
        "Tengo una falla actual",
        "No estoy seguro",
      ])
      .optional(),
    descripcion: z.string().trim().min(1, "Cuéntanos un poco más sobre lo que necesitas."),
    consentimiento: z.literal(true, {
      errorMap: () => ({ message: "Debes aceptar el uso de tus datos para continuar." }),
    }),
    // Honeypot: real users never fill this; bots often do.
    honeypot: z.string().max(0, "Solicitud rechazada.").optional(),
  })
  .refine(
    (data) => !data.necesidades?.includes("Otro") || !!data.necesidadOtro?.trim(),
    {
      message: "Especifica el detalle de tu necesidad.",
      path: ["necesidadOtro"],
    }
  );

export type QuoteFormSchema = z.infer<typeof quoteFormSchema>;
