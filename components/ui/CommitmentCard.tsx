"use client";

import Image from "next/image";
import type { Commitment } from "@/types";
import { useInView } from "@/lib/useInView";

export function CommitmentCard({ commitment, index = 0 }: { commitment: Commitment; index?: number }) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <article
      ref={ref}
      className={`commitment-card reveal ${inView ? "is-in" : ""} flex flex-col overflow-hidden rounded-card`}
      style={{ transitionDelay: `${Math.min(index, 5) * 60}ms` }}
    >
      <div className="commitment-card-media relative aspect-[3/2] overflow-hidden">
        <Image
          src={commitment.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="commitment-card-img object-cover"
        />
        <span className="commitment-card-index absolute left-4 top-4 font-display text-[13px] font-semibold">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col px-6 pb-7 pt-5">
        <span className="commitment-card-rule mb-4 block h-[2px] w-8" aria-hidden="true" />
        <h3 className="font-display text-[26px] font-semibold leading-tight text-[var(--nv-text)]">
          {commitment.title}
        </h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--nv-text-secondary)]">{commitment.text}</p>
      </div>
    </article>
  );
}
