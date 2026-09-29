"use client";

import { useEffect, useState } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { COMPANY } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const POSTER = "/images/hero-video-poster.jpg";

export function Hero() {
  // Spawn-on-mount, not scroll-triggered: this is the one moment above the
  // fold where a first-paint entrance earns its keep (a curtain that rises
  // once). requestAnimationFrame lets the initial (hidden) frame commit
  // before flipping, so the transition actually plays instead of skipping it.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  const spawn = mounted ? "is-in" : "";

  return (
    <section id="inicio" className="hero-shell relative isolate overflow-hidden">
      {/*
       * Purely decorative: the real information (headline, proof, CTAs)
       * lives in HTML below, never only in the video. `.hero-video` is
       * swapped for the static poster under prefers-reduced-motion (see
       * globals.css) so the section never goes empty — it just stops
       * moving.
       */}
      <div className="hero-media" aria-hidden="true">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER}
        >
          <source src="/videos/hero-dora.webm" type="video/webm" />
          <source src="/videos/hero-dora.mp4" type="video/mp4" />
        </video>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={POSTER} alt="" className="hero-poster-fallback" />
        <div className="hero-scrim" />
      </div>

      <div className="hero-content container-page relative z-10">
        <h1
          className={`reveal-scale ${spawn} max-w-[15ch] font-display text-[clamp(26px,7.8vw,38px)] font-semibold leading-[1.02] tracking-tight text-text-primary md:max-w-none md:text-[52px] lg:max-w-[16ch] lg:text-[64px]`}
        >
          {COMPANY.tagline}
        </h1>

        <div className={`reveal ${spawn} hero-proof mt-4 lg:mt-6`} style={{ transitionDelay: "90ms" }}>
          <span className="hero-proof-number font-display">{COMPANY.experienceYears}</span>
          <span className="hero-proof-label">
            años de
            <br />
            experiencia
          </span>
        </div>

        {/*
         * The DORA logo lockup in the video itself resolves in this band
         * (measured ~39-50% down the frame, verified across the 320-430px
         * widths this section targets) — kept deliberately empty, sized by
         * `flex: 1` + a `svh`-based floor rather than a fixed height, so it
         * scales with the actual hero instead of one phone's pixels.
         * Collapses to nothing at `lg` where the old compact stack (no
         * clearance needed) is preserved as-is.
         */}
        <div className="hero-logo-clearance" aria-hidden="true" />

        <div className={`reveal ${spawn} hero-cta-row mt-4 lg:mt-8`} style={{ transitionDelay: "170ms" }}>
          <PrimaryButton href="#cotizacion" onClick={() => trackEvent("cta_quote_click", { source: "hero" })}>
            Solicitar cotización
          </PrimaryButton>
          <SecondaryButton href="#soluciones">Conocer las soluciones</SecondaryButton>
        </div>
      </div>
    </section>
  );
}
