"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxQuote() {
  const ref = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [40, -40]);
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-10%", "10%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    reduceMotion ? [1, 1, 1, 1, 1] : [0, 1, 1, 1, 0]
  );

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 bg-warm-dark overflow-hidden"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-[-20%]">
        <Image
          src="/horse-field.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
      </motion.div>
      <div className="absolute inset-0 bg-warm-dark/60" />

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 w-full px-6 md:px-12"
      >
        <div className="text-center">
          <h2 className="font-headline text-5xl sm:text-7xl md:text-[8rem] uppercase text-off-white leading-[0.85] tracking-tight">
            Luxe die je kunt voelen
          </h2>

          <div className="w-12 h-px bg-taupe/30 mx-auto mt-8 mb-6" />

          <p className="font-sub font-normal text-lg text-taupe">
            In een prijs die je kunt betalen.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
