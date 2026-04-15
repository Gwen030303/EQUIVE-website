import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Grip Guide | EQUIVE",
  description:
    "Kniegrip, half-seat of full-seat? Vergelijk de drie soorten rijbroekgrip en ontdek waarom full-seat siliconen grip maximale stabiliteit biedt in het zadel.",
  alternates: { canonical: "/grip-guide" },
  openGraph: {
    title: "Grip Guide | EQUIVE",
    description: "Kniegrip, half-seat of full-seat? Vergelijk de drie soorten rijbroekgrip en ontdek waarom full-seat siliconen grip maximale stabiliteit biedt in het zadel.",
    url: "https://www.equive.shop/grip-guide",
    siteName: "EQUIVE",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EQUIVE - Rijbroeken met full-seat siliconen grip" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grip Guide | EQUIVE",
    description: "Kniegrip, half-seat of full-seat? Vergelijk de drie soorten rijbroekgrip en ontdek waarom full-seat siliconen grip maximale stabiliteit biedt in het zadel.",
    images: ["/og-image.jpg"],
  },
};

/* ── SVG grip indicators ────────────────────────────────────────── */

function KneeGripSvg() {
  return (
    <svg
      viewBox="0 0 80 180"
      className="w-20 h-44 mx-auto"
      aria-label="Kniegrip diagram"
    >
      {/* Legging silhouette */}
      <path
        d="M28 10 Q24 50 22 90 Q20 130 18 170 L32 170 Q30 130 32 90 Q34 50 32 10Z"
        fill="currentColor"
        className="text-sand"
      />
      <path
        d="M48 10 Q52 50 54 90 Q56 130 58 170 L44 170 Q46 130 44 90 Q42 50 44 10Z"
        fill="currentColor"
        className="text-sand"
      />
      {/* Waistband connection */}
      <path d="M28 10 L48 10" stroke="currentColor" strokeWidth="1" className="text-sand" />
      <rect x="27" y="8" width="22" height="6" rx="2" fill="currentColor" className="text-sand" />
      {/* Knee grip patches only */}
      <ellipse cx="30" cy="90" rx="6" ry="14" fill="currentColor" className="text-taupe" opacity="0.8" />
      <ellipse cx="46" cy="90" rx="6" ry="14" fill="currentColor" className="text-taupe" opacity="0.8" />
    </svg>
  );
}

function HalfSeatGripSvg() {
  return (
    <svg
      viewBox="0 0 80 180"
      className="w-20 h-44 mx-auto"
      aria-label="Half-seat grip diagram"
    >
      {/* Legging silhouette */}
      <path
        d="M28 10 Q24 50 22 90 Q20 130 18 170 L32 170 Q30 130 32 90 Q34 50 32 10Z"
        fill="currentColor"
        className="text-sand"
      />
      <path
        d="M48 10 Q52 50 54 90 Q56 130 58 170 L44 170 Q46 130 44 90 Q42 50 44 10Z"
        fill="currentColor"
        className="text-sand"
      />
      <rect x="27" y="8" width="22" height="6" rx="2" fill="currentColor" className="text-sand" />
      {/* Half-seat grip: knees + partial seat */}
      <ellipse cx="30" cy="90" rx="6" ry="14" fill="currentColor" className="text-taupe" opacity="0.8" />
      <ellipse cx="46" cy="90" rx="6" ry="14" fill="currentColor" className="text-taupe" opacity="0.8" />
      {/* Partial seat area */}
      <path
        d="M30 55 Q32 48 38 46 Q44 48 46 55 L46 76 Q44 78 38 80 Q32 78 30 76Z"
        fill="currentColor"
        className="text-taupe"
        opacity="0.5"
      />
    </svg>
  );
}

