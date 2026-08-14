"use client";

import { useRef } from "react";
import Link from "next/link";
import Booking from "@/components/chat/Booking";

/**
 * Direktbuchung ohne Dialog (Persona-Review 2026-08-14).
 *
 * Wer war gemeint: der chat-averse Geschäftsführer, der auf der Startseite
 * nach einer Telefonnummer oder einem Kalender sucht und keinen findet.
 * Vorher war der KI-Dialog der einzige Weg zum Termin — für diese Besucher
 * ein Ausstiegspunkt. Die Dialogleiste bleibt der Hauptweg; diese Seite ist
 * der leise Zweitweg und wird nur dezent verlinkt.
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
    <main className="container legal direct-booking">
      <h1>Beratungsgespräch direkt buchen</h1>
      <p>
        30 Minuten mit Moritz Schumacher — kostenlos, unverbindlich, per
        Online-Call oder Telefon. Ganz ohne Chat-Dialog: Termin wählen,
        Kontaktdaten eintragen, fertig.
      </p>
      <p className="direct-booking-hint">
        Tipp: Wenn Sie vorher{" "}
        <Link href="/">die Einschätzung auf der Startseite</Link> durchlaufen,
        liegt im Gespräch schon Ihre Lösungsskizze mit Preisschätzung auf dem
        Tisch — Sie sparen die erste Viertelstunde. Pflicht ist das nicht.
      </p>

      <Booking dialogId={dialogIdRef.current} caseSummary="Direktbuchung über /termin, ohne Dialog" />
    </main>
  );
}
