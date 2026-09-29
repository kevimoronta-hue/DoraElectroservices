import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Términos y condiciones | DORA Electroservices",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="container-page py-16 lg:py-24">
        <h1 className="font-display text-4xl font-semibold text-text-primary">Términos y condiciones</h1>
        <div className="mt-6 max-w-[70ch] space-y-4 text-[15px] leading-relaxed text-text-secondary">
          <p>
            El uso de este sitio y del formulario de cotización de {COMPANY.name} implica la aceptación de estos
            términos. El envío de una solicitud no constituye una cotización formal ni un compromiso de servicio;
            es únicamente el primer paso para que el equipo técnico evalúe el proyecto descrito.
          </p>
          <p>
            Este texto es un borrador inicial y debe ser revisado y completado con la información legal definitiva
            antes de la publicación final del sitio.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