function FullSeatGripSvg() {
  return (
    <svg
      viewBox="0 0 80 180"
      className="w-20 h-44 mx-auto"
      aria-label="Full-seat grip diagram"
    >
      {/* Legging silhouette */}
      <path
        d="M28 10 Q24 50 22 90 Q20 130 18 170 L32 170 Q30 130 32 90 Q34 50 32 10Z"
        fill="currentColor"
        className="text-sand"
      />
      <path
        d="M48 10 Q52 50 54 90 Q56 130 58 170 L44 170 Q46 130 44 90 Q42 50 44 10Z"
        fill="currentColor"
        className="text-sand"
      />
      <rect x="27" y="8" width="22" height="6" rx="2" fill="currentColor" className="text-sand" />
      {/* Full-seat grip: continuous from knee to knee */}
      <path
        d="M26 44 Q28 36 38 34 Q48 36 50 44 L50 104 Q48 108 38 110 Q28 108 26 104Z"
        fill="currentColor"
        className="text-taupe"
        opacity="0.85"
      />
    </svg>
  );
}

/* ── Data ────────────────────────────────────────────────────────── */

const gripTypes = [
  {
    name: "Knee Grip",
    description:
      "Alleen grip op de knieen. Geschikt voor recreatief rijden. Beperkte stabiliteit.",
    Visual: KneeGripSvg,
  },
  {
    name: "Half-Seat Grip",
    description:
      "Grip op knieen en een deel van het zitvlak. Populair bij springruiters.",
    Visual: HalfSeatGripSvg,
  },
  {
    name: "Full-Seat Grip",
    badge: "EQUIVE",
    description:
      "Volledige grip van knie tot knie. Maximale controle. Ideaal voor dressuur, springen en eventing.",
    Visual: FullSeatGripSvg,
  },
];

const benefits = [
  {
    number: "01",
    title: "Meer stabiliteit in het zadel",
    description:
      "Full-seat grip voorkomt verschuiven en geeft je een vast, zeker gevoel bij elke gang.",
  },
  {
    number: "02",
    title: "Betere beenhulpen",
    description:
      "Doorlopende grip langs het volledige been zorgt voor preciezere en subtielere hulpen.",
  },
  {
    number: "03",
    title: "Geschikt voor alle disciplines",
    description:
      "Van dressuur tot springen en eventing, full-seat grip presteert overal waar jij rijdt.",
  },
  {
    number: "04",
    title: "Duurzaam siliconen dat niet loslaat",
    description:
      "Hoogwaardig siliconen dat bestand is tegen intensief gebruik, wasbeurt na wasbeurt.",
  },
];

const gripGuideJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Grip Guide — Waarom full-seat siliconen grip het verschil maakt",
  description:
    "Vergelijk kniegrip, half-seat en full-seat grip en leer waarom EQUIVE kiest voor maximale controle in het zadel.",
  url: "https://www.equive.shop/grip-guide",
  image: "https://www.equive.shop/og-image.jpg",
  author: { "@id": "https://www.equive.shop/#organization" },
  publisher: { "@id": "https://www.equive.shop/#organization" },
  mainEntityOfPage: "https://www.equive.shop/grip-guide",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.equive.shop" },
      { "@type": "ListItem", position: 2, name: "Grip Guide", item: "https://www.equive.shop/grip-guide" },
    ],
  },
};

