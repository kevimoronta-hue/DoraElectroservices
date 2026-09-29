import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CommitmentsSection } from "@/components/sections/CommitmentsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <SolutionsSection />
        <ProcessSection />
        <CommitmentsSection />
        <ExperienceSection />
        <TestimonialsSection />
        <section id="cotizacion" className="bg-background-secondary py-[72px] lg:py-28">
          <div className="container-page">
            <SectionHeading
              title="Cuéntanos sobre tu proyecto"
              description="Completa la información disponible. Nos ayudará a comprender mejor tu necesidad antes de contactarte."
            />
            <div className="mt-10">
              <QuoteForm />
            </div>
          </div>
        </section>
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
