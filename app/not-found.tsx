import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="section container prose">
      <span className="eyebrow">OPSDONE · 404</span>
      <h1>Hier ist schon alles erledigt.</h1>
      <p>
        Diese Seite existiert nicht. Entdecken Sie unsere Prozesse oder zeigen
        Sie uns, welche Arbeit wir für Sie eliminieren können.
      </p>
      <Link className="button button-primary" href="/">
        Zur Startseite
      </Link>
    </main>
  );
}
