import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EQUIVE",
    short_name: "EQUIVE",
    description:
      "Premium rijbroeken en ruiterkleding ontworpen in Amsterdam. Prestatie in het zadel, stijl daarbuiten.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F5",
    theme_color: "#0F0F0F",
    icons: [
      { src: "/logo-icon.webp", sizes: "192x192", type: "image/webp" },
      { src: "/logo-icon.webp", sizes: "512x512", type: "image/webp" },
    ],
  };
}
