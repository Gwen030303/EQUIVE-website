import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact | EQUIVE",
  description:
    "Neem contact op met EQUIVE. Vragen over rijbroeken, bestellingen of retour? We helpen je graag.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | EQUIVE",
    description:
      "Neem contact op met EQUIVE. Vragen over rijbroeken, bestellingen of retour? We helpen je graag.",
    url: "https://www.equive.shop/contact",
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
    title: "Contact | EQUIVE",
    description:
      "Neem contact op met EQUIVE. Vragen over rijbroeken, bestellingen of retour? We helpen je graag.",
    images: ["/og-image.jpg"],
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact | EQUIVE",
  description:
    "Neem contact op met EQUIVE. Vragen over rijbroeken, bestellingen of retour? We helpen je graag.",
  url: "https://www.equive.shop/contact",
  publisher: { "@id": "https://www.equive.shop/#organization" },
  mainEntity: {
    "@type": "Organization",
    "@id": "https://www.equive.shop/#organization",
    name: "EQUIVE",
    email: "info@equive.shop",
    url: "https://www.equive.shop",
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@equive.shop",
      contactType: "customer service",
      availableLanguage: ["Dutch", "English"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amsterdam",
      addressCountry: "NL",
    },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.equive.shop" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.equive.shop/contact" },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactContent />
    </>
  );
}
