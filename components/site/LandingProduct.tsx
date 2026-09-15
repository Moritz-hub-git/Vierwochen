"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "./ShowcaseIcon";
import { ProjectShowcase, CustomerShowcase } from "./ShowcaseOperations";
import { DocumentShowcase } from "./ShowcaseDocuments";
import { EconomicsShowcase } from "./ShowcaseEconomics";
import s from "./Showcase.module.css";

const examples = [
  {
    id: "project",
    icon: "folder",
    label: "Projektmanagement",
    title: "Projekte, die sich fast selbst managen.",
    intro:
      "Updates einsammeln, nachfassen, Berichte erstellen: erledigt. Sie kümmern sich um die Entscheidungen.",
    impact: "Bis zu 90 % weniger Koordinations- und Reportingaufwand",
    benefit: "Mehr Transparenz. Mehr Ownership. Weniger Hinterherlaufen.",
    prompt:
      "Wir möchten Projektstatus, Voice-Updates, Terminabweichungen und Risiken automatisch zusammenführen, nachfassen und Steering Reports vorbereiten.",
  },
  {
    id: "customer",
    icon: "case",
    label: "Kundenplattform",
    title: "Ihre Kunden brauchen Sie seltener. Und bekommen schneller Hilfe.",
    intro:
      "Lieferstatus, Dokumente, Änderungen: direkt gelöst. Ihr Team übernimmt die vorbereiteten Sonderfälle.",
    impact:
      "Bis zu 70 % Self-Service · bis zu 60 % schnellere Antworten beim Rest",
    benefit:
      "Weniger Unterbrechungen. Mehr Zeit für die Anliegen, die Sie brauchen.",
    prompt:
      "Wir möchten eine Kundenplattform, die Lieferstatus, Dokumentenanfragen und Änderungen selbst erledigt und unserem Serviceteam Sonderfälle mit Antwortentwürfen vorbereitet.",
  },
  {
    id: "documents",
    icon: "invoice",
    label: "Dokumentenerstellung",
    title: "Aus fünf Angaben wird ein fertiges Dokument.",
    intro:
      "Vom ersten Datenpunkt bis zum passenden Anhang. Ihr Team prüft, was wirklich eine Freigabe braucht.",
    impact: "60–80 % weniger Erstellungsaufwand",
    benefit:
      "Weniger Fehler. Einheitliche Qualität. Ein Ergebnis statt Copy-and-paste.",
    prompt:
      "Wir möchten Angebote, Verträge, Berichte und Spezifikationen aus wenigen Angaben und bestehenden Daten automatisch vorbereiten und gezielt freigeben.",
  },
  {
    id: "economics",
    icon: "report",
    label: "Wirtschaftlichkeitsrechner",
    title: "Von Annahmen zur Entscheidung – ohne Excel-Modell.",
    intro:
      "Annahmen ändern. Auswirkungen verstehen. Szenarien vergleichen. Die Rechenarbeit ist bereits erledigt.",
    impact: "Berechnen, vergleichen und visualisieren in einem Schritt",
    benefit:
      "Keine Formeln suchen. Keine Charts neu bauen. Keine Dateiversionen verschicken.",
    prompt:
      "Wir möchten unsere Wirtschaftlichkeitsberechnungen, Sensitivitäten und Szenarienvergleiche aus Excel in eine individuelle Entscheidungsplattform überführen.",
  },
] as const;
const scenes = [
  ProjectShowcase,
  CustomerShowcase,
  DocumentShowcase,
  EconomicsShowcase,
];

export default function LandingProduct() {
  const [active, setActive] = useState(0),
    [paused, setPaused] = useState(false),
    [hover, setHover] = useState(false),
    [visible, setVisible] = useState(false),
    [reduced, setReduced] = useState(true);
  const root = useRef<HTMLElement>(null),
    tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    const tab = tabs.current[active],
      row = tab?.parentElement;
    if (tab && row && row.scrollWidth > row.clientWidth)
      row.scrollTo({
        left:
          tab.offsetLeft -
          row.offsetLeft -
          (row.clientWidth - tab.offsetWidth) / 2,
        behavior: reduced ? "instant" : "smooth",
      });
  }, [active, reduced]);
  useEffect(() => {
    if (paused || hover || !visible || reduced) return;
    const timer = setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % 4);
    }, 20000);
    return () => clearInterval(timer);
  }, [active, paused, hover, visible, reduced]);
  function choose(index: number) {
    setActive(index);
    setPaused(true);
  }
  return (
    <section
      ref={root}
      id="beispiel"
      className={s.section}
      aria-label="Anwendungsbeispiele"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setPaused(true)}
    >
      <div className={s.picker}>
        <h2>Beispiele:</h2>
        <div className={s.tabs} role="tablist" aria-label="Anwendung auswählen">
          {examples.map((example, i) => (
            <button
              key={example.id}
              ref={(node) => {
                tabs.current[i] = node;
              }}
              id={"tab-" + example.id}
              role="tab"
              aria-selected={active === i}
              aria-controls={"showcase-" + example.id}
              tabIndex={active === i ? 0 : -1}
              className={active === i ? s.activeTab : ""}
              onClick={() => choose(i)}
              onKeyDown={(e) => {
                const next =
                  e.key === "ArrowRight"
                    ? (i + 1) % 4
                    : e.key === "ArrowLeft"
                      ? (i + 3) % 4
                      : e.key === "Home"
                        ? 0
                        : e.key === "End"
                          ? 3
                          : -1;
                if (next >= 0) {
                  e.preventDefault();
                  choose(next);
                  tabs.current[next]?.focus();
                }
              }}
            >
              <Icon name={example.icon} />
              {example.label}
            </button>
          ))}
        </div>
        <button
          className={s.pause}
          aria-label={
            paused
              ? "Automatischen Wechsel starten"
              : "Automatischen Wechsel pausieren"
          }
          onClick={() => setPaused(!paused)}
        >
          <Icon name={paused ? "play" : "pause"} />
        </button>
      </div>
      {examples.map((example, i) => {
        const Scene = scenes[i];
        return (
          <div
            className={s.panel}
            role="tabpanel"
            id={"showcase-" + example.id}
            aria-labelledby={"tab-" + example.id}
            hidden={active !== i}
            key={example.id}
          >
            <header className={s.intro}>
              <span className={s.eyebrow}>
                0{i + 1} / SOFTWARE ERLEDIGT ARBEIT.
              </span>
              <h2>{example.title}</h2>
              <p>{example.intro}</p>
            </header>
            <div className={s.stage}>
              <Scene />
            </div>
            <div className={s.impact}>
              <div>
                <span className={s.eyebrow}>
                  {i === 3
                    ? "WAS DIE ANWENDUNG ÜBERNIMMT"
                    : "ILLUSTRATIVES ENTLASTUNGSZIEL"}
                </span>
                <h3>{example.impact}</h3>
                <p>{example.benefit}</p>
              </div>
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("opsrid:chat", {
                      detail: { text: example.prompt, submit: true },
                    }),
                  )
                }
              >
                Das möchte ich für mein Unternehmen
                <Icon name="arrow" />
              </button>
            </div>
            <p className={s.disclaimer}>
              {i === 3
                ? "Vereinfachtes Rechenbeispiel mit offengelegten Annahmen."
                : "Beispieldaten und illustrative Zielwerte, keine gemessenen Kundenergebnisse."}{" "}
              Der tatsächliche Umfang und Nutzen werden anhand Ihres Prozesses
              geprüft.
            </p>
          </div>
        );
      })}
    </section>
  );
}
