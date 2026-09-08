import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Solange die Seite nicht offiziell live ist: nicht indexieren.
          // Derselbe Schalter wie in lib/config.ts (IS_LIVE) — hier direkt
          // aus der Umgebung, weil next.config keine App-Module lädt.
          ...(process.env.SITE_LIVE === "1" ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
