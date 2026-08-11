# vierwochen — Anwendung

Next.js-Anwendung für vierwochen.de. Läuft als Container auf Cloud Run,
ausgeliefert über einen Cloud-Build-Trigger.

## Lokal starten

```bash
npm install
npm run dev
```

## Umgebungsvariablen

| Variable | Zweck | Gesetzt durch |
|---|---|---|
| `GOOGLE_CLOUD_PROJECT` | Projekt-ID für Vertex AI und Firestore | Cloud Run (automatisch) |
| `VERTEX_LOCATION` | Region des Modells, z. B. `europe-west4` | Cloud Run (automatisch) |
| `SITE_PASSWORD` | Wenn gesetzt, ist die ganze Seite passwortgeschützt | von Hand, für die Vorschau |

**Kein API-Schlüssel nötig.** Die Anwendung authentifiziert sich auf Cloud Run über
das Dienstkonto `vierwochen-app`. Lokal genügt `gcloud auth application-default login`.

## Vorschau schützen

```bash
gcloud run services update vierwochen --region=europe-west3 \
  --update-env-vars=SITE_PASSWORD=EinGutesPasswort
```

Zum Livegang die Variable wieder entfernen — vorher müssen Impressum,
Datenschutzerklärung und AGB stehen.

## Stand

- [x] Gerüst, Container, Auslieferung
- [x] Startseite mit Leistungsschild, Ablauf, Preisen, Manifest
- [x] Preislogik als Konfiguration (`src/lib/pricing.ts`)
- [x] Projekt-Dialog mit Gemini über Vertex AI (Dienstkonto, kein Schlüssel)
- [x] Lösungsskizze, die sich im Dialog aufbaut
- [x] E-Mail-Gate (Freemail-Prüfung) — Firestore-Ablage folgt
- [ ] Terminbuchung gegen die Google-Calendar-API
- [ ] Impressum, Datenschutz, AGB
