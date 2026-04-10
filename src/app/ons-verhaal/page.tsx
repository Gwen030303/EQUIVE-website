import type { Metadata } from "next";
import OnsVerhaalContent from "./OnsVerhaalContent";

export const metadata: Metadata = {
  title: "Ons Verhaal | EQUIVE",
  description:
    "Leer over de oprichting van EQUIVE. Geboren uit frustratie, gebouwd met passie. Ontdek onze kernwaarden.",
  alternates: { canonical: "/ons-verhaal" },
  openGraph: {
    title: "Ons Verhaal | EQUIVE",
    description:
      "Leer over de oprichting van EQUIVE. Geboren uit frustratie, gebouwd met passie. Ontdek onze kernwaarden.",
    url: "https://www.equive.shop/ons-verhaal",
    siteName: "EQUIVE",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EQUIVE - Premium Rijbroeken",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ons Verhaal | EQUIVE",
    description:
      "Leer over de oprichting van EQUIVE. Geboren uit frustratie, gebouwd met passie. Ontdek onze kernwaarden.",
    images: ["/og-image.jpg"],
  },
};

export default function OnsVerhaalPage() {
  return <OnsVerhaalContent />;
}
