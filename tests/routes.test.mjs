import test from "node:test";
import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL;
const skip = base ? false : "Set TEST_BASE_URL to the local Opsrid server.";
const routes = [
  "/",
  "/prozesse",
  "/prozesse/auftragsbestaetigungen",
  "/prozesse/angebotsbearbeitung",
  "/prozesse/reklamationen",
  "/prozesse/reporting",
  "/prozesse/lieferanten-onboarding",
  "/unternehmen",
  "/sicherheit",
  "/termin",
  "/prozess-check",
  "/impressum",
  "/datenschutz",
  "/agb",
];
test(
  "all public pages have working content, one H1 and Opsrid metadata",
  { skip },
  async () => {
    await Promise.all(
      routes.map(async (path) => {
        const response = await fetch(new URL(path, base));
        assert.equal(response.status, 200, path);
        const html = await response.text();
        assert.match(html, /<title>[^<]*Opsrid/, path);
        assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, path);
        assert.match(html, /id="main"/, path);
        assert.doesNotMatch(
          html,
          /Ihre Software\. In vier Wochen live\./,
          path,
        );
      }),
    );
  },
);
test(
  "old design URLs redirect, unknown pages are real 404s",
  { skip },
  async () => {
    for (const path of ["/v/fixfertig", "/it"]) {
      const res = await fetch(new URL(path, base), { redirect: "manual" });
      assert.ok([307, 308].includes(res.status), path);
    }
    for (const path of ["/prozesse/nicht-vorhanden", "/konzepte", "/konzepte/loesungsentwurf"]) {
      const res = await fetch(new URL(path, base));
      assert.equal(res.status, 404, path);
    }
  },
);
test("private admin exports require authentication", { skip }, async () => {
  const response = await fetch(
    new URL("/api/admin/export?was=prozesschecks", base),
  );
  assert.equal(response.status, 401);
});
test(
  "sitemap lists five process URLs and health identifies Opsrid",
  { skip },
  async () => {
    const map = await (await fetch(new URL("/sitemap.xml", base))).text();
    assert.equal(
      (map.match(/<loc>https:\/\/opsrid.com\/prozesse\//g) || []).length,
      5,
    );
    const health = await (await fetch(new URL("/api/health", base))).json();
    assert.equal(health.service, "Opsrid");
    assert.equal(health.ok, true);
  },
);
