import type { Metadata } from "next";
import Link from "next/link";
import { isAdmin, adminPassword } from "@/lib/adminAuth";
import {
  buildFunnel,
  buildSources,
  loadBookings,
  loadCases,
  loadEvents,
} from "@/lib/events";
import AdminLogin from "./AdminLogin";
import s from "./admin.module.css";

/**
 * Auswertung des Nachfragetests.
 *
 * Beantwortet genau drei Fragen: Wie viele kommen an? Wo brechen sie ab?
 * Und — der eigentliche Schatz — welche Probleme beschreiben sie im Klartext?
 * Bewusst serverseitig gerendert, ohne Diagrammbibliothek: Die Balken sind
 * CSS, die Zahlen kommen direkt aus Firestore.
 */

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Auswertung — vierwochen", robots: { index: false } };

const pct = (v: number) => `${Math.round(v * 100)} %`;
const euro = (n: number) => n.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " €";
const dt = (d: Date | null) =>
  d
    ? new Intl.DateTimeFormat("de-DE", {
        timeZone: "Europe/Berlin",
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(d)
    : "—";

const PHASE_LABEL: Record<string, string> = {
  question: "abgebrochen im Dialog",
  result: "Skizze erhalten",
  reject: "abgelehnt (Fall passt nicht)",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tage?: string }>;
}) {
  if (!adminPassword()) {
    return (
      <main className="container legal">
        <h1>Auswertung nicht eingerichtet</h1>
        <p>
          Setze die Umgebungsvariable <code>ADMIN_PASSWORD</code> in{" "}
          <code>cloudbuild.yaml</code> (in der Zeile <code>--set-env-vars</code>, sonst
          wird sie beim nächsten Deploy überschrieben) und deploye erneut.
        </p>
      </main>
    );
  }

  if (!(await isAdmin())) return <AdminLogin />;

  const params = await searchParams;
  const days = Math.min(365, Math.max(1, Number(params.tage) || 30));

  const [events, cases, bookings] = await Promise.all([
    loadEvents(days),
    loadCases(200),
    loadBookings(50),
  ]);

  const funnel = buildFunnel(events);
  const sources = buildSources(events);
  const hasData = events.length > 0 || cases.length > 0;

  // Absprungstelle mit dem größten Verlust — die Stelle, an der es hakt.
  const worst = funnel
    .slice(1)
    .filter((r) => r.sessions > 0 || funnel[0].sessions > 0)
    .reduce<(typeof funnel)[number] | null>(
      (acc, row) => (acc === null || row.ofPrev < acc.ofPrev ? row : acc),
      null
    );

  return (
    <main className={s.page}>
      <header className={s.head}>
        <div>
          <h1>Auswertung</h1>
          <p className={s.sub}>Nachfragetest · letzte {days} Tage</p>
        </div>
        <nav className={s.range}>
          {[7, 30, 90].map((d) => (
            <Link key={d} href={`/admin?tage=${d}`} className={d === days ? s.rangeActive : ""}>
              {d} Tage
            </Link>
          ))}
          <a className={s.export} href={`/api/admin/export?tage=${days}&was=faelle`}>
            Fälle als CSV
          </a>
          <a className={s.export} href={`/api/admin/export?tage=${days}&was=ereignisse`}>
            Ereignisse als CSV
          </a>
        </nav>
      </header>

      {!hasData && (
        <div className={s.empty}>
          <strong>Noch keine Daten.</strong> Die Messung läuft ab sofort mit — sobald
          der erste Besucher kommt, erscheinen hier Trichter, Absprungstellen und
          die beschriebenen Fälle. (Lokal ohne Firestore bleibt die Seite leer.)
        </div>
      )}

      {/* ---------- Trichter ---------- */}
      <section className={s.section}>
        <h2>Trichter</h2>
        <div className={s.funnel}>
          {funnel.map((row, i) => (
            <div className={s.funnelRow} key={row.type}>
              <span className={s.funnelLabel}>
                {i + 1}. {row.label}
              </span>
              <span className={s.funnelBarWrap}>
                <span
                  className={s.funnelBar}
                  style={{ width: `${Math.max(row.ofTop * 100, row.sessions > 0 ? 2 : 0)}%` }}
                />
              </span>
              <span className={s.funnelNum}>{row.sessions}</span>
              <span className={s.funnelPct}>
                {i === 0 ? "—" : `${pct(row.ofPrev)} der Stufe davor`}
              </span>
            </div>
          ))}
        </div>
        {worst && funnel[0].sessions > 0 && (
          <p className={s.hint}>
            Größter Verlust bei <strong>{worst.label}</strong> — dort kommen nur{" "}
            {pct(worst.ofPrev)} der vorherigen Stufe an.{" "}
            {worst.type === "dialog_opened" && "Deutet auf Botschaft oder Traffic-Qualität hin."}
            {worst.type === "dialog_started" && "Der Einstieg wirkt zu aufwendig oder unpassend."}
            {worst.type === "result_delivered" && "Der Dialog ist zu lang oder bricht fachlich ab."}
            {worst.type === "booking_slot_selected" && "Skizze überzeugt nicht genug für einen Termin."}
            {worst.type === "booked" && "Slot gewählt, aber Formular nicht abgeschickt."}
          </p>
        )}
      </section>

      {/* ---------- Herkunft ---------- */}
      {sources.length > 0 && (
        <section className={s.section}>
          <h2>Herkunft</h2>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Quelle</th>
                  <th>Sitzungen</th>
                  <th>Dialoge</th>
                  <th>Skizzen</th>
                  <th>Termine</th>
                  <th>Dialogquote</th>
                </tr>
              </thead>
              <tbody>
                {sources.map((r) => (
                  <tr key={r.source}>
                    <td>{r.source}</td>
                    <td>{r.sessions}</td>
                    <td>{r.dialogs}</td>
                    <td>{r.results}</td>
                    <td>
                      <strong>{r.bookings}</strong>
                    </td>
                    <td>{r.sessions > 0 ? pct(r.dialogs / r.sessions) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ---------- Termine ---------- */}
      {bookings.length > 0 && (
        <section className={s.section}>
          <h2>Termine ({bookings.length})</h2>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Gebucht</th>
                  <th>Termin</th>
                  <th>Name</th>
                  <th>Unternehmen</th>
                  <th>E-Mail</th>
                  <th>Status</th>
                  <th>Agenda</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={`${b.slotStart}-${i}`}>
                    <td>{dt(b.createdAt)}</td>
                    <td>{dt(b.slotStart ? new Date(b.slotStart) : null)}</td>
                    <td>{b.name}</td>
                    <td>{b.company ?? "—"}</td>
                    <td className={s.mono}>{b.email}</td>
                    <td>{b.status}</td>
                    <td className={s.wrapCell}>{b.agenda ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ---------- Fälle: der eigentliche Schatz ---------- */}
      <section className={s.section}>
        <h2>Beschriebene Fälle ({cases.length})</h2>
        <p className={s.hint}>
          Was Besucher <em>in eigenen Worten</em> als Problem nennen. Nach etwa 50
          Fällen zeigt sich hier, welches Produkt der Markt tatsächlich will — und
          ob sich ein Muster wiederholt, das man als festes Angebot schnüren kann.
        </p>
        <div className={s.cases}>
          {cases.map((c) => (
            <article className={s.case} key={c.dialogId}>
              <div className={s.caseHead}>
                <span className={s.caseDate}>{dt(c.updatedAt)}</span>
                <span
                  className={`${s.badge} ${
                    c.lastPhase === "result"
                      ? s.badgeOk
                      : c.lastPhase === "reject"
                        ? s.badgeWarn
                        : s.badgeMuted
                  }`}
                >
                  {PHASE_LABEL[c.lastPhase] ?? c.lastPhase}
                </span>
                <span className={s.caseTurns}>{c.turns} Antworten</span>
              </div>
              <p className={s.caseQuote}>„{c.firstMessage || "(kein Text)"}"</p>
              {c.sketchTitle && <div className={s.caseTitle}>{c.sketchTitle}</div>}
              {(c.price || c.annualEuro) && (
                <div className={s.caseNums}>
                  {c.tier && <span>{c.tier}</span>}
                  {c.price ? <span>Preis: {euro(c.price)}</span> : null}
                  {c.personDays ? <span>{c.personDays} PT/Woche</span> : null}
                  {c.annualEuro ? <span>Status quo: {euro(c.annualEuro)}/Jahr</span> : null}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
