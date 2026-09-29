"use client";

import Image from "next/image";
import type { Service } from "@/types";
import { Icon } from "./Icon";
import { trackEvent } from "@/lib/analytics";
import { useInView } from "@/lib/useInView";

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`service-card ${inView ? "is-in" : ""} overflow-hidden rounded-card border border-white/[0.14] bg-surface`}
      style={{ transitionDelay: `${Math.min(index, 5) * 60}ms` }}
    >
      <div className="service-card-media relative aspect-[4/3]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="service-card-icon absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-sm border border-white/[0.14] bg-surface-elevated text-red-electric">
          <Icon name={service.icon as Parameters<typeof Icon>[0]["name"]} />
        </div>
      </div>

      <div className="p-6 pt-10 lg:p-7 lg:pt-10">
        <h3 className="font-display text-2xl font-semibold text-text-primary">{service.title}</h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-text-secondary">{service.description}</p>
        <a
          href="#cotizacion"
          onClick={() => trackEvent("service_interest_select", { service: service.id })}
          className="mt-4 inline-flex items-center gap-1.5 rounded text-sm font-bold text-red-electric hover:underline"
        >
          Consultar este servicio
          <Icon name="arrow" size={14} />
        </a>
      </div>
    </div>
  );
}
