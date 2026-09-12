import type { Metadata } from "next";
import ProcessCheckForm from "@/components/site/ProcessCheckForm";
import { SITE } from "@/lib/config";
import { processes } from "@/lib/processes";
export const metadata: Metadata = {
  title: "Kostenloser Prozess-Check",
  description:
    "Welcher manuelle Prozess kann entfallen? Prüfen Sie mit OpsDone Aufwand, Automatisierungspotenzial und einen sinnvollen Pilot. Kostenlos und unverbindlich.",
  alternates: { canonical: "/prozess-check" },
};
export default async function ProcessCheck({
  searchParams,
}: {
  searchParams: Promise<{ prozess?: string; volumen?: string }>;
}) {
  const params = await searchParams;
  const selected =
    processes.find((p) => p.slug === params.prozess)?.title || "";
  const volume =
    params.volumen && /^\d{1,7}$/.test(params.volumen) ? params.volumen : "";
  return (
    <main id="main" className="container check-page">
      <div>
        <span className="eyebrow">KOSTENLOSER PROZESS-CHECK</span>
        <h1>
          Ein Prozess.
          <br />
          Weniger Arbeit.
          <br />
          Fangen wir an.
        </h1>
        <p className="lead">
          Wo verliert Ihr Team Zeit mit wiederkehrenden Handgriffen? Ein paar
          Angaben reichen, um gemeinsam den sinnvollsten Einstieg zu finden.
        </p>
        <div className="check-steps">
          {[
            [
              "01",
              "Sie zeigen uns den Engpass.",
              "Beschreiben Sie den Ablauf in wenigen Sätzen.",
            ],
            [
              "02",
              "Wir prüfen das Potenzial.",
              "Volumen, Ausnahmen, Systeme und Wirtschaftlichkeit.",
            ],
            [
              "03",
              "Sie erhalten einen klaren nächsten Schritt.",
              "Ein sinnvoller Pilot – oder eine ehrliche Absage.",
            ],
          ].map(([n, title, text]) => (
            <div className="check-step" key={n}>
              <span>{n}</span>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="founder-note">
          <span className="founder-avatar">MS</span>
          <div>
            <strong>Direkt mit Moritz Schumacher</strong>
            <p>Gründer von OpsDone · Ihr Ansprechpartner</p>
          </div>
        </div>
      </div>
      <div>
        <ProcessCheckForm
          initialProcess={selected}
          initialVolume={volume}
          contactEmail={SITE.email}
        />
      </div>
    </main>
  );
}
