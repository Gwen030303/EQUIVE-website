"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function TextScramble({
  text,
  className = "",
  delay = 0,
}: TextScrambleProps) {
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(text.replace(/[^ ]/g, "\u00A0"));
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(text);
      return;
    }

    const totalDuration = 1500; // 1.5 s total
    const perChar = totalDuration / text.length;
    const delayMs = delay * 1000;

    let cancelled = false;

    const timeout = window.setTimeout(() => {
      const step = (timestamp: number) => {
        if (cancelled) return;
        if (startRef.current === null) startRef.current = timestamp;

        const elapsed = timestamp - startRef.current;
        const resolved = Math.min(
          Math.floor(elapsed / perChar),
          text.length,
        );

        let next = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            next += " ";
          } else if (i < resolved) {
            next += text[i];
          } else {
            next += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setDisplay(next);

        if (resolved < text.length) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          setDisplay(text);
        }
      };

      rafRef.current = requestAnimationFrame(step);
    }, delayMs);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, delay, prefersReducedMotion]);

  return <span className={className}>{display}</span>;
}
