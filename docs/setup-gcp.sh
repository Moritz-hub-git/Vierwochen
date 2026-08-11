#!/usr/bin/env bash
#
# vierwochen.de — Einrichtung der Google-Cloud-Umgebung
#
# So benutzt du das Skript:
#   1. In der Google Cloud Console oben rechts auf das Terminal-Symbol klicken (Cloud Shell).
#      Dort ist gcloud bereits installiert und du bist angemeldet — nichts zu installieren.
#   2. Die Variablen im Abschnitt EINSTELLUNGEN prüfen (mindestens PROJECT_ID).
#   3. Skript einfügen und ausführen.
#
# Das Skript legt nichts an, was Geld kostet, solange keine Anfragen laufen:
# Cloud Run skaliert auf null, Firestore und Artifact Registry sind im Leerlauf
# praktisch kostenfrei. Trotzdem: Budget-Alarm setzen (siehe Handarbeit am Ende).

set -euo pipefail

# ─── EINSTELLUNGEN ────────────────────────────────────────────────────────────

PROJECT_ID="vierwochen-prod"        # anpassen, falls dein Projekt anders heißt
REGION_APP="europe-west3"           # Frankfurt — Cloud Run und Artifact Registry
REGION_AI="europe-west4"            # Vertex AI (Gemini); EU-Region, ggf. anpassen
FIRESTORE_LOCATION="eur3"           # Europa-Multiregion
SA_NAME="vierwochen-app"            # Dienstkonto der Anwendung
REPO_NAME="vierwochen"              # Artifact-Registry-Repository

# ──────────────────────────────────────────────────────────────────────────────

SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

echo "▸ Projekt setzen: ${PROJECT_ID}"
gcloud config set project "${PROJECT_ID}" --quiet

echo "▸ Schnittstellen aktivieren (dauert ein bis zwei Minuten)"
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  firestore.googleapis.com \
  aiplatform.googleapis.com \
  calendar-json.googleapis.com \
  secretmanager.googleapis.com \
  iamcredentials.googleapis.com \
  --quiet

echo "▸ Firestore-Datenbank anlegen (Native Mode, ${FIRESTORE_LOCATION})"
gcloud firestore databases create \
  --location="${FIRESTORE_LOCATION}" \
  --type=firestore-native \
  --quiet || echo "  (existiert bereits — übersprungen)"

echo "▸ Artifact Registry anlegen (${REGION_APP})"
gcloud artifacts repositories create "${REPO_NAME}" \
  --repository-format=docker \
  --location="${REGION_APP}" \
  --description="Container der vierwochen-Anwendung" \
  --quiet || echo "  (existiert bereits — übersprungen)"

echo "▸ Dienstkonto der Anwendung anlegen"
gcloud iam service-accounts create "${SA_NAME}" \
  --display-name="vierwochen Anwendung" \
  --quiet || echo "  (existiert bereits — übersprungen)"

echo "▸ Rollen vergeben"
for ROLE in \
  roles/aiplatform.user \
  roles/datastore.user \
  roles/secretmanager.secretAccessor \
  roles/logging.logWriter
do
  gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="${ROLE}" \
    --condition=None \
    --quiet > /dev/null
  echo "  ✓ ${ROLE}"
done

echo "▸ Cloud Build erlauben, nach Cloud Run zu deployen"
PROJECT_NUMBER="$(gcloud projects describe "${PROJECT_ID}" --format='value(projectNumber)')"
CLOUDBUILD_SA="${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com"
for ROLE in roles/run.admin roles/iam.serviceAccountUser roles/artifactregistry.writer
do
  gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
    --member="serviceAccount:${CLOUDBUILD_SA}" \
    --role="${ROLE}" \
    --condition=None \
    --quiet > /dev/null || echo "  (Hinweis: ${ROLE} konnte nicht gesetzt werden — siehe Handarbeit)"
  echo "  ✓ ${ROLE}"
done

cat <<INFO

════════════════════════════════════════════════════════════════════
FERTIG. Diese Werte brauche ich von dir (alle unkritisch):

  Projekt-ID            ${PROJECT_ID}
  Projektnummer         ${PROJECT_NUMBER}
  Region Anwendung      ${REGION_APP}
  Region Vertex AI      ${REGION_AI}
  Dienstkonto           ${SA_EMAIL}

════════════════════════════════════════════════════════════════════
NOCH VON HAND ZU ERLEDIGEN (vier Schritte, ca. 10 Minuten):

1) ABRECHNUNG UND BUDGET
   Abrechnung mit dem Projekt verknüpfen und unter
   "Abrechnung → Budgets" einen Alarm setzen (Vorschlag: 50 € pro Monat,
   Benachrichtigung bei 50/90/100 Prozent).

2) GITHUB MIT CLOUD BUILD VERBINDEN
   Cloud Build → Trigger → "Repository verbinden" → GitHub → dieses
   Repository auswählen. Danach Trigger anlegen:
     Ereignis  : Push auf Branch
     Branch    : ^main$   (oder der Branch, auf dem gebaut wird)
     Konfig    : cloudbuild.yaml   (lege ich im Repository an)
   Ab dann deployt jeder Push automatisch — genau das macht den Bau autonom.

3) KALENDER FREIGEBEN
   Google Kalender → Einstellungen des Buchungskalenders →
   "Für bestimmte Personen freigeben" → diese Adresse eintragen:
     ${SA_EMAIL}
   Berechtigung: "Termine ändern".

4) DOMAIN
   vierwochen.de bei einem deutschen Registrar registrieren.
   Die Verknüpfung mit Cloud Run machen wir später gemeinsam.

════════════════════════════════════════════════════════════════════
WICHTIG: Erzeuge KEINEN Dienstkonto-Schlüssel und schicke ihn nirgendwohin.
Die Anwendung authentifiziert sich auf Cloud Run über ihre eigene Identität.
Ein Schlüssel wäre ein unnötiges Risiko.
════════════════════════════════════════════════════════════════════

INFO
