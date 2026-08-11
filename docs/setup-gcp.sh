#!/usr/bin/env bash
#
# vierwochen.de — Einrichtung der Google-Cloud-Umgebung
#
# Ausfuehren in der Cloud Shell (Terminal-Symbol oben rechts in der Console).
# Dort ist gcloud installiert und du bist angemeldet — nichts zu installieren.
#
# Das Skript ist wiederholbar: Bereits vorhandene Ressourcen werden uebersprungen.

set -euo pipefail

# ─── EINSTELLUNGEN ────────────────────────────────────────────────────────────

PROJECT_ID="vierwochen"
REGION_APP="europe-west3"       # Frankfurt — Cloud Run, Artifact Registry, Trigger
REGION_AI="europe-west4"        # Vertex AI (Gemini)
FIRESTORE_LOCATION="eur3"       # Europa-Multiregion
APP_SA_NAME="vierwochen-app"    # Laufzeit: die Anwendung selbst
BUILD_SA_NAME="vierwochen-build" # Bau: Cloud Build
REPO_NAME="vierwochen"

# ──────────────────────────────────────────────────────────────────────────────

APP_SA="${APP_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
BUILD_SA="${BUILD_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

echo "▸ Projekt setzen: ${PROJECT_ID}"
gcloud config set project "${PROJECT_ID}" --quiet

echo "▸ Schnittstellen aktivieren (ein bis zwei Minuten)"
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

echo "▸ Firestore-Datenbank (Native Mode, ${FIRESTORE_LOCATION})"
gcloud firestore databases create \
  --location="${FIRESTORE_LOCATION}" \
  --type=firestore-native \
  --quiet || echo "  (existiert bereits — übersprungen)"

echo "▸ Artifact Registry (${REGION_APP})"
gcloud artifacts repositories create "${REPO_NAME}" \
  --repository-format=docker \
  --location="${REGION_APP}" \
  --description="Container der vierwochen-Anwendung" \
  --quiet || echo "  (existiert bereits — übersprungen)"

# ─── Laufzeit-Dienstkonto: unter dieser Identität läuft die Anwendung ─────────

echo "▸ Laufzeit-Dienstkonto ${APP_SA_NAME}"
gcloud iam service-accounts create "${APP_SA_NAME}" \
  --display-name="vierwochen Anwendung" \
  --quiet || echo "  (existiert bereits — übersprungen)"

for ROLE in \
  roles/aiplatform.user \
  roles/datastore.user \
  roles/secretmanager.secretAccessor \
  roles/logging.logWriter
do
  gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
    --member="serviceAccount:${APP_SA}" \
    --role="${ROLE}" --condition=None --quiet > /dev/null
  echo "  ✓ ${ROLE}"
done

# ─── Bau-Dienstkonto ─────────────────────────────────────────────────────────
#
# Google hat die Cloud-Build-Dienstkonten umgestellt: In Projekten, die nach der
# Umstellung angelegt wurden, gibt es das alte Konto
# PROJEKTNUMMER@cloudbuild.gserviceaccount.com nicht mehr. Ein Trigger muss
# deshalb ausdrücklich ein Dienstkonto mitbekommen — sonst scheitert das Anlegen
# mit "Request contains an invalid argument".

echo "▸ Bau-Dienstkonto ${BUILD_SA_NAME}"
gcloud iam service-accounts create "${BUILD_SA_NAME}" \
  --display-name="vierwochen Bau" \
  --quiet || echo "  (existiert bereits — übersprungen)"

for ROLE in \
  roles/run.admin \
  roles/artifactregistry.writer \
  roles/logging.logWriter \
  roles/cloudbuild.builds.builder
do
  gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
    --member="serviceAccount:${BUILD_SA}" \
    --role="${ROLE}" --condition=None --quiet > /dev/null
  echo "  ✓ ${ROLE}"
done

echo "▸ Bau-Konto darf das Laufzeit-Konto verwenden"
gcloud iam service-accounts add-iam-policy-binding "${APP_SA}" \
  --member="serviceAccount:${BUILD_SA}" \
  --role="roles/iam.serviceAccountUser" \
  --quiet > /dev/null

PROJECT_NUMBER="$(gcloud projects describe "${PROJECT_ID}" --format='value(projectNumber)')"

cat <<INFO

════════════════════════════════════════════════════════════════════
FERTIG.

  Projekt-ID            ${PROJECT_ID}
  Projektnummer         ${PROJECT_NUMBER}
  Region Anwendung      ${REGION_APP}
  Region Vertex AI      ${REGION_AI}
  Laufzeit-Dienstkonto  ${APP_SA}
  Bau-Dienstkonto       ${BUILD_SA}

════════════════════════════════════════════════════════════════════
TRIGGER ANLEGEN

Erst das Repository verbinden (Console: Cloud Build → Trigger →
Repository verbinden → GitHub). Danach:

  gcloud builds triggers create github \\
    --name=vierwochen-main \\
    --region=${REGION_APP} \\
    --repo-owner=Moritz-hub-git \\
    --repo-name=vierwochen \\
    --branch-pattern='^main\$' \\
    --build-config=cloudbuild.yaml \\
    --service-account=projects/${PROJECT_ID}/serviceAccounts/${BUILD_SA}

Wichtig: Trigger und Repository-Verbindung müssen in derselben Region
liegen. Wurde das Repository global verbunden, dann --region=global.

════════════════════════════════════════════════════════════════════
OHNE TRIGGER SOFORT AUSLIEFERN (zum Testen)

  git clone https://github.com/Moritz-hub-git/vierwochen.git
  cd vierwochen
  gcloud run deploy vierwochen --source . \\
    --region=${REGION_APP} \\
    --service-account=${APP_SA} \\
    --allow-unauthenticated \\
    --set-env-vars=GOOGLE_CLOUD_PROJECT=${PROJECT_ID},VERTEX_LOCATION=${REGION_AI}

════════════════════════════════════════════════════════════════════
NOCH VON HAND

1) Budget-Alarm setzen (Abrechnung → Budgets, Vorschlag: 50 € pro Monat).
2) Buchungskalender freigeben für: ${APP_SA}  (Recht: "Termine ändern").
3) Domain vierwochen.de bei einem deutschen Registrar registrieren.

Erzeuge KEINE Dienstkonto-Schlüssel. Sie werden nirgends gebraucht.
════════════════════════════════════════════════════════════════════

INFO
