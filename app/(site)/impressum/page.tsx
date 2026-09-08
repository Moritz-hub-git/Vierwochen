import type { Metadata } from "next";
import { BrandPage } from "@/components/v/BrandNav";
import { SITE } from "@/lib/config";
import s from "@/components/v/brandnav.module.css";

export const metadata: Metadata = { title: "Impressum" };

/**
 * Strukturierter Entwurf (PROMPT.md §11). Anschrift, Rufnummer und USt-IdNr.
 * kann nur der Gründer eintragen — sie bleiben als sichtbare PLATZHALTER,
 * damit sie nicht übersehen werden. Ehrlich benannt: ein Einzelunternehmen,
 * keine GmbH, kein Team.
 */
export default function Impressum() {
  return (
    <BrandPage>
      <h1>Impressum</h1>

      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {SITE.name} ist ein Einzelunternehmen von
        <br />
        {SITE.owner}
        <br />
        <span className={s.placeholder}>PLATZHALTER: Straße und Hausnummer</span>
        <br />
        <span className={s.placeholder}>PLATZHALTER: PLZ und Ort</span>
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        <br />
        Telefon:{" "}
        {SITE.phone ? (
          <a href={`tel:${SITE.phone}`}>{SITE.phone}</a>
        ) : (
          <span className={s.placeholder}>PLATZHALTER: Rufnummer</span>
        )}
      </p>

      <h2>Umsatzsteuer-Identifikationsnummer</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:{" "}
        <span className={s.placeholder}>PLATZHALTER: USt-IdNr.</span>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>{SITE.owner}, Anschrift wie oben.</p>

      <h2>Streitbeilegung</h2>
      <p>
        Das Angebot dieser Website richtet sich ausschließlich an Unternehmer.
        Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </BrandPage>
  );
}
