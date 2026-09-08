import type { Metadata } from "next";
import { SITE } from "@/lib/config";
import Landing from "../fixfertig/Landing";

export const metadata: Metadata = {
  title: `${SITE.name} — Variante: Die zwei Wege`,
};

export default function Page() {
  return <Landing variant="wege" />;
}
