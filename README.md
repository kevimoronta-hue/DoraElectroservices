# DORA Electroservices — landing page

Next.js 15 (App Router) + TypeScript + Tailwind CSS. Mobile-first, en español.

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run start      # sirve el build de producción en el puerto 3001
```

## Placeholders pendientes de datos del cliente

Antes de publicar, reemplazar en `lib/constants.ts` (`CONTACT_PLACEHOLDERS`) y revisar cada archivo listado:

- Teléfono, WhatsApp, correo y horario — `lib/constants.ts`
- Enlace de Google Maps — `lib/constants.ts` (`googleMapsUrl`)
- Destino del formulario de cotización — `app/api/quote/route.ts` (actualmente devuelve 501 a propósito)
- Testimonios reales (texto, nombre, tipo de proyecto, foto autorizada) — `lib/constants.ts` (`TESTIMONIALS`)
- Lista definitiva de servicios (actualmente provisoria, `pendingBusinessValidation: true`) — `lib/constants.ts` (`SERVICES`)
- Video 16:9 y poster — `public/videos/` y `public/images/` (ver `public/videos/README.md`)
- `NEXT_PUBLIC_SITE_URL` — variable de entorno para metadata, sitemap y robots (usa un dominio de ejemplo si no se define)

## Limitaciones conocidas

- El formulario valida y protege (honeypot, rate limit) pero **no envía** solicitudes reales: no hay destino
  configurado todavía.
- No existe archivo de video real; el módulo `ScrollPanVideo` muestra un recuadro con poster/placeholder y el
  panorámica de scroll ya implementada, lista para el archivo real.
- El logo se usa tal cual fue entregado (fondo blanco no transparente); se muestra sobre una placa blanca en la
  navbar y el footer para no alterar el archivo original.
