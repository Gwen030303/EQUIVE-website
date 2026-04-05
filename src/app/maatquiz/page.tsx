"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Size = "XS" | "S" | "M" | "L" | "XL";

interface QuizStep {
  question: string;
  options: string[];
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const steps: QuizStep[] = [
  {
    question: "Wat is je kledingmaat?",
    options: ["XS (32-34)", "S (34-36)", "M (36-38)", "L (38-40)", "XL (40-42)"],
  },
  {
    question: "Hoe draag je het liefst je rijbroek?",
    options: [
      "Strak \u2014 ik hou van compressie",
      "Perfect aansluitend",
      "Comfortabel \u2014 iets losser",
    ],
  },
  {
    question: "Hoe lang zijn je benen?",
    options: ["Kort (< 75cm)", "Gemiddeld (75-82cm)", "Lang (> 82cm)"],
  },
];

const sizeOrder: Size[] = ["XS", "S", "M", "L", "XL"];

function computeRecommendedSize(answers: (number | null)[]): Size {
  // Base size from step 1
  const baseSizeIndex = answers[0] ?? 2; // default M
  let index = baseSizeIndex;

  // Adjust up if "comfortabel" chosen in step 2
  if (answers[1] === 2) {
    index = Math.min(index + 1, sizeOrder.length - 1);
  }

  return sizeOrder[index];
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MaatquizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([
    null,
    null,
    null,
  ]);
  const [showResult, setShowResult] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const totalSteps = steps.length;

  const handleSelect = useCallback(
    (optionIndex: number) => {
      const updated = [...answers];
      updated[currentStep] = optionIndex;
      setAnswers(updated);

      // Auto-advance after a short delay
      setTimeout(() => {
        if (currentStep < totalSteps - 1) {
          setDirection(1);
          setCurrentStep((prev) => prev + 1);
        } else {
          setDirection(1);
          setShowResult(true);
        }
      }, 400);
    },
    [answers, currentStep, totalSteps],
  );

  const handleBack = useCallback(() => {
    if (showResult) {
      setDirection(-1);
      setShowResult(false);
      return;
    }
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep, showResult]);

  const handleRestart = useCallback(() => {
    setDirection(-1);
    setShowResult(false);
    setAnswers([null, null, null]);
    setCurrentStep(0);
  }, []);

  const recommendedSize = computeRecommendedSize(answers);

  /* ---- Progress bar ---- */
  const progressFraction = showResult
    ? 1
    : (currentStep + (answers[currentStep] !== null ? 1 : 0)) / totalSteps;

  return (
    <>
      <div className="min-h-[100dvh] bg-black flex flex-col pt-20">
        {/* ---- Top bar ---- */}
        <header className="pt-6 px-5 md:px-8">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-sans text-sm text-taupe hover:text-taupe-light transition-colors min-h-[44px]"
            >
              <ArrowLeft size={16} weight="bold" />
              Terug naar Home
            </Link>
            <span className="font-sans text-sm text-white/60">
              {showResult
                ? "Resultaat"
                : `Stap ${currentStep + 1} / ${totalSteps}`}
            </span>
          </div>
        </header>

        {/* ---- Progress bar ---- */}
        <div className="mt-4 px-5 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-taupe rounded-full"
                initial={false}
                animate={{ width: `${progressFraction * 100}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>

        {/* ---- Main content ---- */}
        <div className="flex-1 flex items-center justify-center px-5 md:px-8 py-10 md:py-12">
          <div className="w-full max-w-xl">
            <AnimatePresence mode="wait" custom={direction}>
              {!showResult ? (
                /* ---------- Quiz step ---------- */
                <motion.div
                  key={`step-${currentStep}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="text-center"
                >
                  <h1 className="font-headline text-[1.5rem] sm:text-3xl md:text-4xl text-white font-bold mb-8 sm:mb-10 leading-[1.1] tracking-[-0.01em]">
                    {steps[currentStep].question}
                  </h1>

                  <div className="space-y-3">
                    {steps[currentStep].options.map((option, idx) => {
                      const isSelected = answers[currentStep] === idx;
                      return (
                        <button
                          key={option}
                          onClick={() => handleSelect(idx)}
                          className={`
                            w-full text-left rounded-xl px-5 py-4 sm:p-5 border transition-all duration-200
                            font-sans text-[15px] sm:text-base text-white/90
                            cursor-pointer min-h-[52px]
                            ${
                              isSelected
                                ? "bg-taupe/10 border-taupe/30"
                                : "bg-white/5 border-white/10 hover:border-taupe/40"
                            }
                          `}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {/* Back button (not on first step) */}
                  {currentStep > 0 && (
                    <button
                      onClick={handleBack}
                      className="mt-8 inline-flex items-center gap-2 font-sans text-[15px] sm:text-sm text-taupe hover:text-taupe-light transition-colors cursor-pointer min-h-[44px]"
                    >
                      <ArrowLeft size={14} weight="bold" />
                      Vorige vraag
                    </button>
                  )}
                </motion.div>
              ) : (
                /* ---------- Result screen ---------- */
                <motion.div
                  key="result"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="text-center"
                >
                  <p className="font-sans text-sm uppercase tracking-[0.2em] text-taupe mb-4">
                    Jouw resultaat
                  </p>

                  <h1 className="font-headline text-[1.75rem] sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-4 leading-[1.1] tracking-[-0.01em]">
                    Jouw aanbevolen maat: {recommendedSize}
                  </h1>

                  <p className="font-sans text-[15px] sm:text-sm text-white/60 mb-10">
                    95% van de ruiters met jouw profiel kiest maat{" "}
                    {recommendedSize}
                  </p>

                  <Link
                    href="/product/the-signature"
                    className="inline-block bg-taupe hover:bg-taupe-dark text-black font-sans text-[15px] sm:text-sm font-semibold px-8 py-4 rounded-full transition-colors duration-200 min-h-[48px]"
                  >
                    Bekijk The Signature in maat {recommendedSize}
                  </Link>

                  <p className="font-sans text-[15px] sm:text-sm text-white/60 mt-6">
                    Twijfel je? Onze 30-dagen retourgarantie heeft je gedekt.
                  </p>

                  {/* Back & restart */}
                  <div className="mt-10 flex items-center justify-center gap-6">
                    <button
                      onClick={handleBack}
                      className="inline-flex items-center gap-2 font-sans text-[15px] sm:text-sm text-taupe hover:text-taupe-light transition-colors cursor-pointer min-h-[44px]"
                    >
                      <ArrowLeft size={14} weight="bold" />
                      Vorige vraag
                    </button>
                    <button
                      onClick={handleRestart}
                      className="font-sans text-[15px] sm:text-sm text-white/60 hover:text-white/80 transition-colors cursor-pointer min-h-[44px]"
                    >
                      Opnieuw beginnen
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
