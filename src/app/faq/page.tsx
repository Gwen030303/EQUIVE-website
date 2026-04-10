import type { Metadata } from "next";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Veelgestelde Vragen | EQUIVE",
  description: "Antwoorden op veelgestelde vragen over EQUIVE rijbroeken. Maatadvies, verzending, retour en meer.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Veelgestelde Vragen | EQUIVE",
    description: "Antwoorden op veelgestelde vragen over EQUIVE rijbroeken. Maatadvies, verzending, retour en meer.",
    url: "https://www.equive.shop/faq",
    siteName: "EQUIVE",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EQUIVE - Premium Rijbroeken" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veelgestelde Vragen | EQUIVE",
    description: "Antwoorden op veelgestelde vragen over EQUIVE rijbroeken. Maatadvies, verzending, retour en meer.",
    images: ["/og-image.jpg"],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoe valt The Signature?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Signature valt normaal. Twijfel je tussen twee maten? Neem dan de grotere maat. Bekijk onze maatgids voor exacte afmetingen.",
      },
    },
    {
      "@type": "Question",
      name: "Voor welke discipline is de legging geschikt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Signature is ontworpen voor alle disciplines \u2014 dressuur, springen, eventing en recreatief rijden. De full-seat grip werkt in elk zadel.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik de legging ook buiten het zadel dragen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absoluut. Dat is precies waar EQUIVE voor staat. Van de stal naar de sportschool naar de stad \u2014 The Signature is ontworpen om er overal goed uit te zien.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe lang gaat een EQUIVE legging mee?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bij normaal gebruik en juiste verzorging gaat The Signature maanden mee. De siliconen grip en stof zijn getest op honderden uren in het zadel.",
      },
    },
    {
      "@type": "Question",
      name: "Wat als ik niet tevreden ben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Geen probleem. Je hebt 30 dagen om te retourneren, gratis via PostNL. We willen dat je 100% blij bent met je aankoop.",
      },
    },
    {
      "@type": "Question",
      name: "Verzenden jullie ook naar Belgi\u00EB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja! We verzenden naar Nederland en Belgi\u00EB. Verzending naar Nederland is gratis, voor Belgi\u00EB betaal je een klein bedrag.",
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQ />
    </>
  );
}
