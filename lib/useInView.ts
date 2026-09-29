"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One-shot reveal trigger shared by every "floor" entrance animation on the
 * site (RISE / STAGGER GRID / LINE DRAW / FOCUS-IN). A single
 * IntersectionObserver per element, disconnected the moment it fires — never
 * re-hides on scroll-away, never runs per-frame work. Pair the returned
 * `inView` boolean with the `.reveal*` classes in app/globals.css.
 */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
