import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { SITE_URL } from "@/lib/seo";

/**
 * Generated from services.ts, so a twelfth service appears in the sitemap
 * automatically without anyone editing this file.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/quote", priority: 0.9, changeFrequency: "yearly" },
    { path: "/club", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/careers", priority: 0.5, changeFrequency: "monthly" },
  ];

  return [
    ...staticPages.map((page) => ({
      url: new URL(page.path, SITE_URL).toString(),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...services
      .filter((service) => !service.externalUrl && !service.quoteOnly)
      .map((service) => ({
        url: new URL(`/services/${service.slug}`, SITE_URL).toString(),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
