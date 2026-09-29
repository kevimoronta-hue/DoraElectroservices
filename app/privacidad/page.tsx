import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { COMPANY, CONTACT_PLACEHOLDERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de privacidad | DORA Electroservices",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="container-page py-16 lg:py-24">
        <h1 className="font-display text-4xl font-semibold text-text-primary">Política de privacidad</h1>
        <div className="mt-6 max-w-[70ch] space-y-4 text-[15px] leading-relaxed text-text-secondary">
          <p>
            {COMPANY.name} recopila los datos enviados a través del formulario de cotización de este sitio
            (nombre, apellido, teléfono, correo electrónico, empresa, ubicación del proyecto y descripción de la
            necesidad) únicamente para responder a la solicitud y evaluar el proyecto descrito.
          </p>
          <p>
            No se comparten estos datos con terceros con fines comerciales. El destino final de las solicitudes
            recibidas ({CONTACT_PLACEHOLDERS.formEndpoint}) y el correo de contacto para ejercer derechos sobre tus
            datos ({CONTACT_PLACEHOLDERS.email}) están pendientes de confirmación por parte de la empresa.
          </p>
          <p>
            Este texto es un borrador inicial y debe ser revisado y completado con la información legal y de
            contacto definitiva antes de la publicación final del sitio.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
