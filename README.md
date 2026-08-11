# vierwochen.de

**Individualsoftware für den Mittelstand — in vier Wochen, zum Festpreis.**

Vollständige Website mit KI-gestütztem Projekt-Dialog, wachsender Lösungsskizze,
E-Mail-Gate und eigener Terminbuchung. Der Bauauftrag steht in [`PROMPT.md`](./PROMPT.md).

## Stack

- **Next.js** (App Router, TypeScript, `output: 'standalone'`) als Container auf **Cloud Run**
- **Firestore** (Native Mode, `eur3`) für Dialoge, Leads, Buchungen und Rate-Limits
- **Gemini über Vertex AI** (`europe-west4`) für den Projekt-Dialog — strukturiertes JSON je Zug
- **Google Calendar** (freeBusy + Events) für die Terminbuchung
- Authentifizierung ausschließlich über die **Dienstkonto-Identität** (ADC) — keine API-Schlüssel

## Lokal entwickeln

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Produktionsbuild (muss fehlerfrei durchlaufen)
```

Ohne Google-Cloud-Zugangsdaten läuft die Seite vollständig; der KI-Dialog und die
Kalenderprüfung melden dann einen kontrollierten Fehler bzw. arbeiten im
Anfrage-Modus. Persistenz ist deaktiviert, der Funnel bricht nicht.

## Umgebungsvariablen

| Variable | Zweck |
|---|---|
| `GOOGLE_CLOUD_PROJECT` | Projekt-ID (von Cloud Run gesetzt) |
| `VERTEX_LOCATION` | Modellregion, Standard `europe-west4` |
| `VERTEX_MODEL` | optional, Standard `gemini-2.5-flash` |
| `BOOKING_CALENDAR_ID` | Kalender für Buchungen; fehlt er → Anfrage-Modus |
| `SITE_PASSWORD` | wenn gesetzt: gesamte Seite passwortgeschützt (Vorschau) |

## Auslieferung

Push auf `main` löst den bestehenden Cloud-Build-Trigger aus
(`cloudbuild.yaml`: Docker-Build → Push in die Artifact Registry → `gcloud run
deploy vierwochen` in `europe-west3`). Details in `PROMPT.md`, Abschnitt 8 und 9.

## Wichtige Pfade

| Pfad | Inhalt |
|---|---|
| `app/page.tsx` | Landingpage (Hero, Methode, Weg, Preise, Belege, Einwände, Manifest) |
| `components/chat/` | Projekt-Dialog: Dock, Panel, Lösungsskizze, E-Mail-Gate, Buchung |
| `app/api/chat` | Dialog-Endpunkt (Vertex AI, Schema erzwungen, Kostenbremse) |
| `app/api/booking/*` | Slots berechnen (DST-fest, UTC intern) und buchen (Transaktion + Kalender) |
| `lib/` | Vertex, Firestore, Slots, Kalender, Rate-Limits, Preislogik |
| `app/impressum` u. a. | Rechtsseiten-Entwürfe mit PLATZHALTER-Markierungen |
