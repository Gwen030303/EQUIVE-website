import Hero from "@/components/Hero";
import HomeSections from "@/components/HomeSections";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.equive.shop/#organization",
      name: "EQUIVE",
      url: "https://www.equive.shop",
      logo: {
        "@type": "ImageObject",
        url: "https://www.equive.shop/logo.webp",
      },
      description:
        "EQUIVE — rijbroeken voor ruiters die niet kiezen tussen comfort en stijl. Premium ruiterkleding ontworpen in Amsterdam.",
      sameAs: [
        "https://instagram.com/equiveequestrian",
        "https://www.tiktok.com/@equive.shop",
        "https://www.pinterest.com/equive/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.equive.shop/#website",
      url: "https://www.equive.shop",
      name: "EQUIVE",
      publisher: { "@id": "https://www.equive.shop/#organization" },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <HomeSections />
    </>
  );
}
