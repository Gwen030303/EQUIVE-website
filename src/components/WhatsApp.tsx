"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "31612345678";

export default function WhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hoi%20EQUIVE!%20Ik%20heb%20een%20vraag%20over%20The%20Signature`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Chat via WhatsApp"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-24 md:bottom-8 right-4 md:right-6 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20BD5A] shadow-lg transition-colors duration-200"
        >
          <WhatsappLogo size={24} weight="fill" className="text-white" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
