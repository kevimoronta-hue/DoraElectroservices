/**
 * Centralized, PII-free analytics dispatch. Swap the `send` implementation
 * for GA4 / Plausible / etc. without touching call sites.
 *
 * Never pass form field values, phone numbers, emails, names, or file
 * contents here — events are semantic only.
 */
export type AnalyticsEvent =
  | "cta_quote_click"
  | "services_view"
  | "service_interest_select"
  | "quote_form_start"
  | "quote_form_submit"
  | "quote_form_success"
  | "quote_form_error"
  | "map_click"
  | "phone_click"
  | "whatsapp_click"
  | "video_visible"
  | "video_play"
  | "video_fallback";

export function trackEvent(event: AnalyticsEvent, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, params ?? {});
  }

  const w = window as unknown as { gtag?: (...args: unknown[]) => void; plausible?: (...args: unknown[]) => void };
  w.gtag?.("event", event, params);
  w.plausible?.(event, { props: params });
}
