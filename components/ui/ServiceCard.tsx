"use client";

import Image from "next/image";
import type { Service } from "@/types";
import { Icon } from "./Icon";
import { trackEvent } from "@/lib/analytics";
import { useInView } from "@/lib/useInView";

interface ServiceCardProps {
  service: Service;
  index?: number;
  /** Full-row horizontal layout from `md` up — used to close an odd-length grid. */
  featured?: boolean;
}

export function ServiceCard({ service, index = 0, featured = false }: ServiceCardProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <article
      ref={ref}
      className={`service-card ${inView ? "is-in" : ""} flex flex-col ${
        featured ? "md:col-span-2 md:grid md:grid-cols-[1.15fr_1fr] md:items-center lg:col-span-3" : ""
      }`}
      style={{ transitionDelay: `${Math.min(index, 5) * 60}ms` }}
    >
      <div
        className={`service-card-media relative aspect-[4/3] overflow-hidden rounded-card ${
          featured ? "md:aspect-auto md:h-full md:min-h-[380px]" : ""
        }`}
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes={featured ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
          className="service-card-img object-cover"
        />
      </div>

      <div
        className={`service-card-panel relative z-10 mx-3 -mt-16 flex flex-1 flex-col rounded-[14px] p-6 sm:mx-4 lg:p-7 ${
          featured ? "md:my-10 md:-ml-20 md:mr-0 md:mt-10 md:p-9" : ""
        }`}
      >
        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="service-card-index font-display text-[15px] font-semibold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="service-card-rule h-px flex-1" />
        </div>
        <h3
          className={`mt-4 font-display font-semibold leading-tight text-[var(--nv-text)] ${
            featured ? "text-[26px] md:text-[34px]" : "text-[26px]"
          }`}
        >
          {service.title}
        </h3>
        <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-[var(--nv-text-secondary)]">
          {service.description}
        </p>
        <a
          href="#cotizacion"
          onClick={() => trackEvent("service_interest_select", { service: service.id })}
          className="service-card-cta mt-5 inline-flex w-fit items-center gap-1.5 rounded text-sm font-bold"
        >
          Consultar este servicio
          <Icon name="arrow" size={14} />
        </a>
      </div>
    </article>
  );
}
