# Opsrid

**Individuelle Prozesssoftware — Work eliminated.**

Opsrid baut und betreibt individuelle Geschäftsanwendungen, die wiederkehrende operative Arbeit übernehmen. Der Erstkontakt auf `opsrid.com` führt vom persistenten Chat-Dock über höchstens drei Rückfragen zu einer konkreten Prozessvorschau und anschließend inline zur Terminbuchung. Die öffentliche Kontaktadresse bleibt bis zur Bestätigung `hallo@vierwochen.de` als Übergangswert.

Die operative Planung steht in [`docs/launch/00-START-HIER.md`](./docs/launch/00-START-HIER.md). Die ursprüngliche Strategie wurde unverändert in [`docs/COMPANY-STRATEGY.md`](./docs/COMPANY-STRATEGY.md) archiviert. Aussagen mit dem Status „Fakt“ beziehen sich auf dieses Repository oder ausdrücklich belegte Angaben; „Annahme“ bleibt bis zur Validierung offen.

## Tatsächliche Architektur

- **Next.js App Router + TypeScript**: Website, persistentes Chat-Dock, Zugangs-/Admin-Seiten und API-Routen; `output: 'standalone'` für den Container.
- **Cloud Run**: Laufzeit in `europe-west3`; der Container hört auf Port 8080.
- **Firestore**: Dialoge, Leads, Buchungsanfragen, Events, Rate-Limits und Aufbewahrung. Ohne Google-Cloud-Projekt läuft lokal ein kontrollierter Anfrage-/Fallback-Modus ohne Persistenz.
- **Gemini über Vertex AI**: `/api/chat` ruft das in `VERTEX_MODEL` konfigurierte Gemini-Modell über die Dienstkonto-Identität auf; aktuell fällt die Konfiguration auf `gemini-3.5-flash-lite` zurück. Der primäre Launch-Funnel ist der Chat mit konkreter Vorschau. Es werden keine API-Schlüssel in den Code gelegt.
- **Google Calendar**: freie Slots werden geprüft und Buchungen angelegt, wenn `BOOKING_CALENDAR_ID` gesetzt ist. Ohne diese Variable werden Buchungsanfragen gespeichert und manuell bestätigt.
- **Schutzmechanismen**: maximal drei Rückfragen im öffentlichen Chat, Zeichen- und Zuglimits, Rate-Limits pro IP, optionale Vorschau-Sperre, Admin-Export und Bereinigung nach den Aufbewahrungsfristen.

Der Frontend-Auftritt ist auf Opsrid umgestellt. `opsrid.com` ist die Ziel-Domain; die Betreiberangaben und die endgültige Kontaktadresse sind noch offen. Die vorhandene Infrastruktur und die wiederverwendbaren Backend-Bausteine bleiben die technische Basis.

## Lokal entwickeln

