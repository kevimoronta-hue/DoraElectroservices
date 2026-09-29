import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import "./globals.css";
import { COMPANY, SITE_URL } from "@/lib/constants";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Soluciones electromecánicas en Pedro Brand | DORA Electroservices",
  description:
    "DORA Electroservices ofrece soluciones electromecánicas adaptadas a proyectos residenciales, comerciales y técnicos en Pedro Brand. Solicita una cotización.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Soluciones electromecánicas en Pedro Brand | DORA Electroservices",
    description:
      "DORA Electroservices ofrece soluciones electromecánicas adaptadas a proyectos residenciales, comerciales y técnicos en Pedro Brand.",
    url: SITE_URL,
    siteName: COMPANY.name,
    locale: "es_DO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soluciones electromecánicas en Pedro Brand | DORA Electroservices",
    description:
      "DORA Electroservices ofrece soluciones electromecánicas adaptadas a proyectos residenciales, comerciales y técnicos en Pedro Brand.",
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: COMPANY.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Km 23 Autopista Duarte, Residencial Marien, B13",
    addressLocality: "Pedro Brand",
    addressCountry: "DO",
  },
  areaServed: "Pedro Brand, República Dominicana",
  logo: `${SITE_URL}/logos/dora-electroservices-logo.webp`,
  url: SITE_URL,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${barlowCondensed.variable} ${manrope.variable}`}>
      <body className="font-body">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-red-primary focus:px-4 focus:py-3 focus:text-white"
        >
          Saltar al contenido principal
        </a>
        {children}
        <WhatsAppButton />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
