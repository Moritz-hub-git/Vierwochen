import Link from "next/link";
export default function Termin() {
  return (
    <main id="main" className="container section">
      <span className="eyebrow">IHR NÄCHSTER SCHRITT</span>
      <h1>
        Gemeinsam den
        <br />
        ersten Prozess finden.
      </h1>
      <p className="lead">
        30 Minuten mit Moritz Schumacher. Wir prüfen Ihren Ablauf, offene Fragen
        und einen sinnvollen Pilot.
      </p>
      <Link className="button button-primary" href="/termin">
        Terminwahl öffnen
      </Link>
      <p>
        Lieber schriftlich?{" "}
        <Link href="/prozess-check?formular=1">Zum Kontaktformular</Link>
      </p>
    </main>
  );
}
