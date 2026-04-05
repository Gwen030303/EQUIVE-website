"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "./FadeIn";
import { Horse } from "@phosphor-icons/react/dist/ssr/Horse";
import { ArrowsOut } from "@phosphor-icons/react/dist/ssr/ArrowsOut";
import { Drop } from "@phosphor-icons/react/dist/ssr/Drop";

const features = [
  {
    image: "/feat1.webp",
    icon: Horse,
    title: "Full-Seat Grip",
    stat: "100%",
    statLabel: "Zitvlak",
    description:
      "Ons gepatenteerde siliconen cirkelpatroon bedekt het volledige zitvlak voor onge\u00EBvenaarde stabiliteit \u2014 bij elke beweging in het zadel.",
  },
  {
    image: "/feat2.webp",
    icon: ArrowsOut,
    title: "4-Way Stretch",
    stat: "360\u00B0",
    statLabel: "Flexibiliteit",
    description:
      "Premium polyamide-elastaan mix beweegt met je lichaam, niet ertegen. Onbeperkte vrijheid in elke richting.",
  },
  {
    image: "/feat3.webp",
    icon: Drop,
    title: "Vochtregulering",
    stat: "2\u00D7",
    statLabel: "Sneller droog",
    description:
      "Geavanceerde vochtregulatie houdt je droog en comfortabel, zelfs tijdens de meest intensieve trainingen.",
  },
];

export default function LifestyleBand() {
  return (
    <section className="relative overflow-hidden">
      {/* ── Top: dark intro banner ── */}
      <div className="bg-[#0A0908] relative overflow-hidden py-20 md:py-28">
        <div className="glow-blob glow-blob-gold w-[600px] h-[600px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 animate-glow-pulse opacity-30" />
        <div className="relative z-10 text-center w-full px-6">
          <FadeIn>
            <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-taupe/70 mb-4">
              Waarom EQUIVE
            </p>
            <h2 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl text-off-white">
              Gebouwd voor
              <br />
              <span className="text-taupe">Prestatie</span>
            </h2>
            <p className="font-sub font-normal text-lg md:text-xl text-off-white/70 mt-5 max-w-lg mx-auto">
              Elk onderdeel is ontworpen met één doel: jou beter maken in het
              zadel.
            </p>
            <div className="w-12 h-px bg-taupe/25 mx-auto mt-8" />
          </FadeIn>
        </div>
      </div>

      {/* ── Feature cards ── */}
      <div className="bg-off-white relative overflow-hidden py-16 md:py-24">
        <div className="glow-blob glow-blob-warm w-[500px] h-[500px] left-1/2 -translate-x-1/2 top-0 animate-glow-pulse opacity-30" />

        <div className="relative z-10 w-full px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <FadeIn key={feat.title} delay={i * 0.12}>
                  <div className="glass-light card-glow rounded-xl overflow-hidden h-full flex flex-col">
                    {/* Image with hover glow */}
                    <div className="relative aspect-[4/3] img-hover-glow">
                      <Image
                        src={feat.image}
                        alt={feat.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      {/* Stat overlay on image */}
                      <div className="absolute bottom-4 right-4 glass-warm rounded-lg px-4 py-2 z-10">
                        <span
                          className="font-headline font-bold text-2xl text-off-white block leading-none"
                          style={{
                            textShadow:
                              "0 0 20px rgba(176,141,87,0.3)",
                          }}
                        >
                          {feat.stat}
                        </span>
                        <span className="font-sans text-[12px] tracking-[0.15em] uppercase text-off-white/60">
                          {feat.statLabel}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-7 md:p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-taupe/10 flex items-center justify-center">
                          <Icon
                            size={20}
                            weight="regular"
                            className="text-taupe"
                          />
                        </div>
                        <h3 className="font-sans font-semibold text-lg text-black">
                          {feat.title}
                        </h3>
                      </div>
                      <p className="font-sans text-base text-black/70 leading-relaxed flex-1">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* CTA below cards */}
          <FadeIn delay={0.4}>
            <div className="text-center mt-14">
              <Link
                href="/kwaliteit"
                className="group relative inline-flex items-center px-10 py-4 border border-black rounded-lg text-black font-sans text-[13px] tracking-[0.18em] uppercase overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 transition-colors duration-700 group-hover:text-off-white group-active:text-off-white">
                  Ontdek Onze Technologie
                </span>
                <span className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
