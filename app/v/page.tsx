import { redirect } from "next/navigation";

/**
 * Die Variantenübersicht hat ihren Zweck erfüllt: Von den sechs Entwürfen
 * ist neoapp.studio übrig geblieben (Entscheidung 2026-08-15). Wer den
 * alten Übersichtslink noch kennt, landet direkt dort.
 */
export default function VariantsIndex() {
  redirect("/v/fixfertig");
}
