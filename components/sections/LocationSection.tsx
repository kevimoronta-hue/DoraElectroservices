"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Icon } from "@/components/ui/Icon";
import { COMPANY, CONTACT_PLACEHOLDERS, GOOGLE_MAPS_EMBED_SRC } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { useInView } from "@/lib/useInView";

export function LocationSection() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const telHref = `tel:${CONTACT_PLACEHOLDERS.phone.replace(/\s+/g, "")}`;

  return (
    <section id="ubicacion" className="py-[72px] lg:py-28">
      <div className="container-page">
        <SectionHeading title="Ubicación" />
        <div ref={ref} className={`reveal ${inView ? "is-in" : ""} mt-8 grid gap-6 lg:grid-cols-2 lg:items-stretch`}>
          <div className="flex flex-col justify-between gap-6 rounded-lg border border-white/[0.14] bg-surface p-6 md:p-8">
            <div>
              <strong className="mb-1.5 block font-display text-2xl font-semibold text-text-primary">
                {COMPANY.name}
              </strong>
              <p className="text-[17px] leading-relaxed text-text-primary">{COMPANY.address}</p>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={telHref}
                  onClick={() => trackEvent("phone_click")}
                  className="location-contact-row flex items-center gap-2.5 text-[15px] font-semibold text-text-primary"
                >
                  <Icon name="phone" size={18} className="flex-none text-red-electric" />
                  {CONTACT_PLACEHOLDERS.phone}
                </a>
                <div className="flex items-center gap-2.5 text-[15px] text-text-secondary">
                  <Icon name="clock" size={18} className="flex-none text-red-electric" />
                  {CONTACT_PLACEHOLDERS.hours}
                </div>
              </div>
            </div>

            <SecondaryButton
              href={CONTACT_PLACEHOLDERS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("map_click")}
              className="w-fit"
            >
              Ver ubicación en Google Maps
            </SecondaryButton>
          </div>

          <div className="location-map aspect-square overflow-hidden rounded-lg border border-white/[0.14] lg:aspect-auto">
            <iframe
              src={GOOGLE_MAPS_EMBED_SRC}
              title={`Mapa de ubicación de ${COMPANY.name}`}
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
