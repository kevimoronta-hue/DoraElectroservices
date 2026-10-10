"use client";

import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Icon } from "@/components/ui/Icon";
import { COMPANY, CONTACT_PLACEHOLDERS, GOOGLE_MAPS_EMBED_SRC } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { useInView } from "@/lib/useInView";

function InfoRow({ icon, label, children }: { icon: Parameters<typeof Icon>[0]["name"]; label: string; children: ReactNode }) {
  return (
    <li className="location-row flex items-start gap-4 py-4">
      <span className="location-row-icon flex h-10 w-10 flex-none items-center justify-center rounded-[10px]">
        <Icon name={icon} size={18} />
      </span>
      <div className="min-w-0 pt-0.5">
        <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--nv-text-secondary)]">{label}</div>
        <div className="mt-1 text-[15.5px] leading-snug text-[var(--nv-text)]">{children}</div>
      </div>
    </li>
  );
}

export function LocationSection() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const telHref = `tel:${CONTACT_PLACEHOLDERS.phone.replace(/\s+/g, "")}`;

  return (
    <section id="ubicacion" className="py-[72px] lg:py-28">
      <div className="container-page">
        <SectionHeading title="Ubicación" />
        <div
          ref={ref}
          className={`reveal ${inView ? "is-in" : ""} mt-8 grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:items-stretch`}
        >
          <div className="location-card relative flex flex-col overflow-hidden rounded-card p-6 md:p-8">
            <div className="location-card-bg" aria-hidden="true" />

            <div className="relative flex flex-1 flex-col">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--nv-red-bright)]">
                    Dónde encontrarnos
                  </p>
                  <strong className="mt-2 block font-display text-[28px] font-semibold leading-tight text-[var(--nv-text)] md:text-[32px]">
                    {COMPANY.name}
                  </strong>
                </div>
                <span className="location-badge mt-1 inline-flex flex-none items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-bold">
                  <span className="location-badge-dot h-1.5 w-1.5 rounded-full" aria-hidden="true" />
                  Abierto 24/7
                </span>
              </div>

              <ul className="location-rows mt-5">
                <InfoRow icon="pin" label="Dirección">
                  {COMPANY.address}
                </InfoRow>
                <InfoRow icon="phone" label="Teléfono">
                  <a
                    href={telHref}
                    onClick={() => trackEvent("phone_click")}
                    className="location-contact-row font-semibold"
                  >
                    {CONTACT_PLACEHOLDERS.phone}
                  </a>
                </InfoRow>
                <InfoRow icon="clock" label="Horario">
                  {CONTACT_PLACEHOLDERS.hours}
                </InfoRow>
                <InfoRow icon="target" label="Zona de servicio">
                  {COMPANY.serviceArea}
                </InfoRow>
              </ul>

              <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                <PrimaryButton
                  href={CONTACT_PLACEHOLDERS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("map_click")}
                  className="w-full sm:w-auto"
                >
                  <Icon name="pin" size={16} />
                  Cómo llegar
                </PrimaryButton>
                <SecondaryButton href={telHref} onClick={() => trackEvent("phone_click")} className="w-full sm:w-auto">
                  <Icon name="phone" size={16} />
                  Llamar ahora
                </SecondaryButton>
              </div>
            </div>
          </div>

          <div className="location-map relative aspect-[4/3] overflow-hidden rounded-card lg:aspect-auto lg:min-h-[420px]">
            <iframe
              src={GOOGLE_MAPS_EMBED_SRC}
              title={`Mapa de ubicación de ${COMPANY.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
            />
            <div className="location-map-frame pointer-events-none absolute inset-0 rounded-card" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
