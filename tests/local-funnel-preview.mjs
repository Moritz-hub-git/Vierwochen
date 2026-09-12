/**
 * Isolated UI test fixture. No model, email, database or calendar writes.
 * Run beside localhost:3000, browse localhost:3001. Not shipped in Cloud Build.
 */
import http from "node:http";
const sketch = {
  title: "Auftragsbestätigungen mit Bestellungen abgleichen",
  steps: [
    { label: "PDF aus dem Posteingang erfassen", automation: "automatisch" },
    {
      label: "Preise, Mengen und Termine abgleichen",
      automation: "automatisch",
    },
    {
      label: "Abweichungen mit Kontext vorlegen",
      automation: "teilautomatisch",
    },
    { label: "Geänderte Liefertermine freigeben", automation: "manuell" },
  ],
  value: [
    "Ihr Einkauf prüft die Ausnahmen. Der Abgleich der Standardfälle wird vorbereitet.",
  ],
  open: [
    "Welcher Export oder Datenzugang ist verfügbar?",
    "Welche Abweichungen erfordern eine Freigabe?",
  ],
  assumptions: [
    "Bestellungen lassen sich eindeutig zuordnen.",
    "Freigaben bleiben beim Einkauf.",
  ],
};
const result = {
  tier: "pilot",
  price: 5000,
  priceItems: [{ label: "Prozessaufnahme und Pilot", euro: 5000 }],
  scope: [
    "Ein Postfach und ein Bestellexport",
    "Prüfung von Preisen, Mengen und Lieferterminen",
    "Ausnahmeübersicht für den Einkauf",
  ],
  weeks: [
    { week: 1, label: "Prozessaufnahme" },
    { week: 2, label: "Pilot" },
    { week: 3, label: "Abnahme" },
  ],
};
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://127.0.0.1:3001");
  const reply = (status, body) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(body));
  };
  if (url.pathname === "/api/chat") {
    let raw = "";
    for await (const chunk of req) raw += chunk;
    const body = JSON.parse(raw);
    const count = body.messages.filter((m) => m.role === "user").length;
    return reply(200, {
      ok: true,
      turn:
        count < 2
          ? {
              phase: "question",
              reply:
                "Wo liegen Ihre Bestellungen heute, mit denen die PDFs abgeglichen werden?",
              sketch,
              input: {
                kind: "chips",
                options: [
                  "Im ERP mit Excel-Export",
                  "In einer Excel-Liste",
                  "Das müssen wir noch prüfen",
                ],
              },
            }
          : {
              phase: "result",
              reply:
                "Der erste Ablauf steht: Dokument erfassen, gegen die Bestellung prüfen und Abweichungen dem Einkauf vorlegen. Die Vorschau zeigt die Annahmen für einen begrenzten Pilot.",
              sketch,
              result,
            },
    });
  }
  if (url.pathname === "/api/booking/book")
    return reply(200, {
      ok: true,
      mode: "angefragt",
      message:
        "Lokaler UI-Test: Terminanfrage simuliert. Es wurde nichts versendet.",
    });
  if (url.pathname === "/api/event") return reply(200, { ok: true });
  if (url.pathname.startsWith("/api/") && url.pathname !== "/api/booking/slots")
    return reply(403, { ok: false, error: "Writes disabled in local fixture" });
  const upstream = http.request(
    {
      hostname: "127.0.0.1",
      port: 3000,
      path: req.url,
      method: req.method,
      headers: { ...req.headers, host: "127.0.0.1:3000" },
    },
    (r) => {
      res.writeHead(r.statusCode, r.headers);
      r.pipe(res);
    },
  );
  upstream.on("error", () =>
    reply(502, { error: "Start local app on port3000 first" }),
  );
  req.pipe(upstream);
});
server.listen(3001, "127.0.0.1", () =>
  console.log("Isolated fixture: http://127.0.0.1:3001 — all delivery mocked"),
);
