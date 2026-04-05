"use client";

import { useEffect, useState } from "react";
import FadeIn from "./FadeIn";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr/InstagramLogo";

interface InstaPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
}

const HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "equiveeequestrian";

// Fallback afbeeldingen voor als de API nog niet is gekoppeld
const fallbackPosts = [
  { id: "1", media_url: "/insta5.webp", permalink: `https://instagram.com/${HANDLE}`, caption: "" },
  { id: "2", media_url: "/insta2.webp", permalink: `https://instagram.com/${HANDLE}`, caption: "" },
  { id: "3", media_url: "/insta3.webp", permalink: `https://instagram.com/${HANDLE}`, caption: "" },
  { id: "4", media_url: "/insta4.webp", permalink: `https://instagram.com/${HANDLE}`, caption: "" },
  { id: "5", media_url: "/insta1.webp", permalink: `https://instagram.com/${HANDLE}`, caption: "" },
  { id: "6", media_url: "/insta6.webp", permalink: `https://instagram.com/${HANDLE}`, caption: "" },
];

export default function Instagram() {
  const [posts, setPosts] = useState<InstaPost[]>(fallbackPosts);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/instagram");
        if (!res.ok) return;
        const data = await res.json();
        if (data.length > 0) setPosts(data);
      } catch (err) {
        console.error("Instagram feed kon niet worden geladen:", err);
      }
    }
    fetchPosts();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-warm-dark">
      <div className="w-full px-6 md:px-12">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="font-sans text-sm tracking-[0.3em] uppercase text-taupe mb-3">
                Community
              </p>
              <h2 className="font-headline font-semibold text-3xl sm:text-5xl md:text-7xl uppercase leading-[0.85] text-off-white tracking-[0.02em]">
                Volg de Rit
              </h2>
              <p className="font-sub font-normal text-sm text-taupe mt-2">
                Een kijkje in het leven met EQUIVE.
              </p>
            </div>
            <a
              href={`https://instagram.com/${HANDLE}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 font-sans text-sm tracking-[0.15em] uppercase text-taupe hover:text-off-white transition-colors"
            >
              <InstagramLogo size={18} weight="regular" />
              @{HANDLE}
            </a>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {posts.slice(0, 6).map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.08}>
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group relative aspect-square overflow-hidden block"
              >
                <img
                  src={post.media_url}
                  alt={post.caption?.slice(0, 80) || `EQUIVE post ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <InstagramLogo
                    size={18}
                    weight="fill"
                    className="text-white/80"
                  />
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
