"use client";

import { useState, useCallback } from "react";
import FadeIn from "./FadeIn";

export default function ReferralBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard?.writeText("https://equive.nl/ref/jouwcode");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-sand">
      <div className="w-full px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <p className="font-sans text-sm tracking-[0.3em] uppercase text-taupe">
              Deel De Liefde
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-headline text-3xl sm:text-5xl md:text-7xl uppercase leading-[0.85] text-black mt-4">
              Geef &euro;10, Krijg &euro;10
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="font-sans text-sm text-taupe-dark leading-relaxed mt-6">
              Deel jouw unieke link met een vriendin. Zij krijgt &euro;10 korting
              op haar eerste bestelling, en jij ontvangt &euro;10 tegoed zodra zij
              bestelt.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <div className="flex-1 w-full px-5 py-3 bg-white border border-taupe/20 rounded-full font-sans text-sm text-taupe-dark select-all text-left">
                equive.nl/ref/jouwcode
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="px-6 py-3 bg-black text-off-white font-sans text-sm tracking-[0.15em] uppercase rounded-full hover:bg-black/85 transition-all duration-300 active:scale-[0.98] whitespace-nowrap"
              >
                {copied ? "Gekopieerd!" : "Kopieer"}
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10 pt-8 border-t border-taupe/15">
              <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-taupe mb-2">
                Founding Riders
              </p>
              <p className="font-sans text-sm text-taupe-dark leading-relaxed max-w-md mx-auto">
                De eerste 50 kopers worden Founding Rider &mdash; met een genummerde editie
                en als eerste toegang tot nieuwe collecties.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
