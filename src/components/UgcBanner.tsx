"use client";

import FadeIn from "./FadeIn";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr/InstagramLogo";

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
  "https://instagram.com/equiveeequestrian";

export default function UgcBanner() {
  return (
    <section className="py-16 md:py-20 bg-sand">
      <div className="w-full px-6 md:px-12 text-center">
        <FadeIn>
          <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-taupe mb-3">
            Community
          </p>
          <h2 className="font-headline font-bold text-3xl md:text-4xl text-black leading-[1.1]">
            #RijdMetEQUIVE
          </h2>
          <p className="font-sub font-normal text-base md:text-lg text-taupe-dark mt-3 max-w-lg mx-auto">
            Deel jouw rit, tag ons en word uitgelicht op onze pagina.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["@equiveeequestrian", "#RijdMetEQUIVE", "#EQUIVERiders"].map(
              (tag) => (
                <span
                  key={tag}
                  className="font-sans text-sm text-black bg-off-white px-4 py-2 rounded-full border border-taupe/10"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 font-sans text-sm tracking-[0.15em] uppercase text-taupe hover:text-black transition-colors"
          >
            <InstagramLogo size={18} weight="regular" />
            Volg ons op Instagram
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
