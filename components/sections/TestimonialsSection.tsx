import { SectionHeading } from "@/components/ui/SectionHeading";
import { MarqueeRow } from "@/components/ui/MarqueeRow";
import { TESTIMONIALS_TOP, TESTIMONIALS_BOTTOM } from "@/lib/constants";

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-[72px] lg:py-28">
      <div className="container-page">
        <SectionHeading title="La experiencia de nuestros clientes" />
      </div>

      {/* Full-bleed, deliberately outside .container-page: the edge mask and
          the "next card peeking in" effect both need the row to run to the
          viewport edge, not stop at the 1280px content column. */}
      <div className="testimonials-rows mt-10">
        <MarqueeRow items={TESTIMONIALS_TOP} direction="left" durationSeconds={40} ariaLabel="Opiniones de clientes, fila 1" />
        <MarqueeRow items={TESTIMONIALS_BOTTOM} direction="right" durationSeconds={46} ariaLabel="Opiniones de clientes, fila 2" />
      </div>
    </section>
  );
}
