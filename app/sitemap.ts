import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/termin`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/it`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/agb`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
