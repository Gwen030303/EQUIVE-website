"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import FadeIn from "./FadeIn";
import { Star } from "@phosphor-icons/react/dist/ssr/Star";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";

const ease = [0.16, 1, 0.3, 1] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ================================================================
   USP BAR — Rotating trust signals (like Maya Delorez / Horse Gloss)
   ================================================================ */
function UspStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const usps = [
    { label: "Gratis verzending", sub: "Boven €50" },
    { label: "30 dagen retour", sub: "Geen gedoe" },
    { label: "Veilig betalen", sub: "iDEAL, Klarna & meer" },
    { label: "Klimaatneutraal", sub: "Verzonden" },
  ];

  return (
    <div ref={ref} className="bg-cream py-6 sm:py-5 border-y border-black/[0.06]">
      <div className="max-w-[1880px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {usps.map((usp, i) => (
            <motion.div
              key={usp.label}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
            >
              <p className="font-sans text-[13px] sm:text-[12px] font-medium tracking-[0.08em] uppercase text-black/80">
                {usp.label}
              </p>
              <p className="font-sans text-[12px] sm:text-[11px] text-black/40 mt-0.5">
                {usp.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   1. STATEMENT — Waarom EQUIVE (edge-to-edge editorial)
   ================================================================ */
function Statement() {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1]);

  return (
    <section>
      {/* Edge-to-edge split: image left, text right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">
        {/* Image — flush to screen edge, parallax */}
        <div ref={imgRef} className="relative min-h-[60vh] lg:min-h-full overflow-hidden">
          <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-[-8%]">
            <Image
              src="/statement-rider-4.png"
              alt="Ruiter in het zadel met EQUIVE rijbroek — full-seat grip detail"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Text — generous padding */}
        <div className="flex items-center bg-off-white px-5 sm:px-12 lg:px-20 py-12 sm:py-20 lg:py-28">
          <div className="max-w-xl">
            <FadeIn direction="up">
              <p className="font-sans text-[13px] tracking-[0.12em] uppercase text-taupe-dark mb-4 sm:mb-5">
                Waarom EQUIVE
              </p>
              <h2 className="font-headline font-bold text-[28px] sm:text-5xl lg:text-[3.5rem] text-black leading-[1.08] tracking-[-0.015em]">
                Comfort of stijl?
                <br />
                Die keuze bestaat
                <br />
                niet meer.
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.08}>
              <p className="font-sans text-base sm:text-[17px] text-black/55 leading-relaxed mt-7">
                Elke rijbroek dwingt je te kiezen. Comfort of stijl.
                Functioneel of mooi. Je voelt het elke keer als je in
                die broek stapt die niet helemaal klopt.
              </p>
            </FadeIn>

            {/* 3 compact USPs */}
            <FadeIn direction="up" delay={0.14}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-10 border-t border-black/[0.08]">
                {[
                  { stat: "Full-seat", label: "Siliconen grip" },
                  { stat: "4-way", label: "Stretch stof" },
                  { stat: "€79,99", label: "Early bird prijs" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="font-headline font-bold text-2xl sm:text-3xl text-black leading-none">
                      {item.stat}
                    </p>
                    <p className="font-sans text-[15px] sm:text-sm text-black/45 mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <Link
                  href="/product/the-signature"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[48px] bg-black text-white font-sans text-sm font-medium rounded-full transition-all duration-300 hover:bg-taupe"
                >
                  Bekijk The Signature
                  <ArrowRight size={16} weight="bold" />
                </Link>
                <Link
                  href="/ons-verhaal"
                  className="inline-flex items-center gap-1.5 min-h-[48px] font-sans text-sm font-medium text-black/60 hover:text-black transition-colors duration-300"
                >
                  Ons verhaal
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   2. PRODUCT — Clean, light background
   ================================================================ */
function Product() {
  return (
    <section className="bg-off-white py-14 sm:py-28 lg:py-36">
      <div className="max-w-[1880px] mx-auto px-5 md:px-8">
        <FadeIn direction="up">
          <p className="font-sans text-[12px] tracking-[0.15em] uppercase text-taupe-dark mb-6">
            The Signature Breech
          </p>
          <p className="font-sans text-base sm:text-lg text-black/60 leading-relaxed max-w-xl mb-12 lg:mb-16">
            Die frustratie kennen we. Als ruiters zelf maakten we de broek die
            we zelf zochten &mdash; een rijbroek zonder compromis.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <FadeIn direction="up" delay={0.05}>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
              <Image
                src="/sig-v2-front.webp"
                alt="EQUIVE The Signature Breech — vooraanzicht"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.12}>
            <div className="lg:sticky lg:top-28 lg:py-6">
              <h2 className="font-headline font-bold text-4xl sm:text-5xl lg:text-6xl text-black leading-[1.05] tracking-[-0.01em]">
                The
                <br />
                Signature
              </h2>

              <p className="font-sans text-base text-black/60 leading-relaxed mt-5 max-w-md">
                Comfort, grip en stijl in &eacute;&eacute;n rijbroek. Ontworpen
                voor ruiters die weigeren te kiezen.
              </p>

              <div className="flex items-baseline gap-4 mt-8">
                <span className="font-headline font-bold text-3xl text-black tracking-[-0.01em]">
                  &euro;79,99
                </span>
                <span className="inline-block px-3 py-1 bg-taupe text-white font-sans text-[11px] font-medium tracking-[0.08em] uppercase rounded-full">
                  Early Bird
                </span>
              </div>
              <p className="font-sans text-[15px] sm:text-sm text-black/40 mt-2">
                Regulier &euro;79,99 &middot; Gratis verzending
              </p>

              <div className="w-full h-px bg-black/[0.06] my-8" />

              <ul className="flex flex-col gap-3">
                {[
                  "Full-seat silicone grip met \u2018e\u2019 logo patroon",
                  "Zwarte glitter sparkle piping langs de zijnaden",
                  "Flapzakken met drukknopen",
                  "Mid-rise fit \u00B7 Kleur: zwart",
                ].map((item) => (
                  <li
                    key={item}
                    className="font-sans text-[15px] text-black/60 leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  href="/product/the-signature"
                  className="inline-flex items-center justify-center px-8 py-3.5 min-h-[48px] bg-black text-white font-sans text-[13px] font-medium tracking-[0.06em] uppercase rounded-full transition-all duration-300 hover:bg-taupe"
                >
                  Bekijk The Signature
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Product detail grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12 lg:mt-20">
          {[
            { src: "/sig-grip-detail.webp", alt: "Full-seat silicone grip close-up" },
            { src: "/sig-v2-back.webp", alt: "Achteraanzicht met flapzakken" },
            { src: "/lifestyle-fullseat.webp", alt: "Ruiter in het zadel" },
            { src: "/lifestyle-gallop.webp", alt: "Ruiter in galop" },
          ].map((img, i) => (
            <FadeIn key={img.src} direction="up" delay={0.06 + i * 0.04}>
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   3. FEATURES — Editorial split with single hero image
   ================================================================ */
function Features() {
  const featRef = useRef(null);
  const { scrollYProgress: featScroll } = useScroll({
    target: featRef,
    offset: ["start end", "end start"],
  });
  const featImgY = useTransform(featScroll, [0, 1], ["-8%", "8%"]);

  return (
    <section className="bg-cream">
      {/* Top: full-width image with overlaid text + parallax */}
      <div ref={featRef} className="relative min-h-[70vh] lg:min-h-[80vh] overflow-hidden">
        <motion.div style={{ y: featImgY }} className="absolute inset-[-10%]">
          <Image
            src="/sig-grip-detail.webp"
            alt="Full-seat silicone grip close-up"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1880px] mx-auto w-full px-5 md:px-8">
            <FadeIn direction="up">
              <p className="font-sans text-[13px] tracking-[0.12em] uppercase text-white/50 mb-5">
                Details
              </p>
              <h2 className="font-headline font-bold text-[28px] sm:text-5xl lg:text-[3.5rem] text-white leading-[1.08] tracking-[-0.015em] max-w-lg">
                Comfort en stijl.
                <br />
                In elk detail.
              </h2>
              <p className="font-sans text-base sm:text-lg text-white/60 leading-relaxed mt-5 max-w-md">
                Elk onderdeel van The Signature is ontworpen met
                &eacute;&eacute;n doel: jou beter laten rijden
                en er goed uitzien terwijl je het doet.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Bottom: 4 feature cards on cream */}
      <div className="max-w-[1880px] mx-auto px-5 md:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 lg:gap-x-14 gap-y-12">
          {[
            {
              title: "Full-seat grip",
              text: "Siliconen grip over het volledige zitvlak met herhalend logo patroon. Stabiliteit zonder in te leveren op stijl.",
              accent: "Grip",
            },
            {
              title: "4-way stretch",
              text: "Onbeperkte bewegingsvrijheid dankzij de polyamide-elastaan mix. De stof beweegt met je, niet ertegen.",
              accent: "Stof",
            },
            {
              title: "Sparkle piping",
              text: "Zwarte glitter biesjes langs de zijnaden. Net genoeg om gezien te worden — in de rijhal en daarbuiten.",
              accent: "Stijl",
            },
            {
              title: "Mid-rise fit",
              text: "Zit goed, blijft goed zitten. Van training tot wedstrijd tot de stad. Flapzakken met drukknopen.",
              accent: "Fit",
            },
          ].map((feat, i) => (
            <FadeIn key={feat.title} direction="up" delay={0.06 + i * 0.06}>
              <div>
                <p className="font-sans text-[12px] font-medium tracking-[0.12em] uppercase text-taupe-dark mb-3">
                  {feat.accent}
                </p>
                <h3 className="font-headline font-bold text-xl sm:text-[22px] text-black leading-tight">
                  {feat.title}
                </h3>
                <p className="font-sans text-[15px] text-black/50 leading-relaxed mt-3">
                  {feat.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up" delay={0.35}>
          <div className="mt-14 sm:mt-16 pt-10 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="font-sans text-base sm:text-lg text-black/40">
              78% polyamide &middot; 22% elastaan &middot; Wasbaar op 30&deg;C
            </p>
            <Link
              href="/kwaliteit"
              className="inline-flex items-center gap-2 px-7 py-3 min-h-[48px] bg-black text-white font-sans text-sm font-medium rounded-full transition-all duration-300 hover:bg-taupe flex-shrink-0"
            >
              Alle details
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   4. PLAN — Bold numbers, no images
   ================================================================ */
function Plan() {
  const steps = [
    {
      nr: "1",
      title: "Kies jouw maat",
      text: "Gebruik onze maatquiz — in 30 seconden weet je welke maat perfect past.",
      cta: { label: "Start de quiz", href: "/maatquiz" },
    },
    {
      nr: "2",
      title: "Bestel",
      text: "Gratis verzending, altijd. Binnen 2–3 werkdagen bij je thuis.",
    },
    {
      nr: "3",
      title: "Rijd met vertrouwen",
      text: "Comfortabel, stijlvol, zelfverzekerd. In het zadel én erbuiten.",
    },
    {
      nr: "4",
      title: "Niet blij? Retour.",
      text: "30 dagen bedenktijd. Gratis retourneren via PostNL. Geen vragen.",
    },
  ];

  return (
    <section className="bg-black py-14 sm:py-28 lg:py-36">
      <div className="max-w-[1880px] mx-auto px-5 md:px-8">
        <FadeIn direction="up">
          <p className="font-sans text-[13px] tracking-[0.12em] uppercase text-taupe mb-5">
            Hoe het werkt
          </p>
          <h2 className="font-headline font-bold text-[28px] sm:text-5xl lg:text-[3.5rem] text-white leading-[1.08] tracking-[-0.015em]">
            In vier stappen klaar.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-0 mt-10 sm:mt-18 lg:mt-20">
          {steps.map((step, i) => (
            <FadeIn key={step.nr} direction="up" delay={0.06 + i * 0.06}>
              <div className={`relative p-6 sm:p-8 lg:p-8 h-full flex flex-col ${
                i < steps.length - 1 ? "border-b sm:border-b-0 sm:border-r border-white/[0.08]" : ""
              }`}>
                {/* Giant number */}
                <span className="font-headline font-bold text-[120px] sm:text-[140px] lg:text-[160px] leading-none text-white/[0.04] absolute top-2 right-4 select-none">
                  {step.nr}
                </span>

                <div className="relative">
                  <motion.span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-taupe/30 font-headline font-bold text-lg text-taupe mb-5"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease }}
                  >
                    {step.nr}
                  </motion.span>
                  <h3 className="font-headline font-bold text-[22px] text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[15px] text-white/70 leading-relaxed">
                    {step.text}
                  </p>
                  {step.cta && (
                    <Link
                      href={step.cta.href}
                      className="group/link inline-flex items-center gap-2 mt-5 min-h-[48px] font-sans text-sm font-medium text-taupe hover:text-taupe-light transition-colors duration-300"
                    >
                      {step.cta.label}
                      <ArrowRight
                        size={14}
                        weight="bold"
                        className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   5. SOCIAL PROOF
   ================================================================ */
const testimonials = [
  {
    quote:
      "Eindelijk een rijbroek waar ik me ook na de les niet voor hoef om te kleden. De stof voelt ongelooflijk.",
    name: "Fleur H.",
    detail: "Laren \u00B7 Dressuur",
  },
  {
    quote:
      "De grip is next level. Ik merk het verschil meteen, vooral bij de galop en over de sprong.",
    name: "Sanne de V.",
    detail: "Brabant \u00B7 Springen",
  },
  {
    quote:
      "Drie merken geprobeerd. Dit is de eerste broek die comfort \u00E9n stijl combineert. Ik ga niet meer terug.",
    name: "Lotte V.",
    detail: "Noord-Holland \u00B7 Eventing",
  },
];

function SocialProof() {
  return (
    <section className="relative py-14 sm:py-28 lg:py-36 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/reviews-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative max-w-[1880px] mx-auto px-5 md:px-8">
        {/* Header — centered */}
        <FadeIn direction="up">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18 lg:mb-20">
            <div className="flex items-center justify-center gap-1.5 mb-5">
              {Array.from({ length: 5 }).map((_, j) => (
                <motion.span
                  key={j}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + j * 0.08, ease }}
                >
                  <Star size={22} weight="fill" className="text-taupe" />
                </motion.span>
              ))}
            </div>
            <h2 className="font-headline font-bold text-[28px] sm:text-5xl lg:text-[3.5rem] text-white leading-[1.08] tracking-[-0.015em]">
              Ruiters die niet meer
              <br />
              terug willen.
            </h2>
            <p className="font-sans text-base sm:text-lg text-white/70 mt-5">
              4.8 uit 5 &middot; Beoordeeld door 50+ ruiters
            </p>
          </div>
        </FadeIn>

        {/* 3 testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} direction="up" delay={0.06 + i * 0.06}>
              <div className="bg-off-white rounded-xl p-6 sm:p-10 h-full flex flex-col relative overflow-hidden">
                {/* Decorative large quote mark */}
                <span className="absolute -top-2 -left-1 font-serif text-[120px] leading-none text-taupe/[0.07] select-none pointer-events-none">
                  &ldquo;
                </span>

                <div className="relative flex flex-col flex-1">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        weight="fill"
                        className="text-taupe"
                      />
                    ))}
                  </div>

                  <blockquote className="font-sans text-[16px] sm:text-[17px] text-black/70 leading-relaxed flex-1">
                    {t.quote}
                  </blockquote>

                  <div className="flex items-center gap-3 mt-8 pt-6 border-t border-black/[0.05]">
                    {/* Avatar placeholder */}
                    <div className="w-10 h-10 rounded-full bg-taupe/15 flex items-center justify-center flex-shrink-0">
                      <span className="font-headline font-bold text-sm text-taupe-dark">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-sub font-medium text-sm text-black">
                        {t.name}
                      </p>
                      <p className="font-sans text-[13px] text-black/40">
                        {t.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   6. LIFESTYLE BAND — Bento grid, sluit aan op Statement (cream)
   ================================================================ */
function LifestyleBreak() {
  return (
    <section>
      {/* Thin divider */}
      <div className="h-2 sm:h-[3px] bg-black/[0.06]" />
      {/* Bento grid: tall image left, image + text card right */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-3 md:gap-[3px] md:min-h-[80vh]">
        {/* Left — tall lifestyle image spanning 2 rows */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="md:col-span-7 md:row-span-2 relative overflow-hidden min-h-[55vh] md:min-h-[50vh]"
        >
        <Link
          href="/product/the-signature"
          className="group block relative w-full h-full"
        >
          <Image
            src="/lifestyle-gallop-2.png"
            alt="Ruiter in galop met EQUIVE rijbroek"
            fill
            sizes="(max-width: 768px) 100vw, 58vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-10">
            <p className="font-sans text-sm font-medium tracking-[0.04em] text-white/70 mb-1">
              The Signature Breech
            </p>
            <p className="font-headline font-bold text-2xl sm:text-3xl text-white leading-tight">
              Shop de collectie
            </p>
          </div>
        </Link>
        </motion.div>

        {/* Top right — grip detail image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="md:col-span-5 relative overflow-hidden min-h-[40vh] md:min-h-[35vh]"
        >
        <Link
          href="/kwaliteit"
          className="group block relative w-full h-full"
        >
          <Image
            src="/detail-button.png"
            alt="EQUIVE rijbroek detail — drukknoop en glitter piping"
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <p className="font-sans text-sm font-medium tracking-[0.04em] text-white">
              Ontdek de kwaliteit &rarr;
            </p>
          </div>
        </Link>
        </motion.div>

        {/* Bottom right — text card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="md:col-span-5 bg-black flex items-center px-6 sm:px-10 md:px-12 py-12 md:py-0"
        >
          <FadeIn direction="up">
            <div>
              <p className="font-headline font-bold text-[22px] sm:text-3xl lg:text-4xl text-white leading-[1.1]">
                Ontworpen door ruiters.
                <br />
                <span className="text-taupe">Voor ruiters.</span>
              </p>
              <p className="font-sans text-[15px] sm:text-sm text-white/45 mt-4 max-w-sm leading-relaxed">
                Elke naad, elke stof, elk detail &mdash; getest in het zadel.
                Niet op een tekentafel.
              </p>
              <Link
                href="/ons-verhaal"
                className="inline-flex items-center gap-2 mt-6 min-h-[48px] font-sans text-sm font-medium text-taupe hover:text-taupe-light transition-colors duration-300"
              >
                Lees ons verhaal
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </FadeIn>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   7. FINAL CTA — Compact, two-column
   ================================================================ */
function FinalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => setSubmitted(false), 5000);
    return () => clearTimeout(timer);
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Vul een geldig e-mailadres in.");
      return;
    }
    setEmailError("");
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "newsletter" }),
      });
    } catch {
      /* fallback */
    }
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-black py-12 sm:py-20 lg:py-24">
      <div className="max-w-[1880px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left — CTA */}
          <FadeIn direction="up">
            <h2 className="font-headline font-bold text-[26px] sm:text-4xl lg:text-5xl text-white leading-[1.08] tracking-[-0.015em]">
              Stop met kiezen.
            </h2>
            <p className="font-sans text-base text-white/50 mt-4 max-w-md leading-relaxed">
              Comfortabel, stijlvol, zelfverzekerd &mdash; in het zadel en erbuiten.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-7">
              <Link
                href="/product/the-signature"
                className="inline-flex items-center justify-center px-8 py-3.5 min-h-[48px] bg-white text-black font-sans text-sm font-medium rounded-full transition-all duration-300 hover:bg-taupe hover:text-white"
              >
                Shop The Signature
              </Link>
              <span className="font-sans text-[13px] text-white/30">
                Vanaf &euro;79,99
              </span>
            </div>
          </FadeIn>

          {/* Right — Newsletter */}
          <FadeIn direction="up" delay={0.1}>
            <div className="lg:max-w-md lg:ml-auto">
              <p className="font-sans text-sm text-white/50 mb-4">
                10% korting op je eerste bestelling
              </p>

              {submitted ? (
                <p className="font-sub font-medium text-lg text-taupe">
                  Welkom. Check je inbox.
                </p>
              ) : (
                <>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-0"
                  >
                    <div className="flex-1">
                      <label htmlFor="home-email" className="sr-only">
                        E-mailadres
                      </label>
                      <input
                        id="home-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError("");
                        }}
                        placeholder="Je e-mailadres"
                        required
                        className={`w-full px-5 py-3.5 min-h-[48px] bg-white/[0.06] border text-white placeholder:text-white/30 font-sans text-[15px] sm:text-sm rounded-full sm:rounded-l-full sm:rounded-r-none focus:outline-none focus:border-taupe transition-colors duration-300 ${
                          emailError ? "border-red-400" : "border-white/15"
                        }`}
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-7 py-3.5 min-h-[48px] bg-taupe text-white font-sans text-[13px] font-medium tracking-[0.04em] uppercase rounded-full sm:rounded-r-full sm:rounded-l-none transition-all duration-300 hover:bg-taupe-dark flex-shrink-0"
                    >
                      Aanmelden
                    </button>
                  </form>
                  {emailError && (
                    <p className="font-sans text-sm text-red-400 mt-2">
                      {emailError}
                    </p>
                  )}
                  <p className="font-sans text-[11px] text-white/25 mt-3">
                    Geen spam. Op elk moment uitschrijven.
                  </p>
                </>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export default function HomeSections() {
  return (
    <>
      <UspStrip />
      <Statement />
      <LifestyleBreak />
      <div className="h-2 sm:h-[3px] bg-black/[0.06]" />
      <Plan />
      <div className="h-2 sm:h-[3px] bg-black/[0.06]" />
      <Features />
      <div className="h-2 sm:h-[3px] bg-black/[0.06]" />
      <SocialProof />
      <FinalCTA />
    </>
  );
}
