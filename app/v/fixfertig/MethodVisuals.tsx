import { Fragment } from "react";
import s from "./styles.module.css";

/**
 * Fünf grafische Darstellungen derselben 2+AI-Methode — eine pro
 * Landing-Variante. Alle erzählen dieselben zwei Argumente:
 * 1. Weniger Köpfe, kürzerer Weg → schneller.
 * 2. Wer die Anforderung bespricht, schreibt auch den Code → an der
 *    Schnittstelle geht nichts verloren, das Ergebnis ist näher dran.
 */

const OLD_CHAIN = [
  "Sie",
  "Produktmanager",
  "Anforderungsliste",
  "UX-Design",
  "Dev-Team",
  "Testrunden",
];

function MiniLive() {
  return (
    <span className={s.miniLive}>
      <i aria-hidden /> live
    </span>
  );
}

/* ---------- 1 · „Die zwei Wege": Kette gegen direkten Draht ---------- */

export function WegeVisual() {
  return (
    <div className={s.ways}>
      <div className={s.wayOld}>
        <div className={s.wayHead}>
          <span>Der klassische Weg</span>
          <b>≈ 6 Monate</b>
        </div>
        <div className={s.chainOld}>
          {OLD_CHAIN.map((step, i) => (
            <Fragment key={step}>
              {i > 0 && (
                <span className={s.chainLoss} title="Übergabe — hier geht Wissen verloren">
                  Übergabe
                </span>
              )}
              <span className={s.chainStop}>{step}</span>
            </Fragment>
          ))}
        </div>
        <p className={s.wayNote}>
          Fünf Übergaben. An jeder geht Wissen verloren — und niemand trägt
          das Ganze.
        </p>
        <span className={s.wayResult}>Ergebnis: ungefähr das, was mal besprochen wurde</span>
      </div>

      <div className={s.wayNew}>
        <div className={s.wayHead}>
          <span>2+AI</span>
          <b>4 Wochen</b>
        </div>
        <div className={s.chainNew}>
          <span className={s.chainYou}>Sie</span>
          <span className={s.chainArrow} aria-hidden>
            →
          </span>
          <span className={s.builderCard}>
            <b>Einer, der beides kann</b>
            <i>versteht Ihr Geschäft · schreibt den Code</i>
            <em className={s.aiBadge}>+ AI</em>
          </span>
          <span className={s.chainArrow} aria-hidden>
            →
          </span>
          <span className={s.chainProduct}>
            Ihr Produkt <MiniLive />
          </span>
        </div>
        <p className={s.wayNote}>
          Keine Übergabe: Wer mit Ihnen spricht, verantwortet auch den Code.
        </p>
        <span className={`${s.wayResult} ${s.wayResultNew}`}>Ergebnis: das, was Sie gemeint haben</span>
      </div>
    </div>
  );
}

/* ---------- 2 · „Die Gleichung": alte Summe durchgestrichen ---------- */

