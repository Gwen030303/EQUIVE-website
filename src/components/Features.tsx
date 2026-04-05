"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "./FadeIn";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Features() {
  /* Parallax — ref on a plain div, NOT on motion.div */
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative aspect-[3/4] md:aspect-[2.2/1] w-full overflow-hidden">
        <Image
          src="/product-grip-detail.webp"
          alt="Macro close-up van het EQUIVE siliconen grip patroon"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1880px] mx-auto w-full px-5 md:px-8 pb-10 md:pb-16 lg:pb-20">
            <FadeIn>
              <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-white/60 mb-4">
                Kwaliteit &amp; Technologie
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.01em]">
                Elk detail telt.
              </h1>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Specs bar ── */}
      <div className="bg-black">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-0">
          {[
            { value: "78%", label: "Polyamide" },
            { value: "22%", label: "Elastaan" },
            { value: "4-Way", label: "Stretch" },
            { value: "30\u00B0C", label: "Wasbaar" },
          ].map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
            >
              <div className={`py-6 sm:py-10 px-4 sm:px-8 text-center ${
                i % 2 === 0 ? "border-r border-white/[0.06]" : ""
              } ${i < 2 ? "border-b border-white/[0.06]" : ""
              } lg:border-b-0 ${i < 3 ? "lg:border-r" : "lg:border-r-0"} lg:border-white/[0.06]`}>
                <p className="font-headline font-bold text-3xl sm:text-4xl text-white leading-none">
                  {spec.value}
                </p>
                <p className="font-sans text-[11px] sm:text-[13px] text-white/45 uppercase tracking-[0.08em] mt-2">
                  {spec.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Features — single image + text columns ── */}
      <div className="h-[3px] bg-white/[0.15] mt-2 sm:mt-0" />
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] lg:min-h-[90vh]">
          {/* Left — sticky image with parallax */}
          <div
            ref={parallaxRef}
            className="relative min-h-[56vw] sm:min-h-[50vh] lg:min-h-full lg:sticky lg:top-0 lg:h-screen overflow-hidden"
          >
            <motion.div className="absolute inset-0" style={{ y: imageY }}>
              <Image
                src="/feat1.webp"
                alt="Full-seat siliconen grip detail"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover scale-[1.15]"
              />
            </motion.div>
          </div>

          {/* Right — scrollable feature list */}
          <div className="bg-black">
            {[
              {
                nr: "01",
                title: "Full-seat siliconen grip",
                text: "Grip over het volledige zitvlak met herhalend cirkelpatroon. Geen verschuiven, alleen vertrouwen — bij elke beweging.",
              },
              {
                nr: "02",
                title: "4-way stretch",
                text: "De stof beweegt met je lichaam, niet ertegen. Onbeperkte bewegingsvrijheid. 78% polyamide, 22% elastaan.",
              },
              {
                nr: "03",
                title: "Vochtregulerende stof",
                text: "Geavanceerde vochtafvoer houdt je droog en comfortabel, zelfs tijdens de meest intensieve trainingen.",
              },
            ].map((feat, i) => (
              <FadeIn key={feat.nr} direction="up" delay={0.04 + i * 0.06}>
                <div className={`px-5 sm:px-12 lg:px-16 py-10 sm:py-20 ${
                  i < 2 ? "border-b border-white/[0.06]" : ""
                }`}>
                  <span className="font-headline font-bold text-7xl sm:text-8xl text-white/[0.04] leading-none block mb-4">
                    {feat.nr}
                  </span>
                  <h3 className="font-headline font-bold text-2xl sm:text-3xl text-white leading-[1.1]">
                    {feat.title}
                  </h3>
                  <p className="font-sans text-[15px] sm:text-base text-white/65 leading-relaxed mt-4 max-w-md">
                    {feat.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="h-[3px] bg-white/[0.15] mb-2 sm:mb-0" />

      {/* ── Waarom EQUIVE — full-width image + overlay CTA ── */}
      <section className="relative min-h-[80vh] sm:min-h-[70vh] overflow-hidden">
        <Image
          src="/detail-button.png"
          alt="EQUIVE rijbroek detail"
          fill
          sizes="100vw"
          quality={75}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 sm:bg-gradient-to-r sm:from-black/75 sm:via-black/50 sm:to-black/30" />

        <div className="absolute inset-0 flex items-end pb-10 sm:items-center sm:pb-0">
          <div className="max-w-[1880px] mx-auto w-full px-5 md:px-8">
            <FadeIn direction="up">
              <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.08] tracking-[-0.015em] max-w-lg">
                Waarom ruiters de
                <br />
                overstap maken.
              </h2>
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8">
                {["Full-seat grip", "4-way stretch", "Stal tot stad", "€79,99 direct", "Dekkend & ademend"].map((tag) => (
                  <span
                    key={tag}
                    className="font-sans text-[13px] sm:text-sm text-white/90 border border-white/20 px-3 sm:px-4 py-2 min-h-[48px] inline-flex items-center rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/product/the-signature"
                className="inline-flex items-center gap-2 mt-8 sm:mt-10 px-8 py-3.5 min-h-[48px] bg-white text-black font-sans text-sm font-medium rounded-full transition-all duration-300 hover:bg-taupe hover:text-white"
              >
                Bekijk The Signature
                <ArrowRight size={14} weight="bold" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
