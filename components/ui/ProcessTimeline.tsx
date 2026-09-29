"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProcessStepData } from "@/types";

interface ProcessTimelineProps {
  steps: ProcessStepData[];
}

/**
 * Process — plain vertical scroll (no pinning, no scene).
 *
 * Two independent tracking systems, deliberately not sharing state:
 *
 * 1. `revealed` — one-shot per-row IntersectionObserver (unchanged from
 *    before): drives the image wipe / title-text fade-in. Never un-reveals
 *    on scroll-up; that's the intended "spawn" behavior for content.
 * 2. `activeIndex` — a SEPARATE, fully reversible IntersectionObserver
 *    (same thin-center-band technique as the Navbar's active-link
 *    tracker) that drives the red axis and the badge future/active/passed
 *    states. It has no memory: whichever row is nearest the center band
 *    right now wins, so scrolling up retracts it exactly like scrolling
 *    down extends it, and a fast scroll in either direction jumps
 *    straight to the right step instead of replaying the ones in between.
 *
 * The axis itself is never sized off scroll position, a % guess, or a
 * hardcoded offset — `centers[i]` is the real measured vertical center of
 * badge i (getBoundingClientRect, relative to the timeline container),
 * remeasured on ResizeObserver so it stays exact across breakpoints,
 * image loads, and text reflow. Progress is just
 * `(centers[activeIndex] - centers[0]) / (centers[last] - centers[0])`,
 * applied as `scaleY` from a `transform-origin: top` anchored at
 * `centers[0]` — a single continuous line, not per-row segments, so
 * there's never a seam and never a "stuck partway" state either
 * direction.
 */
export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const badgeRefs = useRef<(HTMLElement | null)[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>(() => steps.map(() => false));
  const [activeIndex, setActiveIndex] = useState(-1);
  const [centers, setCenters] = useState<number[]>([]);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerTop = container.getBoundingClientRect().top;
    const next = badgeRefs.current.map((el) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return rect.top - containerTop + rect.height / 2;
    });
    setCenters((prev) => {
      if (prev.length === next.length && prev.every((v, i) => Math.abs(v - next[i]) < 0.5)) return prev;
      return next;
    });
  }, []);

  // Real-position measurement: initial layout, then remeasure whenever the
  // timeline's own box size changes (badge count, breakpoint reflow, image
  // aspect settling, text wrap) — no scroll listener, no polling.
  useEffect(() => {
    measure();
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(() => measure());
    observer.observe(container);
    return () => observer.disconnect();
  }, [measure, steps.length]);

  // Content spawn (image wipe + text fade): one-shot, never reverses.
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(steps.map(() => true));
      return;
    }

    const rows = rowRefs.current.filter((el): el is HTMLElement => el !== null);
    if (rows.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setRevealed((prev) => {
          let changed = false;
          const next = [...prev];
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const index = Number((entry.target as HTMLElement).dataset.rowIndex);
            if (!next[index]) {
              next[index] = true;
              changed = true;
            }
            observer.unobserve(entry.target);
          }
          return changed ? next : prev;
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -15% 0px" }
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [steps.length]);

  // Red axis + badge states: reversible, driven only by "which row is
  // nearest the center band right now" — no history, so up and down are
  // symmetric and a fast scroll in either direction settles on whichever
  // row is closest, not whichever was visited.
  useEffect(() => {
    const rows = rowRefs.current.filter((el): el is HTMLElement => el !== null);
    if (rows.length === 0) return;

    // Recompute from live `getBoundingClientRect()` on every fire rather
    // than trusting the observer's own `entries` batch: after a large or
    // fast scroll, IntersectionObserver only reports the rows whose ratio
    // just crossed a threshold, which can miss the row that's actually
    // now closest to center. Re-measuring all rows (cheap — there are only
    // a handful) whenever *anything* crosses a threshold is what makes a
    // big jump or a quick direction change land on the right step in one
    // shot instead of freezing on stale data.
    const pickClosest = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = -1;
      let closestDistance = Infinity;
      rows.forEach((row, index) => {
        const rect = row.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      if (closestIndex !== -1) setActiveIndex(closestIndex);
    };

    const observer = new IntersectionObserver(pickClosest, {
      rootMargin: "-45% 0px -45% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [steps.length]);

  const hasAxis = centers.length === steps.length && steps.length > 1;
  const axisTop = hasAxis ? centers[0] : 0;
  const axisHeight = hasAxis ? Math.max(centers[centers.length - 1] - centers[0], 0) : 0;
  const progress =
    hasAxis && activeIndex >= 0 && axisHeight > 0
      ? Math.min(Math.max((centers[activeIndex] - centers[0]) / axisHeight, 0), 1)
      : 0;

  return (
    <div ref={containerRef} className="process-timeline container-page">
      {hasAxis && (
        <>
          <div className="process-baseline" style={{ top: axisTop, height: axisHeight }} aria-hidden="true" />
          <div
            className="process-progress-axis"
            style={{ top: axisTop, height: axisHeight, transform: `scaleY(${progress})` }}
            aria-hidden="true"
          />
        </>
      )}

      {steps.map((step, index) => {
        const isRevealed = revealed[index];
        const isReached = activeIndex >= 0 && index <= activeIndex;
        const rowState = index === activeIndex ? "active" : index < activeIndex ? "passed" : "future";

        return (
          <article
            key={step.number}
            ref={(el) => {
              rowRefs.current[index] = el;
            }}
            data-row-index={index}
            className="process-row"
            data-state={rowState}
          >
            <div className="process-row-gutter">
              <span
                ref={(el) => {
                  badgeRefs.current[index] = el;
                }}
                className={`process-badge ${isReached ? "is-in" : ""}`}
                aria-hidden="true"
              >
                <span className="process-badge-number">{step.number}</span>
              </span>
            </div>

            <div className={`process-row-main ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <div
                className={`process-row-body reveal ${isRevealed ? "is-in" : ""}`}
                style={{ transitionDelay: "80ms" }}
              >
                <h3 className="font-display text-[24px] font-semibold leading-[1.05] text-text-primary lg:text-[28px]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-text-secondary lg:text-base">
                  {step.text}
                </p>
              </div>

              <div
                className={`process-row-media ${index % 2 === 1 ? "process-row-media--rtl" : ""} ${
                  isRevealed ? "is-in" : ""
                }`}
                style={{ transitionDelay: "50ms" }}
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  width={966}
                  height={1200}
                  sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 90vw"
                  className="h-auto w-full rounded-card object-cover"
                />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
