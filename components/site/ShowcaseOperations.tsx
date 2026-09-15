"use client";
import { useState } from "react";
import Icon from "./ShowcaseIcon";
import { AppFrame, DoneBar, downloadExample } from "./ShowcaseShared";
import s from "./Showcase.module.css";

const activities = [
  { count: 14, label: "Status-Updates eingesammelt", icon: "check" },
  { count: 8, label: "Voice-Updates eingepflegt", icon: "mic" },
  { count: 9, label: "Fehlende Updates nachgefasst", icon: "mail" },
  { count: 4, label: "Terminabweichungen erkannt", icon: "clock" },
  { count: 2, label: "Risiken eskaliert", icon: "case" },
  { count: 1, label: "Steering Report erstellt", icon: "report" },
] as const;
export function ProjectShowcase() {
  const [selected, setSelected] = useState<number | null>(null);
  const [resolved, setResolved] = useState<number[]>([]);
  const [report, setReport] = useState(false);
  const pending = 2 - resolved.length;
  return (
    <AppFrame name="Projekt-Cockpit">
      <div className={s.projectLayout}>
        <aside className={s.digest}>
          <p className={s.eyebrow}>Seit Ihrem letzten Besuch</p>
          <h3>
            Opsrid hat <strong>38 Aufgaben</strong> erledigt.
          </h3>
          <div className={s.activityList}>
            {activities.map((a, i) => (
              <div key={a.label} style={{ animationDelay: i * 100 + "ms" }}>
                <span className={s.activityIcon}>
                  <Icon name={a.icon} />
                </span>
                <b>{a.count}</b>
                <span>{a.label}</span>
                <Icon name="check" />
              </div>
            ))}
          </div>
          <span className={s.updated}>
            <i />
            Projektstand bereits aktualisiert
          </span>
        </aside>
        <div className={s.cockpit}>
          <div className={s.workspaceHeading}>
            <div>
              <p className={s.eyebrow}>Projekt H2-450</p>
              <h3>Alles im Blick.</h3>
            </div>
            <span className={s.statusAmber}>Abstimmung erforderlich</span>
          </div>
          <div className={s.projectMetrics}>
            <div>
              <small>Fortschritt</small>
              <b>
                68<span>%</span>
              </b>
              <i>
                <span style={{ width: "68%" }} />
              </i>
            </div>
            <div>
              <small>Nächster Meilenstein</small>
              <b>Pilotstart</b>
              <span>28. September · Operations</span>
            </div>
            <div>
              <small>Offene Risiken</small>
              <b>{resolved.includes(1) ? "1" : "2"}</b>
              <span>Zur Bewertung vorbereitet</span>
            </div>
          </div>
          <div className={s.gantt}>
            <header>
              <b>Projektplan</b>
              <span>September / Oktober · Beispieldaten</span>
            </header>
            <div className={s.ganttWeeks}>
              <span>Arbeitspaket</span>
              <span>KW 37</span>
              <span>KW 38</span>
              <span>KW 39</span>
              <span>KW 40</span>
            </div>
            {[
              ["Konzeption", "Produkt", 0, 40, "done"],
              ["Entwicklung", "Engineering", 20, 57, "progress"],
              ["Integration", "IT", 45, 40, "progress"],
              ["Pilotstart", "Operations", 70, 24, "risk"],
            ].map(([label, owner, left, width, state]) => (
              <div className={s.ganttRow} key={label}>
                <div>
                  <b>{label}</b>
                  <small>{owner}</small>
                </div>
                <div className={s.ganttTrack}>
                  <span
                    className={
                      state === "risk"
                        ? s.ganttRisk
                        : state === "done"
                          ? s.ganttDone
                          : s.ganttBar
                    }
                    style={{ left: left + "%", width: width + "%" }}
                  >
                    {state === "done" ? <Icon name="check" /> : label}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={s.decisionHeading}>
            <h4>
              {pending
                ? pending +
                  " " +
                  (pending === 1 ? "Ding braucht" : "Dinge brauchen") +
                  " Sie."
                : "Alles entschieden."}
            </h4>
            <button onClick={() => setReport(!report)} className={s.textButton}>
              <Icon name="report" />
              Steering Report
            </button>
          </div>
          {report && (
            <div className={s.inlinePanel}>
              <b>Steering Report · Entwurf</b>
              <p>
                Konzeption abgeschlossen. Integration läuft. Der Pilotstart
                benötigt eine Terminentscheidung; für das Lieferantenrisiko
                liegt eine Handlungsoption vor.
              </p>
              <small>
                Aus den Beispiel-Updates zusammengestellt · zur fachlichen
                Freigabe.
              </small>
            </div>
          )}
          <div className={s.projectDecisions}>
            {["Pilotstart freigeben", "Lieferantenrisiko bewerten"].map(
              (title, i) => (
                <button
                  key={title}
                  className={s.projectDecision}
                  aria-expanded={selected === i}
                  onClick={() => setSelected(selected === i ? null : i)}
                >
                  <span
                    className={
                      resolved.includes(i)
                        ? s.dotGreen
                        : i === 0
                          ? s.dotRed
                          : s.dotAmber
                    }
                  />
                  <div>
                    <small>
                      {resolved.includes(i)
                        ? "IN DER DEMO VORGEMERKT"
                        : i === 0
                          ? "TERMINENTSCHEIDUNG"
                          : "RISIKOBEWERTUNG"}
                    </small>
                    <b>{title}</b>
                  </div>
                  <Icon name={resolved.includes(i) ? "check" : "arrow"} />
                </button>
              ),
            )}
          </div>
          {selected !== null && (
            <div className={s.inlinePanel}>
              <b>
                {selected === 0
                  ? "Pilotstart: 28. September"
                  : "Risiko: verzögerte Komponentenlieferung"}
              </b>
              <p>
                {selected === 0
                  ? "Status-Updates und Abhängigkeiten sind abgeglichen. Der Termin kann bestätigt oder zur Abstimmung zurückgegeben werden."
                  : "Lieferstatus und Projektplan sind abgeglichen. Vorschlag: alternative Komponente prüfen und den Beschaffungstermin absichern."}
              </p>
              <button
                className={s.smallPrimary}
                onClick={() => {
                  setResolved((a) =>
                    a.includes(selected) ? a : [...a, selected],
                  );
                  setSelected(null);
                }}
              >
                Entscheidung vormerken · Demo
                <Icon name="check" />
              </button>
            </div>
          )}
        </div>
      </div>
      <DoneBar done="38 Aktionen erledigt" decisions={pending} />
    </AppFrame>
  );
}

const requests = [
  {
    label: "Lieferstatus",
    icon: "order",
    question: "Wann kommt meine Bestellung 4500321?",
  },
  {
    label: "Dokument finden",
    icon: "invoice",
    question: "Ich brauche das Zertifikat für Produkt X.",
  },
  {
    label: "Adresse ändern",
    icon: "user",
    question: "Kann ich meine Lieferadresse noch ändern?",
  },
] as const;
export function CustomerShowcase() {
  const [request, setRequest] = useState(0);
  const [address, setAddress] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState(
    "Vielen Dank für Ihre Rückfrage. Wir haben Ihre Bestellung und die Lieferdokumente geprüft. Für die gewünschte Teillieferung stimmen wir den Termin mit der Disposition ab und melden uns mit der bestätigten Lieferoption.",
  );
  return (
    <AppFrame name="Kundenplattform">
      <div className={s.portalLayout}>
        <div className={s.portal}>
          <div className={s.workspaceHeading}>
            <div>
              <p className={s.eyebrow}>Ihr Kundenbereich</p>
              <h3>Wie können wir helfen?</h3>
            </div>
            <span className={s.customerAvatar}>
              <Icon name="user" />
            </span>
          </div>
          <div className={s.requestTabs} aria-label="Beispielanliegen">
            {requests.map((r, i) => (
              <button
                key={r.label}
                aria-pressed={request === i}
                onClick={() => {
                  setRequest(i);
                  setEditing(false);
                }}
                className={request === i ? s.requestActive : ""}
              >
                <Icon name={r.icon} />
                {r.label}
              </button>
            ))}
          </div>
          <div className={s.portalConversation} key={request}>
            <div className={s.customerMessage}>
              {requests[request].question}
            </div>
            <div className={s.portalAnswer}>
              <span className={s.answerMark}>
                <Icon name="spark" />
              </span>
              <div>
                {request === 0 ? (
                  <>
                    <p>Ihre Bestellung ist unterwegs.</p>
                    <div className={s.deliveryCard}>
                      <div>
                        <Icon name="order" />
                        <span>
                          <small>BESTELLUNG 4500321</small>
                          <b>Zustellung am 18. September</b>
                        </span>
                      </div>
                      <div className={s.deliveryProgress}>
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className={s.deliveryLabels}>
                        <span>Bestätigt</span>
                        <span>Versendet</span>
                        <span>Unterwegs</span>
                      </div>
                      <details>
                        <summary>Tracking ansehen</summary>
                        <p>
                          Beispielverlauf: 16.09. versendet · 17.09. im
                          Verteilzentrum · erwartete Zustellung 18.09.
                        </p>
                      </details>
                    </div>
                  </>
                ) : request === 1 ? (
                  <>
                    <p>Das passende Dokument liegt bereit.</p>
                    <div className={s.certificate}>
                      <Icon name="invoice" />
                      <div>
                        <b>Produkt X · Zertifikat</b>
                        <small>Musteransicht · kein gültiges Zertifikat</small>
                      </div>
                      <button
                        aria-label="Beispieldokument herunterladen"
                        onClick={() =>
                          downloadExample(
                            "Produkt-X-Muster.html",
                            "<!doctype html><html lang='de'><meta charset='utf-8'><title>Produkt X – Muster</title><h1>Illustratives Dokumentenmuster</h1><p>Dies ist kein gültiges Zertifikat und kein Nachweis einer Produkteigenschaft. Es demonstriert ausschließlich den Dokumentendownload im Opsrid-Showcase.</p></html>",
                          )
                        }
                      >
                        <Icon name="download" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      {address
                        ? "Die Beispieladresse wurde geändert."
                        : "Ja. Diese Beispielbestellung ist noch nicht versendet."}
                    </p>
                    {editing ? (
                      <form
                        className={s.addressForm}
                        onSubmit={(e) => {
                          e.preventDefault();
                          setAddress(true);
                          setEditing(false);
                        }}
                      >
                        <label>
                          Straße
                          <input
                            required
                            defaultValue="Musterstraße 12"
                            maxLength={100}
                          />
                        </label>
                        <label>
                          Ort
                          <input
                            required
                            defaultValue="12345 Musterstadt"
                            maxLength={100}
                          />
                        </label>
                        <button className={s.smallPrimary}>
                          Änderung simulieren
                          <Icon name="check" />
                        </button>
                      </form>
                    ) : (
                      <button
                        className={s.smallPrimary}
                        onClick={() => setEditing(true)}
                      >
                        {address
                          ? "Beispieladresse bearbeiten"
                          : "Lieferadresse ändern"}
                        <Icon name="arrow" />
                      </button>
                    )}
                    <small className={s.demoHint}>
                      Demo-Eingabe · keine echte Bestellung wird verändert.
                    </small>
                  </>
                )}
              </div>
            </div>
            <div className={s.resolvedNote}>
              <Icon name="check" />
              {request === 2 && !address
                ? "Änderung direkt im Kundenbereich möglich"
                : "Ohne Servicekontakt gelöst"}
            </div>
          </div>
        </div>
        <aside className={s.serviceOverview}>
          <p className={s.eyebrow}>Heute bereits gelöst</p>
          <div className={s.bigPortalNumber}>
            147<span>ohne Servicekontakt</span>
          </div>
          <div className={s.serviceDivider} />
          <p className={s.eyebrow}>Ihr Team braucht es noch bei</p>
          <div className={s.serviceNumber}>
            {sent ? 11 : 12}
            <span>Anliegen</span>
          </div>
          <button
            className={s.serviceCase}
            onClick={() => setDraft(!draft)}
            aria-expanded={draft}
          >
            <span className={s.dotAmber} />
            <div>
              <small>
                {sent
                  ? "IN DER DEMO BEANTWORTET"
                  : "ANTWORT BEREITS VORBEREITET"}
              </small>
              <b>Teillieferung abstimmen</b>
              <span>Bestellung 4500368</span>
            </div>
            <Icon name="arrow" />
          </button>
          <p className={s.serviceCaption}>
            Die Routine ist erledigt.
            <br />
            Der Sonderfall ist vorbereitet.
          </p>
        </aside>
      </div>
      {draft && (
        <div className={s.draftPanel}>
          <div>
            <p className={s.eyebrow}>Für Ihr Serviceteam vorbereitet</p>
            <h4>Ein Sonderfall. Alle Informationen.</h4>
            <div className={s.contextChips}>
              {["Kundendaten", "Bestellhistorie", "Lieferdokumente"].map(
                (v) => (
                  <span key={v}>
                    <Icon name="check" />
                    {v} geladen
                  </span>
                ),
              )}
            </div>
          </div>
          <div>
            <label htmlFor="customer-draft">Antwortentwurf</label>
            <textarea
              id="customer-draft"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              maxLength={1000}
            />
            <button
              className={s.smallPrimary}
              disabled={sent || !message.trim()}
              onClick={() => setSent(true)}
            >
              {sent ? "In der Demo beantwortet" : "Senden · Demo"}
              <Icon name={sent ? "check" : "send"} />
            </button>
            <small className={s.demoHint} role="status">
              {sent
                ? "Es wurde keine Nachricht versendet."
                : "Demo: Kein Versand an echte Kunden."}
            </small>
          </div>
        </div>
      )}
      <DoneBar
        done="147 Anliegen ohne Servicekontakt erledigt"
        decisions={sent ? 11 : 12}
      />
    </AppFrame>
  );
}
