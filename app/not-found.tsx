import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="container-page flex flex-col items-start gap-6 py-24 text-left lg:py-32">
        <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-red-electric">Error 404</p>
        <h1 className="font-display text-5xl font-semibold text-text-primary lg:text-6xl">Página no encontrada</h1>
        <p className="max-w-[52ch] text-lg text-text-secondary">
          La página que buscas no existe o fue movida. Vuelve al inicio o solicita una cotización directamente.
        </p>
        <PrimaryButton href="/">Volver al inicio</PrimaryButton>
      </main>
      <Footer />
    </>
  );
}
