import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { PROCESS_STEPS } from "@/lib/constants";

export function ProcessSection() {
  return (
    <section id="proceso" className="pb-[72px] pt-[72px] lg:pb-28 lg:pt-28">
      <div className="container-page">
        <SectionHeading title="Un proceso claro de principio a fin" />
      </div>
      <div className="mt-14 lg:mt-20">
        <ProcessTimeline steps={PROCESS_STEPS} />
      </div>
    </section>
  );
}
