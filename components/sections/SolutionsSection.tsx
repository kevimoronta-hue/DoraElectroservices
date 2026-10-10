import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/constants";

export function SolutionsSection() {
  return (
    <section id="soluciones" className="py-[72px] lg:py-28">
      <div className="container-page">
        <SectionHeading
          title="Soluciones adaptadas a cada necesidad"
          description="Cada instalación presenta condiciones diferentes. Evaluamos el contexto técnico antes de recomendar una intervención."
        />
        <div className="mt-10 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              featured={SERVICES.length % 2 === 1 && index === SERVICES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
