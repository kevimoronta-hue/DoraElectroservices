"use client";

import type { Commitment } from "@/types";
import { useInView } from "@/lib/useInView";

export function CommitmentCard({ commitment, index = 0 }: { commitment: Commitment; index?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} rounded-card border border-white/[0.14] bg-surface p-6`}
      style={{ transitionDelay: `${Math.min(index, 5) * 60}ms` }}
    >
      <h3 className="font-display text-2xl font-semibold text-text-primary">{commitment.title}</h3>
      <p className="mt-2.5 text-[15px] leading-relaxed text-text-secondary">{commitment.text}</p>
    </div>
  );
}
