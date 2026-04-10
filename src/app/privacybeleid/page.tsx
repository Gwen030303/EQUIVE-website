import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";

export const metadata: Metadata = {
  title: "Privacybeleid | EQUIVE",
  description:
    "Lees het privacybeleid van EQUIVE. Wij respecteren je privacy en beschermen je persoonsgegevens conform de AVG.",
  alternates: {
    canonical: "/privacybeleid",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacybeleid | EQUIVE",
    description: "Lees het privacybeleid van EQUIVE. Wij respecteren je privacy en beschermen je persoonsgegevens conform de AVG.",
    url: "https://www.equive.shop/privacybeleid",
    siteName: "EQUIVE",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EQUIVE - Premium Rijbroeken" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacybeleid | EQUIVE",
    description: "Lees het privacybeleid van EQUIVE. Wij respecteren je privacy en beschermen je persoonsgegevens conform de AVG.",
    images: ["/og-image.jpg"],
  },
};

const sections = [
  {
    title: "1. Wie zijn wij?",
    content:
      "EQUIVE is een Nederlands merk gespecialiseerd in premium rijkleding, verantwoordelijk voor de verwerking van jouw persoonsgegevens zoals beschreven in dit privacybeleid. Heb je vragen? Neem dan contact op via het contactformulier of e-mail.",
  },
  {
    title: "2. Welke gegevens verzamelen wij?",
    content:
      "Wij kunnen de volgende persoonsgegevens verzamelen en verwerken:\n\n- Naam en achternaam\n- E-mailadres\n- Adresgegevens (voor verzending)\n- Bestel- en betalingsgegevens\n- Gegevens over je gebruik van onze website (via cookies)\n- Communicatievoorkeuren",
  },
  {
    title: "3. Waarvoor gebruiken wij jouw gegevens?",
    content:
      "Wij verwerken jouw gegevens voor de volgende doeleinden:\n\n- Het afhandelen van jouw bestelling en betaling\n- Het verzenden van jouw bestelling\n- Het informeren over de status van je bestelling\n- Het versturen van onze nieuwsbrief (alleen met jouw toestemming)\n- Het verbeteren van onze website en dienstverlening\n- Het voldoen aan wettelijke verplichtingen",
  },
  {
    title: "4. Hoe lang bewaren wij jouw gegevens?",
    content:
      "Wij bewaren jouw persoonsgegevens niet langer dan strikt noodzakelijk is voor de doeleinden waarvoor ze zijn verzameld. Voor bestelgegevens hanteren wij de wettelijke bewaartermijn van zeven jaar (fiscale bewaarplicht). Nieuwsbriefvoorkeuren worden bewaard totdat je je afmeldt.",
  },
  {
    title: "5. Delen wij jouw gegevens met derden?",
    content:
      "Wij delen jouw gegevens alleen met derden als dit noodzakelijk is voor de uitvoering van onze diensten. Denk hierbij aan:\n\n- Bezorgdiensten (voor het verzenden van je bestelling)\n- Betalingsverwerkers (voor het afhandelen van betalingen)\n- Hosting- en IT-dienstverleners\n\nWij verkopen jouw gegevens nooit aan derden.",
  },
  {
    title: "6. Cookies",
    content:
      "Onze website maakt gebruik van cookies om je ervaring te verbeteren. Functionele cookies zijn noodzakelijk voor het correct functioneren van de website. Analytische cookies helpen ons de website te verbeteren. Je kunt cookies altijd beheren of verwijderen via je browserinstellingen.",
  },
  {
    title: "7. Jouw rechten",
    content:
      "Op grond van de AVG heb je het recht om:\n\n- Je persoonsgegevens in te zien\n- Je persoonsgegevens te laten corrigeren\n- Je persoonsgegevens te laten verwijderen\n- Je toestemming voor gegevensverwerking in te trekken\n- Bezwaar te maken tegen de verwerking van je gegevens\n- Gegevensoverdraagbaarheid te verzoeken\n\nNeem contact met ons op om gebruik te maken van deze rechten.",
  },
  {
    title: "8. Beveiliging",
    content:
      "Wij nemen de bescherming van jouw gegevens serieus. Wij nemen passende technische en organisatorische maatregelen om misbruik, verlies, onbevoegde toegang en ongewenste openbaarmaking tegen te gaan. Onze website maakt gebruik van een beveiligde SSL-verbinding.",
  },
  {
    title: "9. Wijzigingen",
    content:
      "Wij behouden ons het recht voor om dit privacybeleid te wijzigen. Wijzigingen worden op deze pagina gepubliceerd. Wij raden je aan om dit privacybeleid regelmatig te raadplegen.",
  },
];

export default function Privacybeleid() {
  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Header */}
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
              Privacybeleid
            </h1>
            <p className="font-sans text-[15px] sm:text-sm text-black/50 mt-4">
              Laatst bijgewerkt: maart 2026
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
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

          {/* Contact line */}
          <div className="mt-16 pt-10 border-t border-black/[0.06]">
            <p className="font-sans text-sm sm:text-xs text-black/50">
              Heb je vragen over ons privacybeleid? Neem dan contact met ons op
              via onze website.
            </p>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}
