import { redirect } from "next/navigation";

/**
 * Die alte Adresse der empfohlenen Variante. Seit die Landing unter „/"
 * läuft (eine Marke, eine Adresse — Vollreview 2026-09-08), leitet sie nur
 * noch dorthin um: Alte Links und Lesezeichen laufen nicht ins Leere.
 * Alle fünf Fassungen zum Vergleichen: /v
 */

export default function FixfertigPage() {
  redirect("/");
}
