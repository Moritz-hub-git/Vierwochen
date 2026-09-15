/**
 * Isolated UI test fixture. No model, email, database or calendar writes.
 * Run beside localhost:3000, browse localhost:3001. Not shipped in Cloud Build.
 */
import http from "node:http";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const engine = {};
vm.runInNewContext(
  ts.transpileModule(
    readFileSync(new URL("../lib/blueprint.ts", import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText,
  { exports: engine },
);
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
    const userText = body.messages
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .join("\n");
    const type = /report|bericht/i.test(userText)
      ? "reporting"
      : /reklamation/i.test(userText)
        ? "complaints"
        : "purchasing";
    const blueprint = engine.buildBlueprint(
      {
        processType: type,
        title:
          type === "reporting"
            ? "Ihre Berichtswerkstatt"
            : "Ihre Bestellprüfung",
        summary:
          "Eine Anwendung, die Eingänge erfasst, Daten prüft und Ihrem Team fundierte Entscheidungen ermöglicht.",
        inputs: ["E-Mail", "PDF"],
        outputs: ["Geprüfter Vorgang"],
        integrations: ["ERP", "Excel"],
        actions: [
          "Vorgänge erfassen",
          "Daten vergleichen",
          "Ausnahmen vorlegen",
        ],
        approvals: ["Abweichungen durch Ihr Team freigeben"],
        todaySteps: [
          "E-Mail öffnen",
          "PDF prüfen",
          "Bestellung suchen",
          "Werte vergleichen",
          "Abweichung klären",
          "Status übertragen",
        ],
      },
      sketch,
      userText,
    );
    const questions = [
      {
        reply:
          "Verstanden: Ihre Anwendung soll den Abgleich vorbereiten und Ausnahmen sichtbar machen. Wie oft fällt diese Arbeit an?",
        input: {
          kind: "chips",
          options: [
            "50 Vorgänge pro Woche",
            "600 Vorgänge pro Monat",
            "Weiß ich noch nicht",
          ],
        },
      },
      {
        reply: "Wie viel Zeit braucht Ihr Team heute pro Vorgang?",
        input: {
          kind: "number",
          label: "Bearbeitungszeit",
          unit: "Min./Vorgang",
          min: 1,
          max: 60,
          step: 1,
          preset: 8,
        },
      },
      {
        reply: "Welche Systeme sind beteiligt?",
        input: {
          kind: "chips",
          options: [
            "ERP und Excel",
            "SAP und Microsoft 365",
            "Das müssen wir prüfen",
          ],
        },
      },
    ];
    return reply(200, {
      ok: true,
      blueprintSaved: false,
      turn:
        count <= 3
          ? { phase: "question", sketch, blueprint, ...questions[count - 1] }
          : {
              phase: "result",
              reply: "Ihr Blueprint ist bereit.",
              sketch,
              blueprint,
              result,
            },
    });
  }
  if (url.pathname === "/api/blueprint-email")
    return reply(200, {
      ok: true,
      delivery: "requested",
      message: "Lokaler UI-Test: Anfrage simuliert, keine E-Mail versendet.",
    });

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
