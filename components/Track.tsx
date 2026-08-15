"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution, track } from "@/lib/track";

/**
 * Meldet den Seitenaufruf und sichert die Werbe-Herkunft der Sitzung.
 * Liegt im Wurzel-Layout, damit auch die Design-Varianten unter /v gezählt
 * werden. Die Verwaltungsseiten bleiben ausgenommen — eigene Besuche sollen
 * die Messung des Nachfragetests nicht verfälschen.
 */
export default function Track() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    captureAttribution();
    track("page_view");
  }, [pathname]);

  return null;
}
