"use client";

import Image from "next/image";
import { useInView } from "@/lib/useInView";

export function ExperienceSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const spawn = inView ? "is-in" : "";

  return (
    <section id="experiencia" className="border-y border-white/[0.14] bg-background-secondary py-[72px] lg:py-28">
      <div ref={ref} className="container-page flex justify-center">
        {/*
          Full editorial card — "35 años de experiencia", the paragraph and
          the 5 points are all baked into one generated premium visual (see
          .reveal-scale in app/globals.css for the spawn) instead of
          live-composed type: a 9:16 card below `lg`, a 16:9 card from `lg`
          up, swapped by plain conditional display so only one asset ever
          downloads per viewport.
        */}
        <div className={`reveal-scale ${spawn} relative aspect-[9/16] w-full max-w-[420px] overflow-hidden rounded-lg lg:hidden`}>
          <Image
            src="/images/experience-card-mobile.png"
            alt="35 años de experiencia. La experiencia permite observar más allá del problema visible. DORA Electroservices combina conocimiento técnico, análisis y atención personalizada para orientar cada proyecto hacia una solución coherente. Trayectoria práctica, evaluación personalizada, comunicación directa, enfoque técnico, atención a proyectos de diferentes escalas."
            fill
            sizes="420px"
            className="object-cover"
          />
        </div>
        <div className={`reveal-scale ${spawn} relative hidden aspect-[16/9] w-full max-w-[960px] overflow-hidden rounded-lg lg:block`}>
          <Image
            src="/images/experience-card-desktop.png"
            alt="35 años de experiencia. La experiencia permite observar más allá del problema visible. DORA Electroservices combina conocimiento técnico, análisis y atención personalizada para orientar cada proyecto hacia una solución coherente. Trayectoria práctica, evaluación personalizada, comunicación directa, enfoque técnico, atención a proyectos de diferentes escalas."
            fill
            sizes="960px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
