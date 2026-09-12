# Funnel-Design — AI-first Chat

## Richtung

Die Oberfläche knüpft an die ursprüngliche zentrierte Bühne an: viel Raum, ein klarer Fokus und eine ruhige Lesespalte. Farblich trägt sie einen hellen, eigenen Blau-/Ink-Stil mit wenigen Akzenten. Die Gestaltung wirkt wie ein konzentriertes Arbeitsinstrument, nicht wie eine generische Chat-App.

## Zustandsfolge

```text
Landing / Ad
  → persistentes Chat-Dock am unteren Rand
  → Prozessbeschreibung des Besuchers
  → höchstens drei Rückfragen
  → progressive Prozessskizze
  → konkrete Vorschau mit Wert, offenen Punkten und Annahmen
  → Inline-Terminbuchung
```

Die Vorschau erscheint ohne E-Mail-Gate. Kontaktangaben werden erst für die gewählte Terminbuchung abgefragt. Ist kein Kalender konfiguriert, zeigt die Inline-Buchung klar „Terminanfrage“ und keine bestätigte Kalenderbuchung.

## Dock

Das Dock bleibt während des öffentlichen Funnel-Aufenthalts unten erreichbar. Es ist der Startpunkt und nimmt normale Sprache ebenso wie vorgeschlagene Beispiele an. Beim Öffnen erhält der Chat die Aufmerksamkeit, ohne die Navigation unbedienbar zu machen. Escape, Zurück und sichtbare Fokuszustände müssen funktionieren; `prefers-reduced-motion` wird respektiert.

## Progressive Reveal

Nach jedem Zug wächst die Skizze sichtbar: erkannte Prozessschritte, mögliche Automatisierung, offene Fragen und Annahmen. Die UI markiert unsichere oder risikoreiche Schritte als menschliche Prüfung. Die Ergebnisansicht zeigt eine unverbindliche Einschätzung und verweist auf den Discovery-Termin; sie verspricht keine Quote, Frist oder Ersparnis ohne Datenbasis.

## Conversion-Ziel

Der Funnel soll eine qualifizierte Terminbuchung oder — ohne Kalender — eine gespeicherte Terminanfrage mit brauchbarer Prozessskizze erzeugen. Gemessen werden die vorhandenen Interaktionsereignisse (`dialog_opened`, `dialog_started`, `dialog_question`, `result_delivered`, `booking_slot_selected`, `booked`). Conversion-Raten bleiben bis zu einer ausreichenden Datenbasis offen.

## Fallback

`/prozess-check?formular=1` bleibt als ausdrücklich gewählter Formularpfad verfügbar. Normale Links auf `/prozess-check` öffnen den Chat. Ein Fehler im Modell zeigt die Ursache knapp und bietet Wiederholen oder Termin an; er darf keine falsche Vorschau erzeugen.

## Design-Gates vor Veröffentlichung

- [ ] Chat-Dock ist auf Desktop und Mobil dauerhaft auffindbar.
- [ ] Drei Rückfragen sind die harte Obergrenze des öffentlichen Erstgesprächs.
- [ ] Vorschau, Annahmen und offene Punkte erscheinen vor Kontaktangaben.
- [ ] Inline-Buchung folgt direkt und zeigt Anfrage-Modus korrekt.
- [ ] Keine E-Mail-Gate-Komponente blockiert die Vorschau.
- [ ] Fokus, Tastatur, Escape, Zurück und reduzierte Bewegung geprüft.
