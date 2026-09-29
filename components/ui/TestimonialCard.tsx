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
      className="testimonial-card flex w-[82vw] flex-none flex-col rounded-card p-6 md:w-[300px] lg:w-[320px]"
    >
      <div className="flex items-center gap-3">
        <div className="testimonial-avatar relative h-12 w-12 flex-none overflow-hidden rounded-full">
          <Image src={testimonial.avatar} alt="" fill sizes="48px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold text-text-primary">{testimonial.name}</div>
          {testimonial.role && <div className="truncate text-[13px] text-text-muted">{testimonial.role}</div>}
        </div>
      </div>

      <div className="mt-4 flex gap-1" aria-hidden="true">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Icon key={i} name="star" size={15} className="text-red-electric" />
        ))}
      </div>

      <p className="mt-3 flex-1 text-[15px] italic leading-relaxed text-text-secondary">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
    </article>
  );
}