export function FormelVisual() {
  return (
    <div className={s.eq}>
      <p className={s.eqOld} aria-label="Die alte Rechnung, durchgestrichen">
        PM&nbsp;+&nbsp;UX&nbsp;+&nbsp;3&nbsp;Devs&nbsp;+&nbsp;QA&nbsp;+&nbsp;5&nbsp;Übergaben&nbsp;=&nbsp;6&nbsp;Monate
      </p>
      <p className={s.eqNew}>
        Sie&nbsp;+&nbsp;Einer,&nbsp;der&nbsp;baut&nbsp;+&nbsp;<span className={s.eqAi}>AI</span>
        &nbsp;=&nbsp;<span className={s.eqResult}>4&nbsp;Wochen&nbsp;<MiniLive /></span>
      </p>

      <div className={s.formula}>
        <div className={s.formulaCard}>
          <span className={s.formulaNum}>1</span>
          <b>Sie</b>
          <span>
            Sie kennen den Ablauf und entscheiden. Kein Lastenheft, kein Umweg
            über eine Projektleitung.
          </span>
        </div>
        <span className={s.formulaSign} aria-hidden>
          +
        </span>
        <div className={s.formulaCard}>
          <span className={s.formulaNum}>1</span>
          <b>Der, der baut</b>
          <span>
            Businessverständnis und Code in einem Kopf — die Anforderung geht
            vom Gespräch direkt in die Umsetzung.
          </span>
        </div>
        <span className={s.formulaSign} aria-hidden>
          +
        </span>
        <div className={`${s.formulaCard} ${s.formulaAi}`}>
          <span className={s.formulaNum}>AI</span>
          <b>Die Maschine</b>
          <span>
            Hundert Hände: tippen, testen, wiederholen — in Stunden statt
            Wochen, in Senior-Qualität geprüft.
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- 3 · „Ein Kopf": Venn aus Geschäft und Code, AI als Ring ---------- */

export function KernVisual() {
  return (
    <div className={s.vennWrap}>
      <svg viewBox="0 0 640 400" className={s.venn} role="img" aria-label="Businessverständnis und Code überschneiden sich in einem Kopf, AI verstärkt ihn">
        {/* AI-Orbit */}
        <ellipse cx="320" cy="205" rx="292" ry="168" fill="none" stroke="#4f46e5" strokeWidth="1.6" strokeDasharray="3 7" opacity="0.5" />
        <g transform="translate(320 22)">
          <rect x="-84" y="-14" width="168" height="30" rx="15" fill="#181a33" />
          <text x="0" y="6" textAnchor="middle" fontSize="14" fontWeight="700" fill="#d8f26e" fontFamily="inherit">✦ AI — hundert Hände</text>
        </g>

        {/* Venn */}
        <circle cx="245" cy="210" r="118" fill="#4f46e5" opacity="0.12" />
        <circle cx="245" cy="210" r="118" fill="none" stroke="#4f46e5" strokeWidth="2" />
        <circle cx="395" cy="210" r="118" fill="#ff6b5e" opacity="0.12" />
        <circle cx="395" cy="210" r="118" fill="none" stroke="#ff6b5e" strokeWidth="2" />

        <text x="190" y="150" textAnchor="middle" fontSize="17" fontWeight="700" fill="#3c3f5e" fontFamily="inherit">Ihr Geschäft</text>
        <text x="190" y="172" textAnchor="middle" fontSize="12.5" fill="#6a6d8c" fontFamily="inherit">Abläufe · Ziele · Alltag</text>
        <text x="452" y="150" textAnchor="middle" fontSize="17" fontWeight="700" fill="#3c3f5e" fontFamily="inherit">Der Code</text>
        <text x="452" y="172" textAnchor="middle" fontSize="12.5" fill="#6a6d8c" fontFamily="inherit">Architektur · Umsetzung</text>

        {/* Schnittmenge: alles im weißen Kern, damit nichts mit den
            Kreislinien kollidiert */}
        <g transform="translate(320 210)">
          <circle r="56" fill="#ffffff" />
          <circle r="56" fill="none" stroke="#181a33" strokeWidth="2" />
          <circle cx="0" cy="-22" r="8" fill="none" stroke="#181a33" strokeWidth="2.2" />
          <path d="M-13 8c2-10 6.5-14 13-14s11 4 13 14" fill="none" stroke="#181a33" strokeWidth="2.2" strokeLinecap="round" />
          <text x="0" y="30" textAnchor="middle" fontSize="15" fontWeight="800" fill="#181a33" fontFamily="inherit">Ein Kopf</text>
        </g>
        <g transform="translate(320 356)">
          <rect x="-138" y="-16" width="276" height="30" rx="15" fill="#ffffff" opacity="0.9" />
          <text x="0" y="4" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#3c3f5e" fontFamily="inherit">bespricht die Anforderung — und baut sie</text>
        </g>
      </svg>

      <div className={s.vennPoints}>
        <p>
          <b>Die Schnittstelle ist der Unterschied.</b> Klassisch übersetzen
          vier Rollen Ihr Problem, bis es beim Code ankommt — jede Übersetzung
          kostet. Hier gibt es nichts zu übersetzen.
        </p>
        <p>
          <b>AI ist der Verstärker.</b> Sie gibt dem einen Kopf hundert Hände:
          bauen, testen, wiederholen — er prüft und verantwortet jede Zeile.
        </p>
      </div>
    </div>
  );
}

/* ---------- 4 · „Featureboard": die Methode als iOS-Bento ---------- */

export function BentoVisual() {
  return (
    <div className={s.mBento}>
      <div className={`${s.mTile} ${s.mTileHero}`}>
        <div className={s.mDuo} aria-hidden>
          <span className={s.mAvatar}>Sie</span>
          <span className={s.mPlus}>+</span>
          <span className={s.mAvatarAlt}>Er baut</span>
          <span className={s.mPlus}>+</span>
          <span className={s.mChip}>✦ AI</span>
        </div>
        <b>Zwei Menschen. Ein Verstärker.</b>
        <p>Sie bringen das Problem, einer baut — AI gibt ihm hundert Hände.</p>
      </div>
      <div className={s.mTile}>
        <span className={s.mBig}>0</span>
        <b>Übergaben</b>
        <p>Wer die Anforderung hört, schreibt den Code — nichts geht verloren.</p>
      </div>
      <div className={`${s.mTile} ${s.mTileInk}`}>
        <span className={s.mBig}>Stunden</span>
        <b>statt Wochen</b>
        <p>AI tippt, testet, wiederholt — das ist der Takt einer Iteration.</p>
      </div>
      <div className={`${s.mTile} ${s.mTileIndigo}`}>
        <span className={s.mBig}>6×</span>
        <b>weniger Köpfe</b>
        <p>Weniger Ressourcen, kürzerer Weg — darum vier Wochen.</p>
      </div>
      <div className={`${s.mTile} ${s.mTileLime}`}>
        <span className={s.mBig}>Senior</span>
        <b>Qualität</b>
        <p>Jede Zeile geprüft von einem erfahrenen Kopf.</p>
      </div>
    </div>
  );
}

/* ---------- 5 · „Der Bauplan": Blueprint in Dunkel ---------- */

export function PlanVisual() {
  return (
    <div className={s.blueprint}>
      <div className={s.bpGrid} aria-hidden />
      <div className={s.bpRow}>
        <span className={s.bpLabel}>klassisch · ≈ 6 Monate</span>
        <div className={s.bpOldPath}>
          {OLD_CHAIN.map((step, i) => (
            <Fragment key={step}>
              {i > 0 && <span className={s.bpDash} aria-hidden />}
              <span className={s.bpNodeOld}>{step}</span>
            </Fragment>
          ))}
        </div>
      </div>
      <div className={s.bpRow}>
        <span className={`${s.bpLabel} ${s.bpLabelNew}`}>2+AI · 4 Wochen</span>
        <div className={s.bpNewPath}>
          <span className={s.bpNodeNew}>Sie</span>
          <span className={s.bpLine} aria-hidden />
          <span className={`${s.bpNodeNew} ${s.bpNodeCore}`}>
            Gespräch&nbsp;=&nbsp;Code
            <i>✦ AI baut · ein Kopf verantwortet</i>
          </span>
          <span className={s.bpLine} aria-hidden />
          <span className={`${s.bpNodeNew} ${s.bpNodeLive}`}>
            Ihr Produkt <MiniLive />
          </span>
        </div>
      </div>
      <p className={s.bpNote}>
        Der kurze Weg ist kein Sparprogramm — er ist der Grund für die
        Qualität: keine Übersetzungsverluste zwischen Idee und Umsetzung.
      </p>
    </div>
  );
}
