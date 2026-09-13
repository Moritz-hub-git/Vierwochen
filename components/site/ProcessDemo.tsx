"use client";
import { useState } from "react";
import { Arrow, Check, Mark, ProcessIcon } from "./Icons";
export default function ProcessDemo() {
  const [mode, setMode] = useState<"standard" | "exception">("standard");
  const exception = mode === "exception";
  return (
    <div className="process-demo">
      <div className="demo-topline">
        <span>
          <span className="status-dot" /> EIN PROZESS. ERLEDIGT.
        </span>
        <span>Beispiel: Einkauf</span>
      </div>
      <div className="demo-stage">
        <div className="input-card">
          <div className="file-symbol">
            <ProcessIcon />
          </div>
          <div>
            <strong>Auftragsbestätigung.pdf</strong>
            <span>Eingang per E-Mail</span>
          </div>
          <span className="file-tag">PDF</span>
        </div>
        <div className="flow-connector">
          <span />
        </div>
        <div className="automation-node">
          <Mark />
          <span>Opsrid</span>
          <span className="processing-label">Prüfen & abgleichen</span>
        </div>
        <div className="check-panel">
          <div>
            <span>Artikel & Menge</span>
            <span className="check-positive">
              <Check /> Stimmen überein
            </span>
          </div>
          <div>
            <span>Preis</span>
            <span className="check-positive">
              <Check /> Wie bestellt
            </span>
          </div>
          <div>
            <span>Liefertermin</span>
            <span className={exception ? "check-warning" : "check-positive"}>
              {exception ? (
                "!  3 Tage später"
              ) : (
                <>
                  <Check /> Im Zeitfenster
                </>
              )}
            </span>
          </div>
        </div>
        <div className="flow-connector short">
          <span />
        </div>
        <div
          className={`result-node ${exception ? "result-exception" : ""}`}
          role="status"
        >
          <div className="result-symbol">{exception ? "!" : <Check />}</div>
          <div>
            <strong>
              {exception
                ? "Eine Entscheidung für Ihr Team."
                : "Geprüft. Übernommen. Erledigt."}
            </strong>
            <span>
              {exception
                ? "Abweichung mit Kontext zur Freigabe."
                : "Standardfall ohne manuelle Bearbeitung."}
            </span>
          </div>
          <Arrow />
        </div>
      </div>
      <div className="demo-bottom">
        <span>Prozessbeispiel erkunden</span>
        <div className="demo-toggle" aria-label="Prozessbeispiel">
          <button
            type="button"
            aria-pressed={!exception}
            onClick={() => setMode("standard")}
          >
            Standardfall
          </button>
          <button
            type="button"
            aria-pressed={exception}
            onClick={() => setMode("exception")}
          >
            Ausnahme
          </button>
        </div>
      </div>
    </div>
  );
}
