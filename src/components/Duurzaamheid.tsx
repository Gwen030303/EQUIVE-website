"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FadeIn from "@/components/FadeIn";

const pillars = [
  {
    number: "01",
    title: "Materialen",
    description:
      "Wij kiezen voor hoogwaardige, duurzame stoffen die lang meegaan. Kwaliteit boven kwantiteit.",
    detail:
      "Onze stoffen worden zorgvuldig geselecteerd op duurzaamheid, comfort en prestatie. Minder kopen, langer dragen.",
  },
  {
    number: "02",
    title: "Productie",
    description:
      "Onze producten worden geproduceerd in gecertificeerde fabrieken in Europa, dicht bij huis.",
    detail:
      "Korte transportlijnen, eerlijke arbeidsomstandigheden en strenge kwaliteitscontroles in elke stap van het proces.",
  },
  {
    number: "03",
    title: "Verpakking",
    description:
      "Wij verzenden in recyclebare verpakkingen en minimaliseren plastic gebruik.",
    detail:
      "Onze mailers zijn gemaakt van gerecycled materiaal en volledig recyclebaar. Geen onnodige extras, geen overbodig plastic.",
  },
  {
    number: "04",
    title: "Verzending",
    description:
      "Klimaatneutraal verzonden via compensatie van CO\u2082-uitstoot.",
    detail:
      "Elke bestelling wordt klimaatneutraal bezorgd. Wij compenseren de uitstoot van transport via gecertificeerde klimaatprojecten.",
  },
];

export default function Duurzaamheid() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative aspect-[1/1] md:aspect-[2.2/1] w-full overflow-hidden"
      >
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-[-10%]"
        >
          <Image
            src="/horse-field.webp"
            alt="Paard in een groen veld"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1880px] mx-auto w-full px-5 md:px-8 pb-10 md:pb-16 lg:pb-20">
            <FadeIn>
              <p className="font-sans text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-white/60 mb-4">
                Bewust bezig
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.01em]">
                Duurzaamheid
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-sans text-base sm:text-lg text-white/50 mt-5">
                Eerlijk, bewust &amp; transparant
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 sm:py-28 lg:py-36">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <FadeIn className="md:col-span-5">
              <p className="font-sans text-[12px] tracking-[0.15em] uppercase text-taupe-dark mb-6">
                Hoe wij het doen
              </p>
              <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-black leading-[1.1] tracking-[-0.01em]">
                Mode met
                <br />
                een missie
              </h2>
            </FadeIn>

            <FadeIn delay={0.15} className="md:col-span-6 md:col-start-7 flex items-center">
              <div>
                <p className="font-sans text-[15px] text-black/60 leading-relaxed mb-4">
                  Bij EQUIVE geloven we dat kwaliteit en verantwoordelijkheid hand in hand gaan.
                  We zijn eerlijk: we zijn niet perfect. Maar we maken bewuste keuzes in elke
                  stap van het proces, van grondstof tot levering.
                </p>
                <p className="font-sans text-[15px] text-black/60 leading-relaxed">
                  Duurzaamheid is voor ons geen marketingtruc, maar een fundament.
                  Wij kiezen voor kwaliteit die generaties meegaat, productie dicht bij huis,
                  en transparantie over wat we wel en nog niet goed doen.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 sm:py-28 lg:py-36 bg-cream">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8">
          <FadeIn>
            <p className="font-sans text-[12px] tracking-[0.15em] uppercase text-taupe-dark mb-6">
              Onze Pijlers
            </p>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-black leading-[1.1] tracking-[-0.01em] mb-12 md:mb-16">
              Waar wij
              <br />
              voor staan
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {pillars.map((pillar, i) => (
              <FadeIn key={pillar.number} delay={i * 0.1}>
                <div className="group relative bg-white rounded-lg p-6 sm:p-8 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] transition-shadow duration-300 h-full">
                  <span className="font-headline font-bold text-4xl sm:text-5xl text-black/[0.05] absolute top-5 right-6 sm:top-6 sm:right-8 leading-none select-none">
                    {pillar.number}
                  </span>

                  <div className="relative">
                    <h3 className="font-headline font-bold text-xl sm:text-2xl text-black mb-3">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-[15px] text-black/60 leading-relaxed mb-2 max-w-[44ch]">
                      {pillar.description}
                    </p>
                    <p className="font-sans text-[13px] text-black/40 leading-relaxed max-w-[44ch]">
                      {pillar.detail}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 sm:py-28 lg:py-36 bg-black">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8 text-center">
          <FadeIn>
            <blockquote className="font-sub font-normal text-lg sm:text-xl md:text-2xl text-white/70 leading-relaxed max-w-[36ch] mx-auto">
              &ldquo;Wij maken geen fast fashion. Wij maken rijbroeken die je jarenlang met trots draagt.&rdquo;
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-sans text-[12px] tracking-[0.12em] uppercase text-white/30 mt-5">
              Het EQUIVE Team
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 lg:py-36">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8 text-center">
          <FadeIn>
            <p className="font-sans text-[12px] tracking-[0.15em] uppercase text-taupe-dark mb-6">
              Meer Ontdekken
            </p>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-black leading-[1.1] tracking-[-0.01em] mb-5">
              Ontdek EQUIVE
            </h2>
            <p className="font-sans text-[15px] text-black/50 leading-relaxed max-w-[48ch] mx-auto mb-8">
              Benieuwd naar onze producten of ons verhaal? Ontdek wat EQUIVE bijzonder maakt.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/product/the-signature"
                className="inline-flex items-center justify-center gap-2 font-sans text-[13px] font-medium tracking-[0.06em] uppercase bg-black text-white px-8 py-3.5 rounded-full hover:bg-taupe transition-colors duration-300 w-full sm:w-auto"
              >
                Bekijk The Signature
              </Link>
              <Link
                href="/ons-verhaal"
                className="inline-flex items-center gap-2 font-sans text-[13px] font-medium tracking-[0.06em] uppercase text-taupe-dark hover:text-black transition-colors duration-300"
              >
                Ons Verhaal &rarr;
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
