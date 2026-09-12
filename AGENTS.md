# OpsDone repository

OpsDone is an AI-native process automation company. The public product is eliminated manual work, delivered as a scoped implementation and managed operation. Keep existing customer systems, expose uncertainty, and route business decisions to people.

## Product and language

- German public copy, English master claim: **Work eliminated.**
- Do not restore the old app-agency, four-week guarantee, developer-day or hourly billing positioning.
- Examples must be labeled as examples; no invented clients, metrics, certifications or integrations.
- The target domain is `opsdone.de`. The transitional contact address is configured in `lib/config.ts`; do not invent a verified new mailbox.
- Missing operator details in legal pages are deliberate pending owner input.

## Architecture

- Next.js App Router, React, TypeScript; self-hosted fonts.
- Public homepage and pages: `app/(site)`. Shared UI: `components/site`.
- Five process definitions: `lib/processes.ts`; outcome calculation: `lib/potential.ts`.
- Primary funnel: Ads → persistent ChatDock → `/api/chat` → at most three questions → concrete AI process preview without an email gate → inline booking via `/api/booking/*`.
- The AI chat result is visible before contact details. Booking collects contact details only when the visitor chooses a slot; without `BOOKING_CALENDAR_ID`, the selected slot is an explicitly labeled request for manual confirmation.
- `/api/process-check` and a possible direct form are secondary/fallback intake infrastructure; they must not be described as the primary launch funnel.
- Chat dialogs and funnel events use Firestore when configured; the process preview must not be blocked by an email gate.
- Intake must return failure if neither durable storage nor confirmed delivery succeeds.
- Admin views and exports must require authentication; never expose lead data in public pages.

## Verification

Run `npm test`, `npm run typecheck`, and `npm run build`. For full local integration tests, run a local server without `GOOGLE_CLOUD_PROJECT` or `MAIL_SENDER`, then `TEST_BASE_URL=http://127.0.0.1:3000 TEST_EXPECT_MISSING_INFRA=1 npm test`. Do not run delivery tests against a live service or use real customer data.

Check desktop and mobile navigation, persistent Dock behavior, three-question limit, process preview, booking handoff, `/termin` as the inline booking page (no redirect), calculator assumptions, form validation and failure states when editing the funnel. Do not run dev and production builds concurrently against the same `.next` directory.

## Deployment

`cloudbuild.yaml` reuses the existing `vierwochen` infrastructure and deploys a tagged `opsdone-preview` revision with no production traffic change. Preserve existing Cloud Run secrets and environment values. Public URL/contact and `SITE_LIVE` must be passed at build time because static metadata/client configuration are baked into the image. Promotion and DNS mapping are separate release steps.

Business launch documents live in `docs/launch`; the exact original brief is `docs/COMPANY-STRATEGY.md`.
