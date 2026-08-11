import type { MetadataRoute } from "next";

// Solange die Seite nicht offiziell live ist: komplett aussperren (PROMPT.md §11).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
