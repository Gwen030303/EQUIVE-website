import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vind Jouw Maat | EQUIVE",
  description: "Doe de EQUIVE maatquiz en ontdek welke maat rijbroek perfect bij jou past. In 3 stappen naar jouw ideale maat.",
  alternates: { canonical: "/maatquiz" },
  openGraph: {
    title: "Vind Jouw Maat | EQUIVE",
    description: "Doe de EQUIVE maatquiz en ontdek welke maat rijbroek perfect bij jou past. In 3 stappen naar jouw ideale maat.",
    url: "https://www.equive.nl/maatquiz",
    siteName: "EQUIVE",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EQUIVE - Premium Rijbroeken" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vind Jouw Maat | EQUIVE",
    description: "Doe de EQUIVE maatquiz en ontdek welke maat rijbroek perfect bij jou past. In 3 stappen naar jouw ideale maat.",
    images: ["/og-image.jpg"],
  },
};

export default function MaatquizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
