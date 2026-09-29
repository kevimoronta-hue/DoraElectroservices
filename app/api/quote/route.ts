import { NextRequest, NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/validation";

/**
 * Quote form submission endpoint.
 *
 * IMPORTANT: no destination is configured yet ([DESTINO DEL FORMULARIO POR
 * CONFIGURAR]). This route validates and rate-limits, but does not actually
 * deliver the request anywhere. It intentionally returns 501 so the client
 * never shows a false success message. Wire up email delivery / CRM / DB
 * once the client confirms where quote requests should land, then remove
 * the 501 branch below.
 */

const rateLimitWindowMs = 60_000;
const maxRequestsPerWindow = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < rateLimitWindowMs);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > maxRequestsPerWindow;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Demasiadas solicitudes. Intenta nuevamente en un minuto." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const parsed = quoteFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Datos inválidos.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  if (parsed.data.honeypot) {
    // Silently accept-and-drop for suspected bots, no error surface.
    return NextResponse.json({ ok: true });
  }

  // TODO: destino del formulario por configurar — enviar por correo, CRM o
  // guardarlo en una base de datos, según lo que confirme el cliente.
  return NextResponse.json(
    {
      ok: false,
      error:
        "El destino del formulario aún no está configurado. Ninguna solicitud ha sido enviada.",
    },
    { status: 501 }
  );
}
