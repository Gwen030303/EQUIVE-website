"use client";

// Analytics loader: GA4, gated by cookie consent.
// Build-time inlined env var (NEXT_PUBLIC_GA_ID) — must be set in Vercel.
import { useState, useEffect } from "react";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function AnalyticsLoader() {
  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    // Check if consent was already granted (e.g. returning visitor)
    if ((window as any).__cookieConsent === "accepted") {
      setConsentGranted(true);
      return;
    }

    function handleConsent() {
      setConsentGranted(true);
    }

    window.addEventListener("cookie-consent-granted", handleConsent);
    return () => {
      window.removeEventListener("cookie-consent-granted", handleConsent);
    };
  }, []);

  if (!consentGranted) return null;

  return (
    <>
      {/* Google Analytics (GA4) */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

    </>
  );
}
