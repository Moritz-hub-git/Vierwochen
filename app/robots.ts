import type { MetadataRoute } from "next";
import { IS_LIVE, SITE } from "@/lib/config";

/** Gleicher Schalter wie metadata.robots — siehe app/layout.tsx. */
export default function robots(): MetadataRoute.Robots {
  if (!IS_LIVE) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/v/", "/admin", "/api/", "/zugang"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
