"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FadeIn from "./FadeIn";

const TARGET_DATE = new Date("2026-06-01T00:00:00").getTime();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getTimeLeft() {
  const now = Date.now();
  const diff = Math.max(TARGET_DATE - now, 0);
  return {
    dagen: Math.floor(diff / (1000 * 60 * 60 * 24)),
    uren: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minuten: Math.floor((diff / (1000 * 60)) % 60),
    seconden: Math.floor((diff / 1000) % 60),
  };
}

export default function CollectionDrop() {
  const [timeLeft, setTimeLeft] = useState({
    dagen: 0,
    uren: 0,
    minuten: 0,
    seconden: 0,
  });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => setSubmitted(false), 5000);
    return () => clearTimeout(timer);
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Vul een geldig e-mailadres in.");
      return;
    }
    setEmailError("");
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "collection-drop" }),
      });
    } catch {
      // Sla lokaal op als fallback
    }
    setSubmitted(true);
    setEmail("");
  };

  const units = [
    { label: "Dagen", value: timeLeft.dagen },
    { label: "Uren", value: timeLeft.uren },
    { label: "Min", value: timeLeft.minuten },
    { label: "Sec", value: timeLeft.seconden },
  ];

  return (
    <section className="relative bg-sand py-20 md:py-28 overflow-hidden">
      <div className="glow-blob glow-blob-warm w-[500px] h-[500px] -right-32 -top-32 opacity-30" />

      <div className="relative z-10 w-full px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-0 items-stretch">
          {/* Left: image + overlay text */}
          <FadeIn>
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] rounded-2xl lg:rounded-r-none overflow-hidden">
              <Image
                src="/horse-field.webp"
                alt="Paard in het veld bij zonsondergang"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-taupe mb-2">
                  Binnenkort
                </p>
                <h2 className="font-headline font-bold text-4xl md:text-5xl text-off-white leading-[0.95]">
                  Collectie 02
                </h2>
                <p className="font-sub font-normal text-base text-taupe-light mt-2">
                  Komt eraan
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right: countdown + signup */}
          <FadeIn delay={0.15}>
            <div className="relative bg-black rounded-2xl lg:rounded-l-none p-6 sm:p-8 md:p-12 flex flex-col justify-center min-h-[420px]">
              <div className="glow-blob glow-blob-gold w-[300px] h-[300px] -right-20 -top-20 opacity-20" />

              <div className="relative z-10">
                {/* Countdown */}
                <div className="flex gap-6 md:gap-10 mb-10">
                  {units.map((unit) => (
                    <div key={unit.label} className="flex flex-col items-center">
                      <span className="font-headline font-light text-4xl md:text-5xl text-off-white leading-none">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                      <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-off-white/50 mt-2">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="w-10 h-px bg-taupe/25 mb-8" />

                {/* Email signup */}
                <p className="font-sans text-sm text-off-white/60 tracking-wide mb-5">
                  Schrijf je in voor early access
                </p>

                {submitted ? (
                  <div>
                    <p className="font-sub font-normal text-xl text-taupe-light">
                      Je staat op de lijst.
                    </p>
                    <p className="font-sans text-sm text-off-white/55 mt-2">
                      We houden je op de hoogte.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <label htmlFor="collection-drop-email" className="sr-only">
                        E-mailadres
                      </label>
                      <input
                        id="collection-drop-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError("");
                        }}
                        placeholder="Je e-mailadres"
                        required
                        className={`flex-1 px-5 py-3.5 bg-off-white/[0.06] border rounded-lg text-off-white placeholder:text-off-white/40 font-sans text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-taupe focus-visible:outline-offset-2 transition-all duration-500 ${
                          emailError
                            ? "border-[#C4756E]"
                            : "border-off-white/[0.08] focus:border-taupe/30"
                        }`}
                      />
                      <button
                        type="submit"
                        className="group relative inline-flex items-center justify-center px-7 py-3.5 bg-taupe text-black font-sans text-[13px] tracking-[0.15em] uppercase overflow-hidden rounded-lg transition-all duration-500 hover:bg-taupe-light hover:scale-[1.03] active:scale-[0.97] flex-shrink-0"
                      >
                        Aanmelden
                      </button>
                    </div>
                    {emailError && (
                      <p className="font-sans text-sm text-[#C4756E] mt-2">
                        {emailError}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
