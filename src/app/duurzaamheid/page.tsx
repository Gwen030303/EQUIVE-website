import type { Metadata } from "next";
import Duurzaamheid from "@/components/Duurzaamheid";

export const metadata: Metadata = {
  title: "Duurzaamheid | EQUIVE",
  description:
    "Ontdek hoe EQUIVE werkt aan duurzame rijkleding. Eerlijke productie, hoogwaardige materialen, recyclebare verpakkingen en klimaatneutrale verzending.",
  alternates: { canonical: "/duurzaamheid" },
  openGraph: {
    title: "Duurzaamheid | EQUIVE",
    description:
      "Ontdek hoe EQUIVE werkt aan duurzame rijkleding. Eerlijke productie, hoogwaardige materialen, recyclebare verpakkingen en klimaatneutrale verzending.",
    url: "https://www.equive.shop/duurzaamheid",
    siteName: "EQUIVE",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EQUIVE - Duurzaamheid",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Duurzaamheid | EQUIVE",
    description:
      "Ontdek hoe EQUIVE werkt aan duurzame rijkleding. Eerlijke productie, hoogwaardige materialen, recyclebare verpakkingen en klimaatneutrale verzending.",
    images: ["/og-image.jpg"],
  },
};

const duurzaamheidJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Duurzaamheid | EQUIVE",
  description:
    "Ontdek hoe EQUIVE werkt aan duurzame rijkleding. Eerlijke productie, hoogwaardige materialen, recyclebare verpakkingen en klimaatneutrale verzending.",
  url: "https://www.equive.shop/duurzaamheid",
  publisher: { "@id": "https://www.equive.shop/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.equive.shop" },
      { "@type": "ListItem", position: 2, name: "Duurzaamheid", item: "https://www.equive.shop/duurzaamheid" },
    ],
  },
};

export default function DuurzaamheidPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(duurzaamheidJsonLd) }}
      />
      <Duurzaamheid />
    </>
  );
}
