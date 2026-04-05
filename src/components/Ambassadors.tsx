"use client";

import Image from "next/image";
import FadeIn from "./FadeIn";

const ambassadors = [
  {
    name: "Sophie van Dijk",
    discipline: "Dressuur",
    quote:
      "Eindelijk een rijbroek die zit zoals ik wil. Comfortabel, mooi en gewoon lekker praktisch.",
    image: "/stable-lifestyle.webp",
  },
  {
    name: "Emma de Vries",
    discipline: "Springen",
    quote:
      "Ik voel me zelfverzekerd in het zadel en daarbuiten. Precies wat ik zocht.",
    image: "/lifestyle-gallop.webp",
  },
  {
    name: "Lisa Bakker",
    discipline: "Eventing",
    quote:
      "Van training tot wedstrijd, deze rijbroek gaat overal mee. Je voelt de kwaliteit bij elke beweging.",
    image: "/horse-field.webp",
  },
];

export default function Ambassadors() {
  return (
    <section className="bg-[#F0ECE4] py-24 sm:py-32 lg:py-40">
      <div className="w-full px-6 sm:px-10 lg:px-20">
        <FadeIn direction="up">
          <h2 className="font-headline font-bold text-4xl sm:text-5xl xl:text-6xl text-[#0F0F0F] leading-[0.92] tracking-[0.02em] uppercase mb-14 sm:mb-18 lg:mb-20">
            Onze ruiters.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ambassadors.map((a, i) => (
            <FadeIn key={a.name} direction="up" delay={0.06 + i * 0.06}>
              <div className="bg-white h-full flex flex-col">
                <div className="relative aspect-[3/2] w-full overflow-hidden group">
                  <Image
                    src={a.image}
                    alt={a.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7 sm:p-9 flex flex-col flex-1">
                  <span className="font-sans text-sm text-[#C8B69E] uppercase tracking-[0.15em]">
                    {a.discipline}
                  </span>
                  <h3 className="font-headline font-bold text-2xl text-[#0F0F0F] mt-2 uppercase tracking-[0.02em]">
                    {a.name}
                  </h3>
                  <blockquote className="font-sans text-lg text-[#555555] leading-relaxed mt-4 flex-1">
                    &ldquo;{a.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
