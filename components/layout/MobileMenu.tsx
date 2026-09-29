"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

// Keep the close fade-out on screen exactly as long as the panel needs to
// finish animating out (see .mobile-panel[data-state="closed"] in
// globals.css) before it unmounts.
const CLOSE_MS = 200;

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  // Mounted a beat longer than `open` so the exit transition gets to play
  // instead of the panel vanishing mid-fade. `entered` is the visual
  // open/closed state the CSS keys off; it flips a frame after mount so
  // the enter transition has a "from" frame to animate from.
  //
  // Deliberately no scroll lock here — the panel is a short dropdown under
  // the navbar, not a full-screen takeover, so the page stays scrollable
  // and interactive underneath it the whole time it's open.
  const [mounted, setMounted] = useState(open);
  const [entered, setEntered] = useState(false);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      restoreRef.current = document.activeElement as HTMLElement | null;
      setMounted(true);
      const raf = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(raf);
    }

    setEntered(false);
    const timeout = window.setTimeout(() => {
      setMounted(false);
      const opener = restoreRef.current;
      if (opener && opener !== document.body && opener.isConnected) opener.focus();
    }, CLOSE_MS);
    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    document.addEventListener("keydown", onKeyDown);
    if (entered) firstLinkRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mounted, entered, onKeyDown]);

  // Reduced motion: skip the staggered/faded transition state entirely —
  // mount already-visible and unmount immediately on close, no CLOSE_MS
  // hold (there is nothing left to animate out).
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (open) setEntered(true);
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      {/*
       * Decorative only: dims/soft-focuses the page behind the panel so it
       * reads as "in front of" the site rather than replacing it. Never
       * intercepts input — the page stays fully scrollable and clickable
       * everywhere, including right under the panel.
       */}
      <div className="mobile-scrim fixed inset-x-0 bottom-0 top-[var(--nav-height)] z-30 lg:hidden" data-state={entered ? "open" : "closed"} aria-hidden="true" />

      <div
        id="mobile-menu"
        aria-label="Menú de navegación"
        data-state={entered ? "open" : "closed"}
        className="mobile-panel fixed inset-x-3 top-[calc(var(--nav-height)+8px)] z-40 flex max-h-[calc(100dvh-var(--nav-height)-24px)] flex-col gap-1 overflow-y-auto rounded-b-[20px] rounded-t-[14px] px-3 py-3 lg:hidden"
        style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))" }}
      >
        {NAV_LINKS.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            ref={index === 0 ? firstLinkRef : undefined}
            onClick={onClose}
            className="mobile-panel-link mobile-panel-item rounded-md px-3 py-3.5 font-display text-[19px] font-semibold"
            style={{ transitionDelay: entered ? `${index * 45}ms` : "0ms" }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#cotizacion"
          onClick={onClose}
          className="nav-cta mobile-panel-item mx-3 mb-1 mt-2 inline-flex h-12 items-center justify-center rounded-md text-[15px] font-bold"
          style={{ transitionDelay: entered ? `${NAV_LINKS.length * 45}ms` : "0ms" }}
        >
          Solicitar cotización
        </a>
      </div>
    </>
  );
}