Voraussetzung ist Node.js 22 und npm.

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Produktionsbuild
npm run start     # gebauten Stand starten
npm run typecheck # TypeScript-Prüfung
npm test          # automatisierte Tests
```

Das Ziel-Script-Set ist `dev`, `build`, `start`, `typecheck` und `test` (optional zusätzlich `lint`). Falls der lokale Checkout die beiden neuen Scripts noch nicht enthält, entspricht `npm run typecheck` zunächst `npx tsc --noEmit`; der manuelle Smoke-Test steht in [`docs/launch/00-START-HIER.md`](./docs/launch/00-START-HIER.md). Kein Test oder Build darf echte Kundendaten verwenden.

## Umgebungsvariablen

Die vollständige kommentierte Vorlage liegt in [`.env.example`](./.env.example). Für lokale Entwicklung sind alle Werte optional. Für Cloud Run kommt die Authentifizierung über Application Default Credentials bzw. die Dienstkonto-Identität; niemals Dienstkonto-Schlüssel erzeugen oder committen.

## Auslieferung

Der vorhandene [`cloudbuild.yaml`](./cloudbuild.yaml) baut das Docker-Image, pusht es in die bestehende Artifact Registry und erstellt eine mit `opsrid-preview` markierte Revision auf Cloud Run, ohne den bisherigen Produktionstraffic umzuschalten. Bestehende Umgebungsvariablen und Geheimnisse bleiben erhalten. Domain, Kontaktadresse und Indexierungsstatus werden bereits beim Docker-Build gesetzt. Er legt keine Ressourcen an. Vor dem Livegang müssen Betreiber, Domain, Mailversand, Backend-Variablen und der öffentliche Smoke-Test anhand der Checkliste bestätigt werden. Ein grüner Build beweist weder eine funktionierende Kalenderberechtigung noch die rechtliche Vollständigkeit der Website.

## Wichtige Pfade

| Pfad | Zweck |
|---|---|
| `app/(site)/page.tsx` | öffentliche Startseite |
| `components/chat/`, `app/api/chat` | primärer AI-first Dialog, Vorschau und Inline-Buchungsübergabe |
| `components/Track.tsx`, `app/api/event` | datensparsame Sitzungs-/Attributions- und Funnelmessung, sofern im Root-Layout eingebunden |
| `app/(site)/prozess-check`, `app/api/process-check` | direkter sekundärer Prozess-Check/Fallback mit Persistenz und Mailversand |
| `app/api/booking/*` | Slots und Buchungen bzw. Anfrage-Modus |
| `app/api/lead`, `app/api/event` | Leads und Messereignisse |
| `app/api/health` | Laufzeit- und optionale Modellprüfung |
| `lib/config.ts` | Marke, Preis-/Betriebswerte, Limits, Aufbewahrung und Laufzeitkonfiguration |
| `lib/firestore.ts`, `lib/vertex.ts`, `lib/calendar.ts` | Infrastrukturadapter |
| `app/(site)/impressum`, `datenschutz`, `agb` | Entwürfe; vor Livegang mit echten Betreiberangaben und fachlicher Prüfung vervollständigen |

## Inhaltliche Leitplanke

Opsrid verkauft einen messbaren Prozessoutput und die dadurch entfallende manuelle Arbeit. Die fünf dokumentierten Start-Use-Cases sind Auftragsbestätigungen, RFQ-/Angebotsvorbereitung, Reklamationen/8D, Management-Reporting und Lieferanten-Onboarding. Auf der Website werden sie als Beispiele und Hypothesen behandelt, solange keine Kundenvalidierung vorliegt. Outreach-Texte in `docs/launch/03-outbound-und-content.md` sind Entwürfe und werden nicht automatisch versendet. Der Funnel und seine Messpunkte stehen in [`docs/launch/00-START-HIER.md`](./docs/launch/00-START-HIER.md).

Für die operative Arbeit: [Prozess-Aufnahme](./docs/launch/09-PROZESS-AUFNAHME.md) und [leere Lead-Pipeline-Vorlage](./docs/launch/LEAD-PIPELINE-TEMPLATE.csv).

## Prüfungen

```bash
npm test
npm run typecheck
npm run build
# Integrationstests: lokalen Server ohne Cloud-Projekt/Mail starten, dann:
TEST_BASE_URL=http://127.0.0.1:3000 TEST_EXPECT_MISSING_INFRA=1 npm test
```

Tests für Zustellstatus nutzen isolierte Speicher-/Mailadapter und versenden nichts. HTTP-Tests laufen nur mit expliziter lokaler Ziel-URL. Der AI-first-Chat kann die Vorschau auch ohne Persistenz anzeigen; für eine belastbare Nachverfolgung muss der Dialog gespeichert werden. Terminbuchungen bleiben bei fehlendem Kalender ausdrücklich Terminanfragen. Der optionale Formular-Fallback schreibt nach `/admin` und in den CSV-Export `?was=prozesschecks`.
