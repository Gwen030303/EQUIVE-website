"use client";

import dynamic from "next/dynamic";

const WhatsApp = dynamic(() => import("@/components/WhatsApp"), {
  ssr: false,
});
const CookieConsent = dynamic(() => import("@/components/CookieConsent"), {
  ssr: false,
});
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), {
  ssr: false,
});
const ExitIntent = dynamic(() => import("@/components/ExitIntent"), {
  ssr: false,
});
const AnalyticsLoader = dynamic(() => import("@/components/AnalyticsLoader"), {
  ssr: false,
});
const WaitlistModal = dynamic(() => import("@/components/WaitlistModal"), {
  ssr: false,
});
const CartDrawer = dynamic(() => import("@/components/CartDrawer"), {
  ssr: false,
});

export default function ClientOverlays() {
  return (
    <>
      <WhatsApp />
      <CookieConsent />
      <ScrollToTop />
      <ExitIntent />
      <AnalyticsLoader />
      <WaitlistModal />
      <CartDrawer />
    </>
  );
}
