import s from "./styles.module.css";

/**
 * „Und danach?" — die zwei unterschätzten Argumente, je Variante anders
 * dargestellt: (1) Änderungen bleiben nach dem Go-live so schnell wie der
 * Anfang (kein Ticket-Ping-Pong), (2) durch den Festpreis werden Probleme
 * wirtschaftlich, die für klassische Projekte immer zu klein waren.
 */

function MiniLive() {
  return (
    <span className={s.miniLive}>
      <i aria-hidden /> live
    </span>
  );
}

/* ---------- 1 · wege: die Änderung als zwei Ketten ---------- */

export function AfterWege() {
  return (
    <div className={s.afterGrid}>
      <div className={s.afterCard}>
        <span className={s.afterLabel}>Eine Änderung, klassisch</span>
        <div className={s.chainOld}>
          <span className={s.chainStop}>Ticket</span>
          <span className={s.chainLoss}>warten</span>
          <span className={s.chainStop}>Angebot</span>
          <span className={s.chainLoss}>warten</span>
          <span className={s.chainStop}>3 Wochen später</span>
          <span className={s.chainLoss}>Rechnung</span>
        </div>
        <p className={s.wayNote}>
          Der Dienstleister muss sich erst wieder eindenken — das zahlen Sie
          jedes Mal mit.
        </p>
      </div>
      <div className={`${s.afterCard} ${s.afterCardDark}`}>
        <span className={s.afterLabel}>Eine Änderung, hier</span>
        <div className={s.chainNew}>
          <span className={s.chainYou}>Ihr Anruf</span>
          <span className={s.chainArrow} aria-hidden>→</span>
          <span className={s.chainProduct}>
            meist am nächsten Tag <MiniLive />
          </span>
        </div>
        <p className={s.wayNote}>
          Der Kopf, der Ihr System gebaut hat, plus AI — nichts muss neu
          verstanden werden. Darum lohnt Software jetzt auch für Probleme, die
          früher „zu klein" dafür waren.
        </p>
      </div>
    </div>
  );
}

/* ---------- 2 · formel: zwei kleine Gleichungen ---------- */

export function AfterFormel() {
  return (
    <div className={s.eq}>
      <p className={s.eqOld}>
        Änderung&nbsp;=&nbsp;Ticket&nbsp;+&nbsp;Warteschlange&nbsp;+&nbsp;3&nbsp;Wochen&nbsp;+&nbsp;Rechnung
      </p>
      <p className={`${s.eqNew} ${s.eqSmall}`}>
        Änderung&nbsp;=&nbsp;ein&nbsp;Anruf&nbsp;+&nbsp;<span className={s.eqResult}>meist&nbsp;ein&nbsp;Tag</span>
      </p>
      <p className={`${s.eqNew} ${s.eqSmall}`}>
        Lohnt&nbsp;sich&nbsp;=&nbsp;ab&nbsp;dem&nbsp;Problem,&nbsp;das&nbsp;
        <span className={s.eqResult}>2&nbsp;Stunden&nbsp;pro&nbsp;Woche</span>&nbsp;kostet
      </p>
      <p className={s.afterNote}>
        Software ist nie fertig — entscheidend ist, was die Änderung danach
        kostet. Und weil sie hier fast nichts kostet, rechnet sich Software
        schon bei Problemen, die für klassische Projekte immer zu klein waren.
      </p>
    </div>
  );
}

/* ---------- 3 · kern: zwei Karten im Venn-Stil ---------- */

export function AfterKern() {
  return (
    <div className={s.vennPoints}>
      <p>
        <b>Danach bleibt es schnell.</b> Der Kopf, der Ihr System gebaut hat,
        kennt es — und Ihr Geschäft. Eine Anpassung ist ein Anruf und meist
        ein Tag, kein Ticket und drei Wochen. Auf Wunsch inklusive Betrieb.
      </p>
      <p>
        <b>Endlich wirtschaftlich.</b> Ab 9.500 € Festpreis lohnt Software
        auch für das Problem, das „nur" zwei Stunden pro Woche frisst — für
        das es nie ein klassisches Projekt gegeben hätte.
      </p>
    </div>
  );
}

/* ---------- 4 · bento: zwei Kennzahl-Kacheln ---------- */

export function AfterBento() {
  return (
    <div className={s.after2}>
      <div className={`${s.mTile} ${s.mTileInk}`}>
        <span className={s.mBig}>1 Anruf</span>
        <b>statt Ticket &amp; drei Wochen</b>
        <p>
          Änderungen bleiben nach dem Go-live so schnell wie der Anfang — der
          Kopf, der gebaut hat, plus AI, nichts muss neu verstanden werden.
        </p>
      </div>
      <div className={s.mTile}>
        <span className={s.mBig}>ab 9.500 €</span>
        <b>Probleme, die „zu klein" waren</b>
        <p>
          Zum Festpreis lohnt Software schon ab dem Ablauf, der zwei Stunden
          pro Woche kostet — dafür gab es nie ein klassisches Projekt.
        </p>
      </div>
    </div>
  );
}

/* ---------- 5 · plan: Blueprint-Anhang ---------- */

export function AfterPlan() {
  return (
    <div className={s.blueprint}>
      <div className={s.bpGrid} aria-hidden />
      <div className={s.bpRow}>
        <span className={s.bpLabel}>änderung · klassisch</span>
        <div className={s.bpOldPath}>
          <span className={s.bpNodeOld}>Ticket</span>
          <span className={s.bpDash} aria-hidden />
          <span className={s.bpNodeOld}>Warteschlange</span>
          <span className={s.bpDash} aria-hidden />
          <span className={s.bpNodeOld}>Angebot</span>
          <span className={s.bpDash} aria-hidden />
          <span className={s.bpNodeOld}>3 Wochen</span>
          <span className={s.bpDash} aria-hidden />
          <span className={s.bpNodeOld}>Rechnung</span>
        </div>
      </div>
      <div className={s.bpRow}>
        <span className={`${s.bpLabel} ${s.bpLabelNew}`}>änderung · hier</span>
        <div className={s.bpNewPath}>
          <span className={s.bpNodeNew}>Ihr Anruf</span>
          <span className={s.bpLine} aria-hidden />
          <span className={`${s.bpNodeNew} ${s.bpNodeLive}`}>
            meist am nächsten Tag <MiniLive />
          </span>
        </div>
      </div>
      <p className={s.bpNote}>
        Darum rechnet sich Software hier schon ab dem Problem, das zwei
        Stunden pro Woche kostet — für das es nie ein klassisches Projekt
        gegeben hätte.
      </p>
    </div>
  );
}
