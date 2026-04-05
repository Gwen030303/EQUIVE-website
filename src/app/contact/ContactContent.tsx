"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import {
  Envelope,
  InstagramLogo,
  Clock,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";

const INSTAGRAM_URL = "https://instagram.com/equiveeequestrian";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => setSubmitted(false), 6000);
    return () => clearTimeout(timer);
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    if (!EMAIL_REGEX.test(formData.email)) {
      setEmailError("Vul een geldig e-mailadres in.");
      return;
    }
    setEmailError("");
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "contact" }),
      });
    } catch {
      /* fallback */
    }
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const inputClass =
    "w-full px-5 py-4 min-h-[52px] bg-white border border-black/10 rounded-lg text-black placeholder:text-black/30 font-sans text-[15px] focus:outline-none focus:border-taupe transition-colors duration-300";

  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8">
          <FadeIn>
            <p className="font-sans text-[13px] tracking-[0.12em] uppercase text-taupe-dark mb-5">
              Contact
            </p>
            <h1 className="font-headline font-bold text-4xl sm:text-5xl lg:text-6xl text-black leading-[1.1] tracking-[-0.01em]">
              Neem contact op.
            </h1>
            <p className="font-sans text-base sm:text-lg text-black/70 mt-5 max-w-lg leading-relaxed">
              Heb je een vraag over je bestelling, onze producten of iets anders?
              We staan voor je klaar.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="h-[3px] bg-black/[0.06]" />

      {/* Contact grid */}
      <section className="bg-off-white py-14 sm:py-28 lg:py-36">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
            {/* Left — form */}
            <FadeIn direction="up">
              <div>
                <h2 className="font-headline font-bold text-2xl sm:text-3xl text-black leading-[1.1] mb-8">
                  Stuur een bericht
                </h2>

                {submitted ? (
                  <div className="py-16 text-center">
                    <div className="w-12 h-[1.5px] bg-taupe mx-auto mb-6" />
                    <p className="font-sub font-medium text-2xl text-black">
                      Bericht verzonden.
                    </p>
                    <p className="font-sans text-base text-black/60 mt-3">
                      We reageren binnen 24 uur. Meestal sneller.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="block font-sans text-sm font-medium text-black mb-2">
                          Naam
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Je naam"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block font-sans text-sm font-medium text-black mb-2">
                          E-mail *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setEmailError(""); }}
                          placeholder="je@email.nl"
                          required
                          className={`${inputClass} ${emailError ? "!border-red-400" : ""}`}
                        />
                        {emailError && <p className="font-sans text-sm text-red-400 mt-2">{emailError}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block font-sans text-sm font-medium text-black mb-2">
                        Onderwerp
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Waar gaat het over?"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block font-sans text-sm font-medium text-black mb-2">
                        Bericht *
                      </label>
                      <textarea
                        id="contact-message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Vertel ons waar we je mee kunnen helpen..."
                        required
                        rows={6}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[48px] bg-black text-white font-sans text-sm font-medium rounded-full transition-all duration-300 hover:bg-taupe active:scale-[0.98] w-full sm:w-auto sm:self-start"
                    >
                      Verstuur bericht
                      <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Right — info */}
            <FadeIn direction="up" delay={0.1}>
              <div className="flex flex-col gap-8 lg:gap-12 lg:pt-12">
                {[
                  { icon: Envelope, label: "E-mail", value: "info@equive.nl", href: "mailto:info@equive.nl", sub: null },
                  { icon: InstagramLogo, label: "Instagram", value: "@equiveeequestrian", href: INSTAGRAM_URL, sub: "DM ons gerust — we reageren daar ook." },
                  { icon: MapPin, label: "Locatie", value: "Amsterdam, Nederland", href: null, sub: "Ontworpen in Amsterdam, gemaakt voor de rijhal." },
                ].map(({ icon: Icon, label, value, href, sub }, i) => (
                  <div key={label} className="flex items-start gap-4">
                    <motion.div
                      className="flex items-center justify-center w-11 h-11 bg-cream rounded-lg flex-shrink-0"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Icon size={20} weight="regular" className="text-taupe-dark" />
                    </motion.div>
                    <div>
                      <p className="font-sans text-[13px] font-medium text-black/50 uppercase tracking-[0.1em] mb-1">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("mailto") ? undefined : "_blank"}
                          rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                          className="font-sans text-[17px] text-black hover:text-taupe-dark transition-colors duration-300 inline-flex items-center min-h-[48px] sm:min-h-[44px]"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-sans text-[17px] text-black">{value}</p>
                      )}
                      {sub && <p className="font-sans text-sm text-black/50 mt-1">{sub}</p>}
                    </div>
                  </div>
                ))}

                {/* Response card */}
                <div className="bg-cream rounded-xl p-7 sm:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock size={18} weight="regular" className="text-taupe-dark" />
                    <p className="font-sans text-[13px] font-medium text-black/50 uppercase tracking-[0.1em]">
                      Reactietijd
                    </p>
                  </div>
                  <p className="font-headline font-bold text-xl text-black">
                    Binnen 24 uur
                  </p>
                  <p className="font-sans text-[15px] text-black/65 mt-2 leading-relaxed">
                    We reageren op werkdagen meestal binnen een paar uur.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="h-[3px] bg-black/[0.06]" />

      {/* FAQ */}
      <section className="bg-cream py-14 sm:py-28 lg:py-36">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8">
          <FadeIn direction="up">
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-black leading-[1.1] tracking-[-0.015em] mb-8 sm:mb-14">
              Veelgestelde vragen
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {[
              { q: "Hoe lang duurt de verzending?", a: "2\u20133 werkdagen binnen Nederland. Altijd gratis." },
              { q: "Kan ik retourneren?", a: "Ja, binnen 30 dagen. Gratis via PostNL. Geen vragen." },
              { q: "Welke maat moet ik kiezen?", a: "Gebruik onze maatquiz \u2014 in 30 seconden weet je het." },
              { q: "Wanneer wordt mijn bestelling verzonden?", a: "Bestellingen voor 16:00 worden dezelfde werkdag verzonden." },
              { q: "Waar worden de broeken gemaakt?", a: "Ontworpen in Amsterdam. Geproduceerd in Europa." },
              { q: "Kan ik mijn bestelling wijzigen?", a: "Mail ons op info@equive.nl zo snel mogelijk na je bestelling." },
            ].map((item, i) => (
              <motion.div
                key={item.q}
                className="bg-white rounded-xl p-6 sm:p-7 h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <h3 className="font-headline font-bold text-[17px] text-black mb-2">
                  {item.q}
                </h3>
                <p className="font-sans text-[15px] text-black/65 leading-relaxed">
                  {item.a}
                </p>
              </motion.div>
            ))}
          </div>

          <FadeIn direction="up" delay={0.3}>
            <div className="mt-10">
              <a
                href="/faq"
                className="inline-flex items-center gap-2 font-sans text-sm font-medium text-black/60 hover:text-black transition-colors duration-300 min-h-[48px] sm:min-h-0"
              >
                Bekijk alle veelgestelde vragen
                <ArrowRight size={14} weight="bold" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