export default function GripGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gripGuideJsonLd) }}
      />
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden bg-black">
        <Image
          src="/lifestyle-gallop.webp"
          alt="EQUIVE full-seat siliconen grip in actie"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="relative z-10 max-w-[1880px] mx-auto px-5 md:px-8 pb-16 md:pb-24">
          <FadeIn>
            <p className="font-sans text-sm tracking-[0.3em] uppercase text-taupe-dark mb-4">
              Educatie
            </p>
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-[-0.01em] text-white">
              Grip
              <br />
              Guide
            </h1>
            <p className="font-sans text-[15px] sm:text-lg text-white/70 mt-4 max-w-[48ch]">
              Waarom full-seat siliconen grip het verschil maakt
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── What is full-seat grip ────────────────────────────────── */}
      <section className="py-14 md:py-24 bg-off-white">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            <FadeIn className="md:col-span-5">
              <p className="font-sans text-sm tracking-[0.3em] uppercase text-taupe-dark mb-4">
                Wat is full-seat grip?
              </p>
              <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-[-0.01em] text-black mb-6">
                Maximale
                <br />
                Stabiliteit
              </h2>
            </FadeIn>

            <FadeIn delay={0.15} className="md:col-span-7">
              <p className="font-sans text-[15px] sm:text-base text-black/70 leading-relaxed mb-6">
                Full-seat siliconen grip biedt maximale stabiliteit in het zadel.
                De grip loopt door over het volledige zitvlak &mdash; van knie
                tot knie &mdash; voor ongeevenaarde controle in elke discipline.
              </p>
              <p className="font-sans text-[15px] sm:text-base text-black/70 leading-relaxed">
                De EQUIVE rijbroek heeft full-seat grip met een cirkelpatroon
                in siliconen. Dat biedt niet alleen grip, maar ook comfort en
                ademend vermogen. Het resultaat: een rijbroek die met je
                meebeweegt, zonder te verschuiven.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Comparison: 3 grip types ──────────────────────────────── */}
      <section className="py-14 md:py-24 bg-black">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8">
          <FadeIn>
            <p className="font-sans text-sm tracking-[0.3em] uppercase text-white/50 mb-3">
              Vergelijking
            </p>
            <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-[-0.01em] text-white mb-4">
              Drie Types
              <br />
              Grip
            </h2>
            <p className="font-sans text-[15px] sm:text-sm text-white/50 max-w-[42ch] mb-10 md:mb-16">
              Niet alle grip is gelijk. Ontdek de verschillen en waarom
              full-seat de standaard zou moeten zijn.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
            {gripTypes.map((type, i) => {
              const Visual = type.Visual;
              const isEquive = !!type.badge;
              return (
                <FadeIn key={type.name} delay={i * 0.1}>
                  <div
                    className={`relative rounded-2xl p-5 sm:p-8 flex flex-col items-center text-center min-h-[320px] sm:min-h-[420px] transition-all duration-300 ${
                      isEquive
                        ? "bg-off-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
                        : "bg-black/40 border border-white/5"
                    }`}
                  >
                    {type.badge && (
                      <span className="absolute top-4 right-4 font-sans text-[12px] tracking-[0.2em] uppercase bg-taupe text-black px-3 py-1 rounded-full">
                        {type.badge}
                      </span>
                    )}

                    <div className="flex-1 flex items-center justify-center py-6">
                      <Visual />
                    </div>

                    <div className="mt-auto">
                      <h3
                        className={`font-headline text-xl sm:text-2xl font-bold leading-[1.1] tracking-[-0.01em] mb-3 ${
                          isEquive ? "text-black" : "text-white/70"
                        }`}
                      >
                        {type.name}
                      </h3>
                      <p
                        className={`font-sans text-[15px] sm:text-sm leading-relaxed ${
                          isEquive ? "text-black/70" : "text-white/60"
                        }`}
                      >
                        {type.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────────────── */}
      <section className="py-14 md:py-24 bg-sand">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8">
          <FadeIn>
            <p className="font-sans text-sm tracking-[0.3em] uppercase text-black/50 mb-3">
              Voordelen
            </p>
            <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-[-0.01em] text-black mb-10 md:mb-16">
              Waarom
              <br />
              Full-Seat?
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-8">
            {benefits.map((benefit, i) => (
              <FadeIn key={benefit.number} delay={i * 0.1}>
                <div className="flex gap-4 sm:gap-6">
                  <span className="font-headline text-4xl sm:text-5xl text-black/[0.06] leading-none select-none flex-shrink-0">
                    {benefit.number}
                  </span>
                  <div>
                    <h3 className="font-headline text-lg sm:text-xl font-bold leading-[1.1] tracking-[-0.01em] text-black mb-2">
                      {benefit.title}
                    </h3>
                    <p className="font-sans text-[15px] sm:text-sm text-black/70 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Alle Technologieën ──────────────────────────────────── */}
      <section className="py-14 md:py-24 bg-off-white">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8">
          <FadeIn>
            <p className="font-sans text-sm tracking-[0.3em] uppercase text-black/50 mb-3">
              Technologie Hub
            </p>
            <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-[-0.01em] text-black mb-10 sm:mb-12">
              Drie Innovaties,
              <br />
              E&eacute;n Rijbroek
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0}>
              <div className="border-t-2 border-taupe pt-6">
                <h3 className="font-headline text-xl sm:text-2xl font-bold leading-[1.1] tracking-[-0.01em] text-black mb-2">
                  Full-Seat Siliconen Grip
                </h3>
                <p className="font-sans text-sm text-black/50 tracking-wide uppercase mb-3">
                  Grip Systeem
                </p>
                <p className="font-sans text-[15px] sm:text-sm text-black/70 leading-relaxed">
                  Het cirkelpatroon in siliconen bedekt het volledige zitvlak
                  van knie tot knie. Maximale stabiliteit zonder in te leveren
                  op comfort. Getest op 500+ uren in het zadel.
                </p>
                <Link
                  href="/grip-guide"
                  className="inline-flex items-center gap-1 font-sans text-[15px] sm:text-sm text-taupe hover:text-black transition-colors mt-4 min-h-[44px]"
                >
                  Lees meer &rarr;
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="border-t-2 border-taupe pt-6">
                <h3 className="font-headline text-xl sm:text-2xl font-bold leading-[1.1] tracking-[-0.01em] text-black mb-2">
                  4-Way Stretch
                </h3>
                <p className="font-sans text-sm text-black/50 tracking-wide uppercase mb-3">
                  Stretch Technologie
                </p>
                <p className="font-sans text-[15px] sm:text-sm text-black/70 leading-relaxed">
                  78% polyamide en 22% elastaan in een mix die in alle
                  richtingen meebeweegt. Geen beperkingen, alleen vrijheid. De stof
                  herstelt na elke stretch naar zijn originele vorm.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="border-t-2 border-taupe pt-6">
                <h3 className="font-headline text-xl sm:text-2xl font-bold leading-[1.1] tracking-[-0.01em] text-black mb-2">
                  Vochtregulerende Stof
                </h3>
                <p className="font-sans text-sm text-black/50 tracking-wide uppercase mb-3">
                  Vochtregulering
                </p>
                <p className="font-sans text-[15px] sm:text-sm text-black/70 leading-relaxed">
                  Geavanceerde vochtafvoer transporteert zweet 2&times; sneller naar de
                  buitenkant van de stof. Je blijft droog en comfortabel, zelfs
                  tijdens de meest intensieve trainingen.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-14 md:py-24 bg-black">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8 text-center">
          <FadeIn>
            <p className="font-sans text-sm tracking-[0.3em] uppercase text-white/50 mb-4">
              Klaar om het verschil te voelen?
            </p>
            <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-[-0.01em] text-white mb-6">
              Ervaar
              <br />
              The Signature
            </h2>
            <p className="font-sans text-[15px] sm:text-base text-white/70 max-w-[46ch] mx-auto mb-10">
              De rijbroek met full-seat siliconen grip. Voor ruiters die
              niet willen kiezen tussen comfort en stijl.
            </p>
            <Link
              href="/product/the-signature"
              className="inline-flex items-center gap-2 px-8 py-4 bg-taupe text-black font-sans text-sm tracking-[0.15em] uppercase rounded-full hover:bg-taupe-light transition-all duration-300 active:scale-[0.98] min-h-[48px]"
            >
              Bekijk The Signature &rarr;
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
