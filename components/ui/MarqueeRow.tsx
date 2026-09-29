"use client";

import { useEffect, useRef } from "react";
import type { Testimonial } from "@/types";
import { TestimonialCard } from "./TestimonialCard";

interface MarqueeRowProps {
  items: Testimonial[];
  direction: "left" | "right";
  durationSeconds: number;
  ariaLabel: string;
}

const INTENT_THRESHOLD_PX = 6;

/**
 * Continuous cross-scrolling testimonial row.
 *
 * Autoplay is a pure CSS `@keyframes` loop over a track containing the
 * source items twice (`items.length` is the single real set; the second
 * copy is `aria-hidden` and exists only so translateX(-50%) is exactly one
 * set wide, which is what makes the loop seamless — no JS frame budget
 * spent on it, no React state per frame). Hover-pause is also pure CSS
 * (`:hover` under `@media (hover: hover)`), so desktop needs zero JS for
 * either behavior.
 *
 * Single source of truth for position: before the first drag, the CSS
 * animation owns `transform`; the instant a drag is confirmed, the
 * animation is killed (`.marquee-track--manual`, `animation: none`) and
 * `state.offset` becomes the only thing writing to `transform` from then
 * on. The two never run at once, so there's nothing to fight over.
 *
 * Gesture intent is deferred, not assumed: pointerdown alone does NOT stop
 * autoplay or grab the pointer — a finger merely passing over a card while
 * scrolling the page vertically must not kill this row's animation. Only
 * once movement clears a small threshold do we classify the gesture as
 * horizontal (commit to manual drag, `preventDefault` from here on) or
 * vertical (do nothing further — the native page scroll was never
 * touched, `touch-action: pan-y` already let it proceed). This is also
 * why `user-select: none` is on `.marquee-track` in CSS: without it, a
 * mouse-down-and-drag over the quote text starts a native text selection
 * that visually fights the transform-driven drag.
 */
export function MarqueeRow({ items, direction, durationSeconds, ariaLabel }: MarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const momentumFrame = useRef<number | null>(null);
  const state = useRef({
    intent: "pending" as "pending" | "horizontal" | "vertical",
    manual: false,
    offset: 0,
    setWidth: 0,
    pointerId: -1,
    startClientX: 0,
    startClientY: 0,
    startOffset: 0,
    lastClientX: 0,
    lastT: 0,
    velocity: 0,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      state.current.setWidth = track.scrollWidth / 2;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const s = state.current;

    function wrap(x: number) {
      const w = s.setWidth;
      if (w <= 0) return x;
      let next = x % w;
      if (next > 0) next -= w;
      return next;
    }

    function stopMomentum() {
      if (momentumFrame.current) {
        cancelAnimationFrame(momentumFrame.current);
        momentumFrame.current = null;
      }
    }

    function goManual() {
      if (s.manual || !track) return;
      let currentX = 0;
      const computed = getComputedStyle(track).transform;
      const match = computed.match(/matrix\(([^)]+)\)/);
      if (match) {
        const parts = match[1].split(",").map((n) => parseFloat(n));
        currentX = parts[4] ?? 0;
      }
      s.offset = currentX;
      s.manual = true;
      track.classList.add("marquee-track--manual");
      track.style.transform = `translateX(${currentX}px)`;
    }

    // Reset only the per-gesture bookkeeping — not `s.manual`/`s.offset`,
    // which must persist across gestures once a drag has really happened.
    function resetGesture() {
      s.intent = "pending";
      s.pointerId = -1;
    }

    function onPointerDown(event: PointerEvent) {
      if (!track || s.pointerId !== -1) return; // ignore a second simultaneous pointer
      stopMomentum();
      s.intent = "pending";
      s.pointerId = event.pointerId;
      s.startClientX = event.clientX;
      s.startClientY = event.clientY;
      s.lastClientX = event.clientX;
      s.lastT = performance.now();
      s.velocity = 0;
      // Deliberately no setPointerCapture / preventDefault / goManual yet:
      // we don't know if this is a horizontal swipe or a vertical page
      // scroll that happens to start over a card.
    }

    function onPointerMove(event: PointerEvent) {
      if (!track || event.pointerId !== s.pointerId) return;

      if (s.intent === "pending") {
        const dx = event.clientX - s.startClientX;
        const dy = event.clientY - s.startClientY;
        if (Math.abs(dx) < INTENT_THRESHOLD_PX && Math.abs(dy) < INTENT_THRESHOLD_PX) return;

        if (Math.abs(dx) > Math.abs(dy)) {
          s.intent = "horizontal";
          goManual();
          s.startOffset = s.offset;
          try {
            track.setPointerCapture(event.pointerId);
          } catch {
            // pointer may already be gone; the up/cancel handler below still fires
          }
        } else {
          s.intent = "vertical";
          return; // hand this gesture fully back to native page scroll
        }
      }

      if (s.intent !== "horizontal") return;
      event.preventDefault();
      const dx = event.clientX - s.startClientX;
      const next = wrap(s.startOffset + dx);
      s.offset = next;
      track.style.transform = `translateX(${next}px)`;

      const now = performance.now();
      const dt = now - s.lastT;
      if (dt > 0) s.velocity = (event.clientX - s.lastClientX) / dt;
      s.lastClientX = event.clientX;
      s.lastT = now;
    }

    function endDrag(event: PointerEvent) {
      if (event.pointerId !== s.pointerId) return;
      const wasHorizontal = s.intent === "horizontal";
      if (wasHorizontal) {
        try {
          track?.releasePointerCapture(event.pointerId);
        } catch {
          // already released by the browser
        }
      }
      resetGesture();
      if (!wasHorizontal || !track) return;

      let velocity = s.velocity; // px/ms
      const friction = 0.94;
      const step = () => {
        const t = trackRef.current;
        if (!t) return;
        velocity *= friction;
        if (Math.abs(velocity) < 0.02) {
          momentumFrame.current = null;
          return;
        }
        s.offset = wrap(s.offset + velocity * 16);
        t.style.transform = `translateX(${s.offset}px)`;
        momentumFrame.current = requestAnimationFrame(step);
      };
      if (Math.abs(velocity) > 0.02) momentumFrame.current = requestAnimationFrame(step);
    }

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);

    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointercancel", endDrag);
      stopMomentum();
    };
  }, []);

  const doubled = [...items, ...items];

  return (
    <div className="marquee-row" role="group" aria-label={ariaLabel}>
      <div
        ref={trackRef}
        className="marquee-track"
        style={{
          animationName: direction === "left" ? "marquee-left" : "marquee-right",
          animationDuration: `${durationSeconds}s`,
        }}
      >
        {doubled.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} duplicate={index >= items.length} />
        ))}
      </div>
    </div>
  );
}
