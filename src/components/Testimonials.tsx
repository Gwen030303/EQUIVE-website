"use client";

import FadeIn from "./FadeIn";

const testimonials = [
  {
    name: "Fleur Hoekstra",
    location: "Laren \u00B7 Dressuur",
    quote:
      "Eindelijk een rijbroek waar ik me ook na de les niet voor hoef om te kleden. De stof voelt ongelooflijk.",
  },
  {
    name: "Isabelle de Graaf",
    location: "Wassenaar \u00B7 Springen",
    quote:
      "De grip is onwerkelijk goed. De enige legging die ik vertrouw op wedstrijd.",
  },
  {
    name: "Margot Timmermans",
    location: "Blaricum \u00B7 Eventing",
    quote:
      "Na jaren zoeken voelt dit als thuiskomen. De pasvorm, de stof, de details \u2014 alles klopt.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-off-white py-20 md:py-28 relative overflow-hidden">
      <div className="glow-blob glow-blob-gold w-[400px] h-[400px] right-0 top-1/2 -translate-y-1/2 animate-glow-pulse opacity-30" />
      <div className="w-full px-6">
        {/* ── Section header ── */}
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-14 md:mb-18">
            <h2 className="font-headline font-bold text-3xl md:text-4xl text-black">
              Wat Ruiters Zeggen
            </h2>
            <p className="font-sub font-normal text-base md:text-lg text-taupe-dark mt-3">
              Eerlijke ervaringen van ruiters door heel Nederland
            </p>
            <div className="w-12 h-px bg-taupe/30 mt-6" />
          </div>
        </FadeIn>

        {/* ── Testimonial cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div
                className="glass-light rounded-xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)]
                  card-glow transition-all duration-500"
              >
                {/* Quote */}
                <blockquote className="font-sans text-base text-black/85 leading-relaxed mt-4">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Divider */}
                <div className="w-full h-px bg-sand mt-6 mb-4" />

                {/* Author row */}
                <div className="flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 rounded-full bg-taupe/15 border border-taupe/20 animate-border-glow flex items-center justify-center flex-shrink-0">
                    <span className="font-headline text-lg text-taupe">
                      {t.name.charAt(0)}
                    </span>
                  </div>

                  {/* Name + location */}
                  <div>
                    <p className="font-sans text-sm font-semibold text-black leading-tight">
                      {t.name}
                    </p>
                    <p className="font-sans text-sm text-taupe-dark mt-0.5">
                      {t.location}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
