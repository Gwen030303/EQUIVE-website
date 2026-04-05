"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";
import { Star } from "@phosphor-icons/react/dist/ssr/Star";
import { Horse } from "@phosphor-icons/react/dist/ssr/Horse";

/**
 * Reviews component — klaar om te koppelen aan Kiyoh, Trustpilot, of Judge.me.
 *
 * Vervang de hardcoded `reviews` array met een API-call naar je reviews platform:
 *   - Kiyoh: https://www.kiyoh.com/api/
 *   - Trustpilot: https://developers.trustpilot.com/
 *   - Judge.me: https://judge.me/api/
 */

const reviews = [
  {
    name: "Fleur H.",
    location: "Laren",
    discipline: "Dressuur",
    rating: 5,
    date: "Maart 2026",
    title: "Eindelijk de perfecte rijbroek",
    body: "De stof voelt ongelooflijk en de grip is werkelijk goed. Na 3 trainingen per week, ziet hij er nog als nieuw uit.",
    size: "M",
    verified: true,
  },
  {
    name: "Isabelle G.",
    location: "Wassenaar",
    discipline: "Springen",
    rating: 5,
    date: "Maart 2026",
    title: "Beste grip die ik ooit heb gehad",
    body: "De enige rijbroek die ik vertrouw op wedstrijd. De full-seat grip is werkelijk een gamechanger.",
    size: "S",
    verified: true,
  },
  {
    name: "Margot T.",
    location: "Blaricum",
    discipline: "Eventing",
    rating: 5,
    date: "Februari 2026",
    title: "Voelt als thuiskomen",
    body: "Na jaren zoeken eindelijk een legging waar alles klopt. De pasvorm, de stof, de details.",
    size: "M",
    verified: true,
  },
  {
    name: "Sophie V.",
    location: "Hilversum",
    discipline: "Recreatief",
    rating: 4,
    date: "Februari 2026",
    title: "Prachtige kwaliteit",
    body: "Heel fijne stof en mooi afgewerkt. Ik draag hem ook buiten de manege. Enige minpunt: had graag meer kleuren gezien.",
    size: "L",
    verified: true,
  },
];

const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          weight="fill"
          className={i < rating ? "text-taupe" : "text-sand"}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-off-white">
      <div className="w-full px-6 md:px-12">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-taupe mb-2">
                Reviews
              </p>
              <h2 className="font-headline font-bold text-3xl md:text-4xl text-black">
                Wat Ruiters Zeggen
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} weight="fill" className="text-taupe" />
                ))}
              </div>
              <span className="font-headline text-2xl text-black">{avgRating}</span>
              <span className="font-sans text-sm text-taupe-dark">
                op basis van {reviews.length} reviews
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((review, i) => (
            <FadeIn key={review.name} delay={i * 0.08}>
              <div className="glass-light rounded-xl p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <StarRating rating={review.rating} />
                  <span className="font-sans text-sm text-taupe-dark">
                    {review.date}
                  </span>
                </div>

                <h3 className="font-sans text-base font-semibold text-black mb-2">
                  {review.title}
                </h3>
                <p className="font-sans text-base text-black/75 leading-relaxed flex-1">
                  {review.body}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-sand">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-taupe/10 flex items-center justify-center">
                      <span className="font-headline text-sm text-taupe">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans text-sm font-semibold text-black leading-tight">
                        {review.name}
                      </p>
                      <p className="font-sans text-sm text-taupe-dark">
                        {review.location} &middot; {review.discipline} &middot; Maat {review.size}
                      </p>
                    </div>
                  </div>
                  {review.verified && (
                    <span className="font-sans text-[11px] text-taupe bg-taupe/10 px-2 py-0.5 rounded-full">
                      Geverifieerd
                    </span>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Show more / Kiyoh link placeholder */}
        {reviews.length > 3 && !showAll && (
          <FadeIn delay={0.3}>
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(true)}
                className="font-sans text-sm text-taupe underline underline-offset-2 hover:text-black transition-colors"
              >
                Bekijk alle {reviews.length} reviews
              </button>
            </div>
          </FadeIn>
        )}

        {/* TODO: Vervang bovenstaande met Kiyoh/Trustpilot widget */}
        {/* <div id="kiyoh-widget" className="mt-12" /> */}
      </div>
    </section>
  );
}
