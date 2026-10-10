import Image from "next/image";
import type { Testimonial } from "@/types";
import { Icon } from "./Icon";

interface TestimonialCardProps {
  testimonial: Testimonial;
  duplicate?: boolean;
}

export function TestimonialCard({ testimonial, duplicate = false }: TestimonialCardProps) {
  return (
    <article
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
      className="testimonial-card relative flex w-[82vw] max-w-[340px] flex-none flex-col overflow-hidden rounded-card p-6 md:w-[320px] lg:w-[340px]"
    >
      <div className="flex items-start justify-between">
        <span className="testimonial-quote-mark font-display text-[64px] leading-[0.7]" aria-hidden="true">
          &ldquo;
        </span>
        <div className="flex gap-1 pt-1" aria-label={`${testimonial.rating} de 5 estrellas`}>
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Icon key={i} name="star" size={14} className="text-[var(--nv-red-bright)]" />
          ))}
        </div>
      </div>

      <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-[var(--nv-text)]">{testimonial.quote}</p>

      <div className="testimonial-divider mt-5 h-px" aria-hidden="true" />

      <div className="mt-4 flex items-center gap-3">
        <div className="testimonial-avatar relative h-11 w-11 flex-none overflow-hidden rounded-full">
          <Image src={testimonial.avatar} alt="" fill sizes="44px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-[15px] font-bold text-[var(--nv-text)]">{testimonial.name}</div>
          {testimonial.role && (
            <div className="truncate text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--nv-text-secondary)]">
              {testimonial.role}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
