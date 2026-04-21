import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden | EQUIVE",
  description:
    "Lees de algemene voorwaarden van EQUIVE. Informatie over bestellingen, verzending, retourneren en garantie.",
  alternates: {
    canonical: "/algemene-voorwaarden",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Algemene Voorwaarden | EQUIVE",
    description: "Lees de algemene voorwaarden van EQUIVE. Informatie over bestellingen, verzending, retourneren en garantie.",
    url: "https://www.equive.shop/algemene-voorwaarden",
    siteName: "EQUIVE",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EQUIVE - Premium Rijbroeken" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Algemene Voorwaarden | EQUIVE",
    description: "Lees de algemene voorwaarden van EQUIVE. Informatie over bestellingen, verzending, retourneren en garantie.",
    images: ["/og-image.jpg"],
  },
};

const sections = [
  {
    title: "1. Algemeen",
    content:
      "Deze algemene voorwaarden zijn van toepassing op alle bestellingen geplaatst via de website van EQUIVE (www.equive.shop). Door een bestelling te plaatsen, ga je akkoord met deze voorwaarden. EQUIVE behoudt zich het recht voor om deze voorwaarden te wijzigen.",
  },
  {
    title: "2. Prijzen & Betaling",
    content:
      "Alle prijzen op onze website zijn in euro's en inclusief btw. Verzendkosten worden apart vermeld bij het afrekenen. Wij accepteren betalingen via iDEAL, creditcard (Visa & Mastercard), Klarna en PayPal. De betaling wordt verwerkt op het moment van bestellen.",
  },
  {
    title: "3. Verzending",
    content:
      "Wij verzenden bestellingen binnen 1–2 werkdagen na ontvangst van de betaling. Verzending binnen Nederland is gratis. Voor verzending naar België kunnen verzendkosten in rekening worden gebracht. Je ontvangt een track & trace code zodra je bestelling is verzonden.",
  },
  {
    title: "4. Ruilen en retourneren",
    content:
      "Je hebt het recht om binnen 30 dagen na ontvangst van je bestelling het product te ruilen voor een andere maat of volledig te retourneren. Het product dient ongedragen, ongewassen en in de originele verpakking te worden teruggestuurd. Bij het ruilen van een maat nemen wij de verzendkosten voor onze rekening. Bij een volledige retourzending zijn de verzendkosten voor eigen rekening. Na ontvangst en controle van het geretourneerde product wordt het aankoopbedrag binnen 14 dagen teruggestort.",
  },
  {
    title: "5. Garantie",
    content:
      "EQUIVE staat achter de kwaliteit van haar producten. Mocht je een defect of kwaliteitsprobleem ervaren, neem dan contact met ons op. Wij beoordelen elk geval individueel en bieden waar mogelijk een passende oplossing, zoals vervanging of restitutie.",
  },
  {
    title: "6. Intellectueel Eigendom",
    content:
      "Alle content op de EQUIVE website, waaronder teksten, afbeeldingen, logo's en ontwerpen, is eigendom van EQUIVE en beschermd door auteursrecht. Het is niet toegestaan om deze content te kopiëren, verspreiden of commercieel te gebruiken zonder schriftelijke toestemming.",
  },
  {
    title: "7. Aansprakelijkheid",
    content:
      "EQUIVE is niet aansprakelijk voor indirecte schade, gevolgschade of gederfde winst. Onze aansprakelijkheid is beperkt tot het bedrag van de betreffende bestelling. Dit laat onverlet je wettelijke rechten als consument.",
  },
  {
    title: "8. Toepasselijk Recht",
    content:
      "Op deze algemene voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Amsterdam.",
  },
];

export default function AlgemeneVoorwaarden() {
  return (
    <div className="min-h-[100dvh] bg-white">
      <header className="pt-32 md:pt-40 pb-8 md:pb-12">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-sans text-sm text-black/50 hover:text-black transition-colors mb-10 min-h-[44px]"
            >
              <ArrowLeft size={16} weight="bold" />
              Terug naar Home
            </Link>
            <h1 className="font-headline text-3xl md:text-6xl text-black font-bold tracking-[-0.01em]">
              Algemene Voorwaarden
            </h1>
            <p className="font-sans text-[15px] sm:text-sm text-black/50 mt-4">
              Laatst bijgewerkt: maart 2026
            </p>
          </div>
        </div>
      </header>

      <main className="pb-20 bg-off-white">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8">
          <div className="max-w-3xl py-12">
          <div className="space-y-8 sm:space-y-10">
            {sections.map((section) => (
              <article key={section.title}>
                <h2 className="font-sans text-[15px] sm:text-sm font-medium text-black tracking-wide mb-3">
                  {section.title}
                </h2>
                <div className="font-sans text-[15px] sm:text-sm text-black/70 leading-[1.7] sm:leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-black/[0.06]">
            <p className="font-sans text-sm sm:text-xs text-black/50">
              Heb je vragen over onze voorwaarden? Neem dan contact met ons op
              via onze website.
            </p>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}
