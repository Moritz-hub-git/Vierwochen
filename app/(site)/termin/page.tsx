"use client";

import { useRef } from "react";
import Link from "next/link";
import Booking from "@/components/chat/Booking";
import { BrandPage } from "@/components/v/BrandNav";
import { SITE } from "@/lib/config";
import s from "@/components/v/brandnav.module.css";

/**
 * Direktbuchung ohne Dialog (Persona-Review 2026-08-14).
 *
 * Wer war gemeint: der chat-averse Geschäftsführer, der auf der Startseite
 * nach einer Telefonnummer oder einem Kalender sucht und keinen findet.
 * Vorher war der KI-Dialog der einzige Weg zum Termin — für diese Besucher
 * ein Ausstiegspunkt. Die Dialogleiste bleibt der Hauptweg; diese Seite ist
 * der leise Zweitweg und wird nur dezent verlinkt.
 *
 * Kein „Einschätzung starten"-Knopf mehr im Kopf: Er öffnete hier ein
 * Chat-Panel ohne Eingabezeile (Audit 2026-09-08). Wer die Einschätzung
 * will, geht über den Tipp-Link zurück auf die Startseite.
 */
export default function TerminPage() {
  const dialogIdRef = useRef<string>("");
  if (!dialogIdRef.current && typeof window !== "undefined") {
    dialogIdRef.current =
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `t-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
  }

  return (
    <BrandPage>
      <h1>Beratungsgespräch direkt buchen</h1>
      <p className={s.lead}>
        30 Minuten mit {SITE.founder.name} — kostenlos, unverbindlich, per
        Online-Call oder Telefon. Ganz ohne Chat-Dialog: Termin wählen,
        Kontaktdaten eintragen, fertig.
      </p>
      <p className={s.muted}>
        Tipp: Wenn Sie vorher <Link href="/">die Einschätzung auf der Startseite</Link>{" "}
        durchlaufen (3 Fragen, eine Minute), liegt im Gespräch schon Ihre
        Lösungsskizze mit Preisschätzung auf dem Tisch — Sie sparen die erste
        Viertelstunde. Pflicht ist das nicht.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <Booking dialogId={dialogIdRef.current} caseSummary="Direktbuchung über /termin, ohne Dialog" />
      </div>
    </BrandPage>
  );
}
