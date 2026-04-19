import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/shopify";

const baseUrl = "https://www.equive.shop";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/ons-verhaal`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/kwaliteit`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/grip-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/duurzaamheid`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/maatquiz`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/privacybeleid`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/algemene-voorwaarden`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const products = await getProducts(250);
  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/product/${p.handle}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticEntries, ...productEntries];
}
