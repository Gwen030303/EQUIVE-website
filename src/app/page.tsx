import Hero from "@/components/Hero";
import HomeSections from "@/components/HomeSections";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.equive.nl/#organization",
      name: "EQUIVE",
      url: "https://www.equive.nl",
      logo: {
        "@type": "ImageObject",
        url: "https://www.equive.nl/logo.webp",
      },
      description:
        "EQUIVE — rijbroeken voor ruiters die niet kiezen tussen comfort en stijl. Premium ruiterkleding ontworpen in Amsterdam.",
      sameAs: [
        "https://instagram.com/equiveeequestrian",
        "https://www.tiktok.com/@equive.nl",
        "https://www.pinterest.com/equive/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.equive.nl/#website",
      url: "https://www.equive.nl",
      name: "EQUIVE",
      publisher: { "@id": "https://www.equive.nl/#organization" },
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
