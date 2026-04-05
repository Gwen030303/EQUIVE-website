"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "./FadeIn";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";

const timeline = [
  {
    nr: "01",
    label: "Het begin",
    headline: "Frustratie",
    text: "Niks paste. De ene broek zag er goed uit maar zat als karton. De andere zat lekker maar leek op sportkleding.",
  },
  {
    nr: "02",
    label: "De start",
    headline: "Slaapkamer",
    text: "Geen plan. Geen investeerders. Alleen een meisje met stofstalen en een missie.",
  },
  {
    nr: "03",
    label: "De les",
    headline: "50 stuks",
    text: "De eerste collectie. Niet perfect. Maar elke fout bracht me dichter bij wat ik zocht.",
  },
  {
    nr: "04",
    label: "Nu",
    headline: "Terug",
    text: "Scherper, sterker, en met een rijbroek waar ik \u00e9cht achter sta. Dit keer stop ik niet.",
  },
];

export default function Story() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} className="bg-[#FAFAFA] py-24 sm:py-32 lg:py-40">
      <div className="w-full px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">
          {/* Left — parallax image + quote */}
          <FadeIn direction="up">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <motion.div style={{ y: imageY }} className="absolute inset-[-10%]">
                  <Image
                    src="/story.webp"
                    alt="Ruiter met paard in de stal"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <blockquote className="font-sans text-xl sm:text-2xl text-[#3D3D3D] leading-[1.4] mt-8">
                &ldquo;Gewoon een meisje met een missie: die &eacute;ne
                perfecte rijbroek.&rdquo;
              </blockquote>
            </div>
          </FadeIn>

          {/* Right — timeline + stats */}
          <div>
            <FadeIn direction="up">
              <h2 className="font-headline font-bold text-4xl sm:text-5xl xl:text-6xl text-[#0F0F0F] leading-[0.92] tracking-[0.02em] uppercase mb-14 sm:mb-16">
                Geboren uit
                <br />
                frustratie.
              </h2>
            </FadeIn>

            <div className="flex flex-col gap-12 sm:gap-14">
              {timeline.map((step, i) => (
                <FadeIn key={step.nr} direction="up" delay={0.06 + i * 0.06}>
                  <div className="border-t-2 border-[#0F0F0F]/10 pt-6">
                    <span className="font-headline font-bold text-sm text-[#C8B69E] tracking-[0.1em] uppercase">
                      {step.nr} &mdash; {step.label}
                    </span>
                    <h3 className="font-headline font-bold text-3xl sm:text-4xl text-[#0F0F0F] mt-3 uppercase tracking-[0.02em]">
                      {step.headline}
                    </h3>
                    <p className="font-sans text-lg text-[#555555] leading-relaxed mt-3 max-w-md">
                      {step.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Stats */}
            <FadeIn direction="up" delay={0.4}>
              <div className="grid grid-cols-3 gap-6 sm:gap-8 mt-16 pt-10 border-t-2 border-[#0F0F0F]/10">
                {[
                  { value: "01", label: "Oprichtster" },
                  { value: "50", label: "Eerste stuks" },
                  { value: "\u20AC79,99", label: "Direct-to-consumer" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-headline font-bold text-3xl sm:text-4xl text-[#0F0F0F]">
                      {stat.value}
                    </p>
                    <p className="font-sans text-sm text-[#777777] uppercase tracking-[0.1em] mt-2">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* CTA */}
            <FadeIn direction="up" delay={0.5}>
              <div className="mt-10">
                <Link
                  href="/product/the-signature"
                  className="group inline-flex items-center gap-3 font-sub font-medium text-base text-[#0F0F0F] underline underline-offset-4 decoration-[#0F0F0F]/20 transition-all duration-500 hover:decoration-[#0F0F0F]/60 hover:gap-4"
                >
                  Bekijk The Signature
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
