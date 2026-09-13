"use client";

import { useState } from "react";
import type { Blueprint, ViewType } from "@/lib/blueprint";
import s from "./blueprint-app.module.css";

type View = "work" | "sources" | "history";
type Event = { title: string; detail: string };

function Status({
  children,
  tone = "green",
}: {
  children: React.ReactNode;
  tone?: "green" | "amber" | "gray";
}) {
  return (
    <span className={`${s.status} ${s[tone]}`}>
      <i />
      {children}
    </span>
  );
}

export default function BlueprintApp({ blueprint }: { blueprint: Blueprint }) {
  const [view, setView] = useState<View>("work");
  const [selected, setSelected] = useState(0);
  const [resolvedItems, setResolvedItems] = useState<number[]>([]);
  const [clarifiedItems, setClarifiedItems] = useState<number[]>([]);
  const resolved = resolvedItems.includes(selected);
  const clarified = clarifiedItems.includes(selected);
  const [checked, setChecked] = useState(false);
  const [documentOpen, setDocumentOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const type = blueprint.processType;
  const isReport = type === "reporting";
  const isComplaint = type === "complaints";
  const isPurchase = type === "purchasing";
  const hasView = (required: ViewType) =>
    !blueprint.requiredViews.length ||
    blueprint.requiredViews.includes(required);
  const showSources = hasView("document-viewer") || hasView("comparison-table");
  const showHistory = hasView("audit-trail") || hasView("timeline");
  const showApproval = hasView("approval-panel");
  const showOutput = hasView("output-preview");
  const showComparison = hasView("comparison-table");
  const activeView =
    (view === "sources" && !showSources) || (view === "history" && !showHistory)
      ? "work"
      : view;

  const label = isReport
    ? "Berichtswerkstatt"
    : isComplaint
      ? "Reklamationszentrale"
      : isPurchase
        ? "Bestellprüfung"
        : "Prozesszentrale";
  const addEvent = (title: string, detail: string) =>
    setEvents((old) => [{ title, detail }, ...old]);
  const approve = () => {
    setResolvedItems((items) => [...items, selected]);
    addEvent(
      isReport
        ? "Bericht freigegeben"
        : isComplaint
          ? "Antwort freigegeben"
          : "Vorgang freigegeben",
      "Beispielaktion durch Sie · nur in dieser Vorschau",
    );
  };
  const clarify = () => {
    setClarifiedItems((items) => [...items, selected]);
    addEvent(
      "Rückfrage vorbereitet",
      "Entwurf gespeichert · keine Nachricht versendet",
    );
  };
  const titles = isReport
    ? ["Managementbericht", "Datenprüfung", "Berichtsarchiv"]
    : isComplaint
      ? ["Beschädigte Lieferung", "Fehlender Artikel", "Falsche Ausführung"]
      : isPurchase
        ? ["AB-2048", "AB-2047", "AB-2046"]
        : ["Vorgang 2048", "Vorgang 2047", "Vorgang 2046"];

  return (
    <div
      className={s.app}
      aria-label={`Interaktive Beispielanwendung: ${blueprint.title}`}
    >
      <div className={s.chrome}>
        <div className={s.brand}>
          <span className={s.logo}>o.</span>
          <span>
            OpsDone<span className={s.separator}>/</span>
            <b>{label}</b>
          </span>
        </div>
        <span className={s.demoTag}>Interaktive Vorschau</span>
      </div>
      <div className={s.shell}>
        <aside className={s.sidebar} aria-label="Beispielanwendung Navigation">
          <div className={s.workspaceLabel}>IHR WORKSPACE</div>
          <button
            type="button"
            aria-pressed={activeView === "work"}
            onClick={() => setView("work")}
          >
            <span>▦</span>
            {isReport ? "Bericht" : "Vorgänge"}
            <small>{isReport ? "1" : "3"}</small>
          </button>
          {showSources && (
            <button
              type="button"
              aria-pressed={activeView === "sources"}
              onClick={() => setView("sources")}
            >
              <span>▤</span>Datenquellen
            </button>
          )}
          {showHistory && (
            <button
              type="button"
              aria-pressed={activeView === "history"}
              onClick={() => setView("history")}
            >
              <span>◷</span>Verlauf
              {events.length > 0 && <small>{events.length}</small>}
            </button>
          )}
          <div className={s.sidebarBottom}>
            <span className={s.avatar}>IT</span>
            <div>
              Ihr Team<small>Prüfung & Freigabe</small>
            </div>
          </div>
        </aside>
        <div className={s.body}>
          <header className={s.pageHead}>
            <div>
              <span className={s.eyebrow}>FÜR IHREN PROZESS KONZIPIERT</span>
              <h3>
                {activeView === "sources"
                  ? "Ihre Daten. Ein Zusammenhang."
                  : activeView === "history"
                    ? "Jede Entscheidung nachvollziehbar."
                    : blueprint.title}
              </h3>
            </div>
            <span className={s.userAvatar}>IT</span>
          </header>

          {activeView === "sources" ? (
            <div className={s.sources}>
              <p>
                Diese Quellen könnte Ihre Anwendung zusammenführen. Der
                tatsächliche Zugriff wird vor der Umsetzung geprüft.
              </p>
              {(blueprint.inputs.length
                ? blueprint.inputs
                : ["Ihre Eingangsdaten"]
              ).map((input, i) => (
                <article key={`${input}-${i}`}>
                  <span className={s.sourceIcon}>{i % 2 ? "▥" : "▤"}</span>
                  <div>
                    <h4>{input}</h4>
                    <p>Als Eingabe vorgesehen</p>
                  </div>
                  <Status tone="gray">Zugriff offen</Status>
                </article>
              ))}
              <div className={s.integrationNote}>
                <b>Integration ist Teil der Umsetzung.</b>
                <p>
                  {blueprint.integrations.length
                    ? blueprint.integrations.join(" · ")
                    : "Die beteiligten Systeme konkretisieren wir gemeinsam."}
                </p>
              </div>
            </div>
          ) : activeView === "history" ? (
            <div className={s.history}>
              <p>
                Probieren Sie eine Freigabe oder Rückfrage aus. Ihre
                Beispielaktionen erscheinen hier.
              </p>
              {events.map((event, i) => (
                <article key={i}>
                  <span className={s.eventDot} />
                  <div>
                    <h4>{event.title}</h4>
                    <p>{event.detail}</p>
                  </div>
                  <small>Jetzt</small>
                </article>
              ))}
              <article>
                <span className={s.eventDot} />
                <div>
                  <h4>Beispielvorgang erfasst</h4>
                  <p>
                    Eingabedaten zugeordnet und für die Prüfung vorbereitet.
                  </p>
                </div>
                <small>Beispiel</small>
              </article>
            </div>
          ) : isReport ? (
            <>
              {hasView("kpi-cards") && (
                <>
                  <p className={s.exampleLabel}>
                    ILLUSTRATIVE KENNZAHLEN · BEISPIELDATEN
                  </p>
                  <div className={s.kpis}>
                    <article>
                      <span>Datenquellen</span>
                      <strong>
                        3 <small>Dateien</small>
                      </strong>
                      <Status>Zusammengeführt</Status>
                    </article>
                    <article>
                      <span>Zahlenprüfung</span>
                      <strong>{checked ? "12/12" : "11/12"}</strong>
                      <Status tone={checked ? "green" : "amber"}>
                        {checked ? "Prüfung bestätigt" : "1 Wert prüfen"}
                      </Status>
                    </article>
                    <article>
                      <span>Berichtsstatus</span>
                      <strong>{resolved ? "Freigegeben" : "Entwurf"}</strong>
                      <Status tone={resolved ? "green" : "gray"}>
                        {resolved
                          ? "Beispiel freigegeben"
                          : "Ihre Entscheidung"}
                      </Status>
                    </article>
                  </div>
                </>
              )}
              <div
                className={`${s.reportGrid} ${!showOutput || !showComparison ? s.singleColumn : ""}`}
              >
                {showComparison && (
                  <section className={s.panel}>
                    <div className={s.panelHead}>
                      <h4>Zahlen & Quellen</h4>
                      <span>Beispieldaten</span>
                    </div>
                    <div className={s.reportRow}>
                      <div>
                        Umsatz<small>Finanzdaten.xlsx · Zeile 24</small>
                      </div>
                      <strong>248.000 €</strong>
                      <span className={s.check}>✓</span>
                    </div>
                    <div className={s.reportRow}>
                      <div>
                        Auftragseingang<small>Vertrieb.xlsx · Zeile 18</small>
                      </div>
                      <strong>312.000 €</strong>
                      <span className={s.check}>✓</span>
                    </div>
                    <div className={`${s.reportRow} ${s.highlightRow}`}>
                      <div>
                        Deckungsbeitrag
                        <small>Zuordnung eines Werts prüfen</small>
                      </div>
                      <strong>28,7 %</strong>
                      <span>{checked ? "✓" : "!"}</span>
                    </div>
                    <button
                      type="button"
                      className={s.secondary}
                      disabled={checked}
                      onClick={() => {
                        setChecked(true);
                        addEvent(
                          "Zahlenprüfung bestätigt",
                          "Deckungsbeitrag im Beispiel geprüft",
                        );
                      }}
                    >
                      {checked
                        ? "Prüfung bestätigt ✓"
                        : "Wert im Beispiel bestätigen"}
                    </button>
                  </section>
                )}
                {showOutput && (
                  <section className={`${s.panel} ${s.reportPreview}`}>
                    <div className={s.paper}>
                      <span>MANAGEMENT REPORT</span>
                      <h4>
                        Das Wesentliche.
                        <br />
                        Auf einen Blick.
                      </h4>
                      <div
                        className={s.chart}
                        aria-label="Illustrative Umsatzentwicklung"
                      >
                        <i style={{ height: "36%" }} />
                        <i style={{ height: "58%" }} />
                        <i style={{ height: "48%" }} />
                        <i style={{ height: "73%" }} />
                        <i style={{ height: "92%" }} />
                      </div>
                      <p>
                        Zusammengeführte Kennzahlen, nachvollziehbare Quellen
                        und markierte Abweichungen.
                      </p>
                      <span className={s.paperFoot}>
                        BERICHTSVORSCHAU · BEISPIEL
                      </span>
                    </div>
                  </section>
                )}
                {!showOutput && !showComparison && (
                  <section className={s.genericRecord}>
                    <span>GEWÜNSCHTES ERGEBNIS</span>
                    <h4>
                      {blueprint.outputs[0] || "Ein nachvollziehbarer Bericht"}
                    </h4>
                    <p>{blueprint.summary}</p>
                  </section>
                )}
              </div>
              {showApproval && (
                <div className={s.actionBar}>
                  <div>
                    <strong>
                      {resolved
                        ? "Bericht im Beispiel freigegeben"
                        : "Ihr Team gibt den Bericht frei."}
                    </strong>
                    <p>
                      {resolved
                        ? "In der echten Anwendung folgt der vereinbarte Ausgabeprozess."
                        : "Zahlen und Interpretation bleiben fachlich überprüfbar."}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={s.primary}
                    disabled={resolved || (showComparison && !checked)}
                    onClick={approve}
                  >
                    {resolved
                      ? "Freigegeben ✓"
                      : checked || !showComparison
                        ? "Bericht freigeben →"
                        : "Zuerst Zahlen prüfen"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className={s.summary}>
                <div>
                  <span className={s.summaryDot} />
                  <strong>
                    {resolved
                      ? "Beispielentscheidung dokumentiert"
                      : showApproval
                        ? "Eine Entscheidung braucht Ihr Team."
                        : "Ihr Prozess. In einer Anwendung."}
                  </strong>
                  <p>
                    {isComplaint
                      ? "Nachweise und Antwortentwurf liegen bereit."
                      : isPurchase
                        ? "Preise, Mengen und Liefertermine sind gegenübergestellt."
                        : "Informationen gebündelt. Nächster Schritt vorbereitet."}
                  </p>
                </div>
                <Status tone={resolved ? "green" : "amber"}>
                  {resolved
                    ? "Freigegeben"
                    : showApproval
                      ? "Freigabe offen"
                      : "Beispielvorgang"}
                </Status>
              </div>
              <div className={s.workGrid}>
                <section className={s.queue}>
                  <div className={s.panelHead}>
                    <h4>
                      {isComplaint ? "Reklamationen" : "Eingegangene Vorgänge"}
                    </h4>
                    <span>Beispieldaten</span>
                  </div>
                  {titles.map((title, i) => (
                    <button
                      type="button"
                      key={title}
                      onClick={() => setSelected(i)}
                      aria-pressed={selected === i}
                      className={s.queueRow}
                    >
                      <span className={s.docIcon}>
                        {isComplaint ? "↩" : "▤"}
                      </span>
                      <span>
                        <strong>{title}</strong>
                        <small>
                          {isComplaint
                            ? [
                                "Foto + Lieferschein",
                                "Positionsvergleich",
                                "Freigabe erforderlich",
                              ][i]
                            : isPurchase
                              ? [
                                  "Preis- und Terminabweichung",
                                  "Ohne Abweichung",
                                  "Liefertermin prüfen",
                                ][i]
                              : [
                                  "Freigabe erforderlich",
                                  "Prüfung abgeschlossen",
                                  "Information ergänzen",
                                ][i]}
                        </small>
                      </span>
                      <span
                        className={
                          i === 1 || resolvedItems.includes(i)
                            ? s.queueCheck
                            : s.queueAlert
                        }
                      >
                        {i === 1 || resolvedItems.includes(i) ? "✓" : "!"}
                      </span>
                    </button>
                  ))}
                </section>
                <section className={s.detail}>
                  <div className={s.panelHead}>
                    <h4>{titles[selected]}</h4>
                    <Status
                      tone={selected === 1 || resolved ? "green" : "amber"}
                    >
                      {selected === 1
                        ? "Geprüft"
                        : resolved
                          ? "Freigegeben"
                          : "Zur Entscheidung"}
                    </Status>
                  </div>
                  {isPurchase && showComparison ? (
                    <>
                      <div className={s.tableWrap}>
                        <table>
                          <thead>
                            <tr>
                              <th>Prüfung</th>
                              <th>Bestellung</th>
                              <th>Bestätigung</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className={selected === 0 ? s.tableAlert : ""}>
                              <th>Einzelpreis</th>
                              <td>48,00 €</td>
                              <td>
                                {selected === 0 ? "50,00 €" : "48,00 €"}
                                {selected === 0 && <small>+ 4,2 %</small>}
                              </td>
                            </tr>
                            <tr>
                              <th>Menge</th>
                              <td>120 Stk.</td>
                              <td>
                                120 Stk. <span className={s.check}>✓</span>
                              </td>
                            </tr>
                            <tr className={selected !== 1 ? s.tableAlert : ""}>
                              <th>Lieferung</th>
                              <td>14. Okt.</td>
                              <td>
                                {selected === 1 ? "14. Okt. ✓" : "19. Okt."}
                                {selected !== 1 && <small>+ 5 Tage</small>}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {hasView("document-viewer") && (
                        <>
                          <button
                            type="button"
                            className={s.evidence}
                            aria-expanded={documentOpen}
                            onClick={() => setDocumentOpen(!documentOpen)}
                          >
                            <span>▤</span>
                            <div>
                              <strong>Bestätigung.pdf</strong>
                              <small>Preis · Seite 1, Position 2</small>
                            </div>
                            <span>{documentOpen ? "−" : "+"}</span>
                          </button>
                          {documentOpen && (
                            <div className={s.document}>
                              <span>BEISPIELDOKUMENT · SEITE 1</span>
                              <h4>Auftragsbestätigung {titles[selected]}</h4>
                              <p>
                                Position 2 · Bauteil A<br />
                                Menge: 120 Stück
                                <br />
                                <mark>
                                  Einzelpreis:{" "}
                                  {selected === 0 ? "50,00" : "48,00"} EUR
                                </mark>
                                <br />
                                Lieferung: {selected === 1 ? "14." : "19."}{" "}
                                Oktober
                              </p>
                              <small>
                                Markierte Quelle des Vergleichswerts.
                              </small>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  ) : isComplaint ? (
                    <>
                      {!hasView("document-viewer") &&
                        !showOutput &&
                        !showApproval && (
                          <div className={s.genericRecord}>
                            <span>VORGANGSÜBERSICHT</span>
                            <h4>
                              {blueprint.outputs[0] ||
                                "Reklamation strukturiert bearbeiten"}
                            </h4>
                            <p>{blueprint.summary}</p>
                          </div>
                        )}
                      {hasView("document-viewer") && (
                        <div className={s.evidenceGrid}>
                          <div>
                            <span>▧</span>
                            <strong>Lieferfoto</strong>
                            <small>Beschädigung dokumentiert</small>
                          </div>
                          <div>
                            <span>▤</span>
                            <strong>Lieferschein</strong>
                            <small>Position zugeordnet</small>
                          </div>
                        </div>
                      )}
                      {(showOutput || showApproval) && (
                        <div className={s.reply}>
                          <span>VORBEREITETER ANTWORTENTWURF</span>
                          <p>
                            {selected === 0
                              ? "Vielen Dank für Ihre Nachricht. Die Fotos und die betroffene Lieferung wurden zugeordnet. Wir prüfen die Ersatzlieferung und melden uns mit dem nächsten Schritt."
                              : selected === 1
                                ? "Vielen Dank für den Hinweis. Wir gleichen die fehlende Position mit Ihrer Bestellung und dem Lieferschein ab."
                                : "Der Vorgang wurde geprüft. Die weitere Bearbeitung wird mit der zuständigen Person abgestimmt."}
                          </p>
                          <small>Versand erst nach fachlicher Freigabe.</small>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className={s.genericRecord}>
                        <span>GEWÜNSCHTES ERGEBNIS</span>
                        <h4>
                          {blueprint.outputs[0] ||
                            "Ein geprüfter, nachvollziehbarer Vorgang"}
                        </h4>
                        <p>
                          {blueprint.dataObjects.slice(0, 3).join(" · ") ||
                            "Eingabedaten, Prüfergebnis und Entscheidung in einer Ansicht."}
                        </p>
                      </div>
                      <div className={s.taskList}>
                        {(blueprint.actions.length
                          ? blueprint.actions
                          : [
                              "Daten erfassen",
                              "Vorgang prüfen",
                              "Entscheidung vorbereiten",
                            ]
                        )
                          .slice(0, 3)
                          .map((action, i) => (
                            <div key={i}>
                              <span>{i < 2 ? "✓" : "○"}</span>
                              {action}
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                  {showApproval && (
                    <div className={s.decision} aria-live="polite">
                      <p>
                        {selected === 1
                          ? "Dieser Beispielvorgang ist geprüft. Wählen Sie einen offenen Vorgang aus."
                          : resolved
                            ? "Ihre Freigabe ist im Beispiel dokumentiert."
                            : clarified
                              ? "Rückfrage vorbereitet. Es wurde nichts versendet."
                              : blueprint.approvals[0] ||
                                "Ihr Team entscheidet über Abweichungen."}
                      </p>
                      <div>
                        <button
                          type="button"
                          className={s.primary}
                          disabled={resolved || selected === 1}
                          onClick={approve}
                        >
                          {resolved
                            ? "Freigegeben ✓"
                            : isComplaint
                              ? "Antwort freigeben"
                              : "Freigeben"}
                        </button>
                        <button
                          type="button"
                          className={s.secondary}
                          disabled={resolved || clarified || selected === 1}
                          onClick={clarify}
                        >
                          {clarified
                            ? "Rückfrage vorbereitet ✓"
                            : "Rückfrage vorbereiten"}
                        </button>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </>
          )}
          <div className={s.appFooter}>
            <span>●</span> Vorläufiger Oberflächenentwurf mit fiktiven
            Beispieldaten. Aktionen gelten nur in dieser Vorschau.
          </div>
        </div>
      </div>
    </div>
  );
}
