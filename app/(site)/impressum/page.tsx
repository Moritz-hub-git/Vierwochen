import type { Metadata } from "next";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Impressum",
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <main id="main" className="legal-page">
      <section className="page-hero">
        <div className="container prose">
          <p className="eyebrow">Rechtliches</p>
          <h1>Impressum</h1>
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>
            {SITE.owner}
            <br />
            handelnd unter {SITE.name} (Einzelunternehmen)
            <br />
            <strong>Noch zu ergänzen vor Veröffentlichung:</strong>{" "}
            ladungsfähige Straße und Hausnummer, Postleitzahl und Ort
            <br />
            Deutschland
          </p>
          <h2>Kontakt</h2>
          <p>
            E-Mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <br />
            Telefon: <strong>Noch zu ergänzen vor Veröffentlichung</strong>
          </p>
          <h2>Umsatzsteuer</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:{" "}
            <strong>noch zu ergänzen, sofern vorhanden</strong>
          </p>
          <h2>Verantwortlich für den Inhalt</h2>
          <p>{SITE.owner}, Anschrift wie oben.</p>
          <h2>Hinweis zum Veröffentlichungsstand</h2>
          <p>
            Dieses Impressum ist noch nicht vollständig. Die als fehlend
            gekennzeichneten Pflichtangaben müssen vor dem öffentlichen
            Geschäftsbetrieb ergänzt und rechtlich geprüft werden.
          </p>
        </div>
      </section>
    </main>
  );
}
