"use client";

import FadeIn from "./FadeIn";

const values = [
  {
    nr: "01",
    title: "Pasvorm boven alles",
    text: "Niet hoe het eruitziet op een foto, maar hoe het voelt na drie uur in het zadel. Getest op het paard, niet op een mannequin.",
  },
  {
    nr: "02",
    title: "Eerlijke prijs",
    text: "Directe verkoop zonder tussenhandelaren. Betere materialen, eerlijke prijs. Zo simpel is het.",
  },
  {
    nr: "03",
    title: "Van de stal naar overal",
    text: "Van het rijden naar de sportschool naar de stad. E\u00e9n rijbroek, overal thuis.",
  },
  {
    nr: "04",
    title: "Eerlijk en persoonlijk",
    text: "Gebouwd door een ruiter, voor ruiters. EQUIVE deelt alles \u2014 haar proces, haar fouten, en haar groei.",
  },
];

export default function BrandValues() {
  return (
    <section className="bg-[#0F0F0F] py-24 sm:py-32 lg:py-40">
      <div className="w-full px-6 sm:px-10 lg:px-20">
        <FadeIn direction="up">
          <h2 className="font-headline font-bold text-4xl sm:text-5xl xl:text-6xl text-white leading-[0.92] tracking-[0.02em] uppercase mb-16 sm:mb-20">
            Waar we
            <br />
            voor staan.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {values.map((val, i) => (
            <FadeIn key={val.nr} direction="up" delay={0.06 + i * 0.06}>
              <div className="border border-white/10 p-8 sm:p-10 lg:p-12 h-full">
                <span className="font-headline font-bold text-lg text-[#C8B69E] tracking-[0.1em] uppercase">
                  {val.nr}
                </span>
                <h3 className="font-headline font-bold text-2xl sm:text-3xl text-white mt-4 uppercase tracking-[0.02em]">
                  {val.title}
                </h3>
                <p className="font-sans text-lg text-[#B0B0B0] leading-relaxed mt-4">
                  {val.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
