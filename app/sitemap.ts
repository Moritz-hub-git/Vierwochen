import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { processes } from "@/lib/processes";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/prozesse",
    ...processes.map((p) => `/prozesse/${p.slug}`),
    "/unternehmen",
    "/sicherheit",
    "/prozess-check",
    "/impressum",
    "/datenschutz",
    "/agb",
  ].map((path) => ({
    url: `${SITE.url}${path || "/"}`,
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.7 : 1,
  }));
}
