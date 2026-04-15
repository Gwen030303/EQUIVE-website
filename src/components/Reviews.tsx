"use client";

import FadeIn from "./FadeIn";
import { Horse } from "@phosphor-icons/react/dist/ssr/Horse";

/**
 * Reviews component — klaar om te koppelen aan Kiyoh, Trustpilot, of Judge.me.
 *
 * Vervang de lege `reviews` array met een API-call naar je reviews platform:
 *   - Kiyoh: https://www.kiyoh.com/api/
 *   - Trustpilot: https://developers.trustpilot.com/
 *   - Judge.me: https://judge.me/api/
 */

type Review = {
  name: string;
  location: string;
  discipline: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  size: string;
  verified: boolean;
};

// TODO: Vervang met echte reviews via Kiyoh/Trustpilot/Judge.me API
const reviews: Review[] = [];

export default function Reviews() {
  if (reviews.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-off-white">
        <div className="w-full px-6 md:px-12">
          <FadeIn>
            <div className="text-center">
              <Horse
                size={48}
                weight="thin"
                className="text-taupe mx-auto mb-4"
              />
              <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-taupe mb-2">
                Reviews
              </p>
              <h2 className="font-headline font-bold text-3xl md:text-4xl text-black">
                Wat Ruiters Zeggen
              </h2>
              <p className="font-sans text-base text-taupe-dark mt-3 max-w-md mx-auto">
                Binnenkort verschijnen hier echte reviews van ruiters.
              </p>
            </div>
          </FadeIn>
          {/* TODO: Vervang bovenstaande met Kiyoh/Trustpilot widget */}
          {/* <div id="kiyoh-widget" className="mt-12" /> */}
        </div>
      </section>
    );
  }

  return null;
}
