import type { Metadata } from "next";
import OnsVerhaalContent from "./OnsVerhaalContent";

export const metadata: Metadata = {
  title: "Ons Verhaal | EQUIVE",
  description:
    "Het verhaal achter EQUIVE: waarom wij rijbroeken maken die comfort en stijl combineren. Ontworpen in Amsterdam, voor ruiters die meer willen.",
  alternates: { canonical: "/ons-verhaal" },
  openGraph: {
    title: "Ons Verhaal | EQUIVE",
    description:
      "Het verhaal achter EQUIVE: waarom wij rijbroeken maken die comfort en stijl combineren. Ontworpen in Amsterdam, voor ruiters die meer willen.",
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
      "Het verhaal achter EQUIVE: waarom wij rijbroeken maken die comfort en stijl combineren. Ontworpen in Amsterdam, voor ruiters die meer willen.",
    images: ["/og-image.jpg"],
  },
};

const onsVerhaalJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Ons Verhaal | EQUIVE",
  description:
    "Het verhaal achter EQUIVE: waarom wij rijbroeken maken die comfort en stijl combineren. Ontworpen in Amsterdam, voor ruiters die meer willen.",
  url: "https://www.equive.shop/ons-verhaal",
  publisher: { "@id": "https://www.equive.shop/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.equive.shop" },
      { "@type": "ListItem", position: 2, name: "Ons Verhaal", item: "https://www.equive.shop/ons-verhaal" },
    ],
  },
};

export default function OnsVerhaalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(onsVerhaalJsonLd) }}
      />
      <OnsVerhaalContent />
    </>
  );
}
