import { SectionHeading } from "@/components/ui/SectionHeading";
import { CommitmentCard } from "@/components/ui/CommitmentCard";
import { COMMITMENTS } from "@/lib/constants";

export function CommitmentsSection() {
  return (
    <section className="bg-background-secondary py-[72px] lg:py-28">
      <div className="container-page">
        <SectionHeading title="Una forma de trabajar basada en experiencia y claridad" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {COMMITMENTS.map((commitment, index) => (
            <CommitmentCard key={commitment.title} commitment={commitment} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
