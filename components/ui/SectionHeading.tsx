"use client";

import { useInView } from "@/lib/useInView";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, description, align = "left", as = "h2" }: SectionHeadingProps) {
  const Heading = as;
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className="mb-3 font-body text-[13px] font-bold uppercase tracking-[0.08em] text-red-electric">
          {eyebrow}
        </p>
      )}
      <Heading className="font-display text-[34px] font-semibold leading-[1.02] tracking-tight text-text-primary md:text-[40px] lg:text-[52px]">
        {title}
      </Heading>
      {description && <p className="mt-4 text-[17px] leading-relaxed text-text-secondary md:text-lg">{description}</p>}
    </div>
  );
}
