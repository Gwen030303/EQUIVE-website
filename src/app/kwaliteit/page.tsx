import type { Metadata } from "next";
import Features from "@/components/Features";

export const metadata: Metadata = {
  title: "Kwaliteit & Technologie | EQUIVE",
  description: "Ontdek de technologie achter EQUIVE rijbroeken. Full-seat siliconen grip, 4-way stretch, vochtregulerende stof.",
  alternates: { canonical: "/kwaliteit" },
  openGraph: {
    title: "Kwaliteit & Technologie | EQUIVE",
    description: "Ontdek de technologie achter EQUIVE rijbroeken. Full-seat siliconen grip, 4-way stretch, vochtregulerende stof.",
    url: "https://www.equive.shop/kwaliteit",
    siteName: "EQUIVE",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EQUIVE - Premium Rijbroeken" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kwaliteit & Technologie | EQUIVE",
    description: "Ontdek de technologie achter EQUIVE rijbroeken. Full-seat siliconen grip, 4-way stretch, vochtregulerende stof.",
    images: ["/og-image.jpg"],
  },
};

const kwaliteitJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Kwaliteit & Technologie | EQUIVE",
  description:
    "Ontdek de technologie achter EQUIVE rijbroeken. Full-seat siliconen grip, 4-way stretch, vochtregulerende stof.",
  url: "https://www.equive.shop/kwaliteit",
  publisher: { "@id": "https://www.equive.shop/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.equive.shop" },
      { "@type": "ListItem", position: 2, name: "Kwaliteit & Technologie", item: "https://www.equive.shop/kwaliteit" },
    ],
  },
};

export default function KwaliteitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kwaliteitJsonLd) }}
      />
      <Features />
    </>
  );
}
