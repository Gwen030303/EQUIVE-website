"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus } from "@phosphor-icons/react/dist/ssr/Plus";
import { Minus } from "@phosphor-icons/react/dist/ssr/Minus";
import FadeIn from "./FadeIn";

const faqItems = [
  {
    question: "Hoe valt The Signature?",
    answer:
      "The Signature valt normaal. Twijfel je tussen twee maten? Neem dan de grotere maat. Bekijk onze maatgids voor exacte afmetingen.",
    number: "01",
  },
  {
    question: "Voor welke discipline is de rijbroek geschikt?",
    answer:
      "The Signature is ontworpen voor alle disciplines \u2014 dressuur, springen, eventing en recreatief rijden. De full-seat grip werkt in elk zadel.",
    number: "02",
  },
  {
    question: "Kan ik de rijbroek ook buiten het zadel dragen?",
    answer:
      "Absoluut. Dat is precies waar EQUIVE voor staat. Van de stal naar de sportschool naar de stad \u2014 The Signature is ontworpen om er overal goed uit te zien.",
    number: "03",
  },
  {
    question: "Hoe lang gaat een EQUIVE rijbroek mee?",
    answer:
      "Bij normaal gebruik en juiste verzorging gaat The Signature maanden mee. De siliconen grip en stof zijn getest op honderden uren in het zadel.",
    number: "04",
  },
  {
    question: "Wat als ik niet tevreden ben?",
    answer:
      "Geen probleem. Je hebt 30 dagen om te retourneren, gratis via PostNL. We willen dat je 100% blij bent met je aankoop.",
    number: "05",
  },
  {
    question: "Verzenden jullie ook naar Belgi\u00EB?",
    answer:
      "Ja! We verzenden naar Nederland en Belgi\u00EB. Verzending naar Nederland is gratis, voor Belgi\u00EB betaal je een klein bedrag.",
    number: "06",
  },
];

function FAQItem({
  question,
  answer,
  number,
  index,
}: {
  question: string;
  answer: string;
  number: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <FadeIn delay={index * 0.08}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`w-full text-left rounded-xl transition-all duration-300 p-5 sm:p-6 group min-h-[56px] ${
          open
            ? "bg-cream"
            : "bg-sand hover:bg-cream/60"
        }`}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <motion.span
            className={`font-headline text-2xl sm:text-3xl transition-colors duration-300 flex-shrink-0 ${
              open ? "text-taupe" : "text-taupe/30"
            }`}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {number}
          </motion.span>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-sans text-sm sm:text-base font-medium text-black transition-colors duration-300">
                {question}
              </h3>
              <div
                className={`w-10 h-10 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  open ? "bg-taupe/15" : "bg-white"
                }`}
              >
                {open ? (
                  <Minus size={16} className="text-taupe-dark" />
                ) : (
                  <Plus size={16} className="text-taupe-dark" />
                )}
              </div>
            </div>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="font-sans text-sm text-black/60 leading-relaxed mt-3 max-w-[55ch]">
                    {answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </button>
    </FadeIn>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="pt-32 md:pt-40 pb-16 md:pb-24 bg-white">
      <div className="max-w-[1880px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Heading — left */}
          <FadeIn className="md:col-span-4 md:sticky md:top-24 md:self-start">
            <p className="font-sans text-[12px] tracking-[0.15em] uppercase text-taupe-dark mb-4">
              Veelgestelde Vragen
            </p>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-black leading-[1.1] tracking-[-0.01em] mb-4">
              Nog
              <br />
              vragen?
            </h2>
            <p className="font-sans text-sm text-black/50 max-w-[28ch]">
              Alles wat je wilt weten over The Signature.
            </p>
          </FadeIn>

          {/* Questions — right */}
          <div className="md:col-span-8">
            <div className="flex flex-col gap-3">
              {faqItems.map((item, i) => (
                <FAQItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                  number={item.number}
                  index={i}
                />
              ))}
            </div>

            <FadeIn delay={0.5}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-sans text-[13px] font-medium tracking-[0.06em] uppercase text-taupe-dark hover:text-black transition-colors mt-6 min-h-[48px] sm:min-h-0"
              >
                Nog vragen? Neem contact met ons op &rarr;
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
