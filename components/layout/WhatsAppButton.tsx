"use client";

import { Icon } from "@/components/ui/Icon";
import { WHATSAPP_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

/**
 * Global floating action button — mounted once in the root layout, sits
 * above ordinary page content but below the navbar/mobile menu stack
 * (z-20, vs. navbar's z-50, mobile panel's z-40, mobile scrim's z-30) so an
 * open burger menu still visually wins.
 */
export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      onClick={() => trackEvent("whatsapp_click")}
      className="whatsapp-fab"
    >
      <Icon name="whatsapp" size={28} />
    </a>
  );
}
