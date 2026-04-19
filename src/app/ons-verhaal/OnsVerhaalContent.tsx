"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";

const ease = [0.16, 1, 0.3, 1] as const;

export default function OnsVerhaalContent() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const teaserParallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: teaserScrollY } = useScroll({
    target: teaserParallaxRef,
    offset: ["start end", "end start"],
  });
  const teaserImgY = useTransform(teaserScrollY, [0, 1], ["-4%", "4%"]);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative aspect-[3/4] md:aspect-[2.2/1] w-full overflow-hidden">
        <Image
          src="/hero-ons-verhaal-2.webp"
          alt="Ruiter te paard bij zonsopkomst"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover object-[center_15%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1880px] mx-auto w-full px-5 md:px-8 pb-10 md:pb-16 lg:pb-20">
            <FadeIn>
              <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-white/60 mb-4">
                Over EQUIVE
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.01em]">
                Ons verhaal.
              </h1>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── STATS BALK ── */}
      <div className="bg-black">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-0">
          {[
            { value: "100%", label: "Full-seat grip" },
            { value: "4-way", label: "Stretch stof" },
            { value: "30", label: "Dagen retour" },
            { value: "AMS", label: "Ontworpen in Amsterdam" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              <div className={`py-6 sm:py-10 px-4 sm:px-8 text-center ${
                i % 2 === 0 ? "border-r border-white/[0.06]" : ""
              } ${i < 2 ? "border-b border-white/[0.06]" : ""
              } lg:border-b-0 ${i < 3 ? "lg:border-r" : "lg:border-r-0"} lg:border-white/[0.06]`}>
                <p className="font-headline font-bold text-3xl sm:text-5xl text-white leading-none">
                  {stat.value}
                </p>
                <p className="font-sans text-[11px] sm:text-[13px] text-white/50 uppercase tracking-[0.1em] mt-2">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── VERHAAL — image left, text right ── */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] lg:min-h-[80vh]">
          <div ref={parallaxRef} className="relative min-h-[56vw] sm:min-h-[50vh] lg:min-h-full overflow-hidden">
            <motion.div style={{ y: imgY }} className="absolute inset-[-8%]">
              <Image
                src="/story-gwen.webp"
                alt="Gwen met twee paarden"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={75}
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="flex items-center bg-off-white px-5 sm:px-14 lg:px-20 py-12 sm:py-20 lg:py-28">
            <div className="max-w-lg">
              <FadeIn direction="up">
                <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-[3rem] text-black leading-[1.1] tracking-[-0.015em]">
                  Jij kent het gevoel.
                </h2>
                <p className="font-sans text-base sm:text-[17px] text-black/70 leading-relaxed mt-6">
                  De ene broek ziet er goed uit maar zit als karton.
                  De andere zit lekker maar oogt als sportkleding.
                  Elke keer weer die zelfde keuze &mdash; comfort of stijl.
                </p>
                <p className="font-sans text-base sm:text-[17px] text-black/70 leading-relaxed mt-4">
                  <strong className="text-black">Ik weigerde die te maken.</strong>
                </p>
                <p className="font-sans text-base sm:text-[17px] text-black/70 leading-relaxed mt-4">
                  Als ruiter zocht ik maandenlang naar een broek die gewoon
                  allebei kon. Die er professioneel uitziet op het parcours
                  &eacute;n lekker zit na drie uur training. Ik vond hem niet.
                  Dus maakte ik hem zelf.
                </p>
                <p className="font-sans text-base sm:text-[17px] text-black/70 leading-relaxed mt-4">
                  Dat werd EQUIVE &mdash; niet als merk met een missie, maar
                  als antwoord op een frustratie die elke serieuze ruiter kent.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.1}>
                <div className="w-10 h-[1.5px] bg-taupe mt-10 mb-6" />
                <p className="font-sans text-base sm:text-[17px] text-black/70 leading-relaxed">
                  Voor jou. Want jij verdient ook niet te kiezen.
                </p>
                <p className="font-sans text-sm text-black/50 mt-4">
                  &mdash; Gwen, oprichtster
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BALK ── */}
      <section className="py-12 sm:py-12 lg:py-14">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <FadeIn direction="up">
              <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-black leading-[1.08] tracking-[-0.015em]">
                Dit is pas het begin.
              </h2>
            </FadeIn>
            <FadeIn direction="up" delay={0.08}>
              <Link
                href="/product/the-signature"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[48px] bg-black text-white font-sans text-sm font-medium rounded-full transition-all duration-300 hover:bg-taupe flex-shrink-0"
              >
                Bekijk The Signature
                <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── KERNWAARDEN ── */}
      <section className="bg-off-white py-16 sm:py-28 lg:py-36">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8">
          <FadeIn direction="up">
            <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-black/40 mb-4 text-center">
              Kernwaarden
            </p>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-black leading-[1.08] tracking-[-0.015em] text-center max-w-2xl mx-auto">
              Waar we voor staan.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mt-14 sm:mt-18 lg:mt-20">
            {[
              {
                title: "Geen compromis",
                description:
                  "Comfort en stijl horen samen. Wij weigeren te kiezen — en jij hoeft dat ook niet.",
              },
              {
                title: "Ruiter-eerst",
                description:
                  "Elke stiksel, elke stof en elk detail is bedacht vanuit het zadel. Door ruiters, voor ruiters.",
              },
              {
                title: "Eerlijke kwaliteit",
                description:
                  "Geen marketing-trucs. Wat je ziet is wat je krijgt — premium materialen, eerlijke prijs.",
              },
              {
                title: "Altijd in beweging",
                description:
                  "We luisteren, testen en verbeteren. The Signature is pas het begin.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.12, ease }}
                className="text-center sm:text-left"
              >
                <div className="w-8 h-[2px] bg-taupe mb-5 mx-auto sm:mx-0" />
                <h3 className="font-headline font-bold text-lg sm:text-xl text-black leading-snug">
                  {item.title}
                </h3>
                <p className="font-sans text-[15px] text-black/60 leading-relaxed mt-3">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT TEASER — full-width image with overlay ── */}
      <section ref={teaserParallaxRef} className="relative min-h-[70vh] sm:min-h-[60vh] overflow-hidden">
        <motion.div style={{ y: teaserImgY }} className="absolute inset-[-8%]">
          <Image
            src="/lifestyle-gallop-2.webp"
            alt="Ruiter in galop met EQUIVE rijbroek"
            fill
            sizes="100vw"
            quality={75}
            className="object-cover object-top"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 sm:bg-gradient-to-r sm:from-black/65 sm:via-black/30 sm:to-transparent" />

        <div className="absolute inset-0 flex items-end pb-10 sm:items-center sm:pb-0">
          <div className="max-w-[1880px] mx-auto w-full px-5 md:px-8">
            <FadeIn direction="up">
              <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.08] tracking-[-0.015em] max-w-md">
                Het resultaat?
                <br />
                The Signature.
              </h2>
              <p className="font-sans text-base text-white/60 mt-4 max-w-sm leading-relaxed">
                Full-seat grip. 4-way stretch. Van stal tot stad.
                De rijbroek waar het allemaal om draait.
              </p>
              <Link
                href="/product/the-signature"
                className="inline-flex items-center gap-2 mt-7 px-8 py-3.5 min-h-[48px] bg-white text-black font-sans text-sm font-medium rounded-full transition-all duration-300 hover:bg-taupe hover:text-white"
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
