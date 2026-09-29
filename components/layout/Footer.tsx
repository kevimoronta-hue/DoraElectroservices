"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { COMPANY, CONTACT_PLACEHOLDERS, NAV_LINKS } from "@/lib/constants";
import { useInView } from "@/lib/useInView";

export function Footer() {
  const { ref, inView } = useInView<HTMLElement>();
  const telHref = `tel:${CONTACT_PLACEHOLDERS.phone.replace(/\s+/g, "")}`;

  return (
    <footer ref={ref} className={`footer-chrome ${inView ? "is-in" : ""} pb-36 pt-12 lg:pb-14 lg:pt-14`}>
      <div className="container-page flex flex-col items-center gap-7 text-center">
        <div className="footer-logo-wrapper">
          <Image
            src="/logos/dora-electroservices-logo.webp"
            alt="DORA Electroservices"
            width={2000}
            height={667}
            className="footer-logo-img"
          />
        </div>

        <p className="footer-text-secondary max-w-[42ch] text-sm leading-relaxed">
          Soluciones electromecánicas respaldadas por experiencia, análisis técnico y atención personalizada.
        </p>

        <nav aria-label="Navegación de pie de página" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="footer-link text-sm font-semibold">
              {link.label}
            </a>
          ))}
          <a href="#ubicacion" className="footer-link text-sm font-semibold">
            Ubicación
          </a>
        </nav>

        <div className="footer-contact flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-sm">
          <span className="footer-text-secondary">{COMPANY.address}</span>
          <span className="footer-divider" aria-hidden="true" />
          <a href={telHref} className="footer-link font-semibold">
            {CONTACT_PLACEHOLDERS.phone}
          </a>
          <span className="footer-divider" aria-hidden="true" />
          <span className="footer-hours-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.03em]">
            <Icon name="clock" size={13} className="flex-none" />
            {CONTACT_PLACEHOLDERS.hours}
          </span>
        </div>

        <div className="footer-border w-full border-t pt-6">
          <div className="flex flex-col items-center gap-3 text-[13px] md:flex-row md:justify-between">
            <span className="footer-text-muted">
              © {new Date().getFullYear()} {COMPANY.name}. Todos los derechos reservados.
            </span>
            <span className="flex gap-4">
              <a href="/privacidad" className="footer-link">
                Privacidad
              </a>
              <a href="/terminos" className="footer-link">
                Términos
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
