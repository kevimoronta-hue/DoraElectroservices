"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";
import { trackEvent } from "@/lib/analytics";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  // Referencia estable: MobileMenu depende de `onClose` en su efecto de
  // apertura (foco, scroll-lock, listeners). Una arrow function inline aquí
  // cambiaría de identidad en cada render del Navbar (cada scroll), forzando
  // ese efecto a desmontarse/remontarse mientras el menú sigue abierto.
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Same thin-center-band technique already proven in ProcessTimeline: one
  // IntersectionObserver, no scroll listener, fires only on band-crossings.
  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="navbar-shell sticky top-0 z-50" data-scrolled={scrolled ? "true" : undefined}>
      <div
        aria-hidden="true"
        className={`navbar-glass absolute inset-0 -z-10 ${scrolled ? "is-scrolled" : ""}`}
      />

      <div className="container-page flex h-full items-center justify-between gap-4">
        <Link href="#inicio" aria-label="DORA Electroservices — inicio" className="navbar-logo-link">
          <Image
            src="/logos/dora-electroservices-logo.webp"
            alt="DORA Electroservices"
            width={2000}
            height={667}
            priority
            className="nav-logo-img"
          />
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeHref === link.href ? "page" : undefined}
              className={`nav-link relative py-1.5 text-[15px] font-semibold ${
                activeHref === link.href ? "is-active" : ""
              }`}
            >
              {link.label}
              <span className="nav-link-dot" aria-hidden="true" />
            </a>
          ))}
        </nav>

        <a
          href="#cotizacion"
          onClick={() => trackEvent("cta_quote_click", { source: "navbar" })}
          className="nav-cta hidden h-12 items-center justify-center rounded-md px-6 text-[15px] font-bold transition-colors lg:inline-flex"
        >
          Solicitar cotización
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="nav-burger ml-auto flex h-11 w-11 items-center justify-center rounded-[10px] border lg:hidden"
          data-open={menuOpen ? "true" : undefined}
        >
          <span className="nav-burger-icon" aria-hidden="true">
            <span className="nav-burger-bar" />
            <span className="nav-burger-bar" />
            <span className="nav-burger-bar" />
          </span>
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </header>
  );
}
