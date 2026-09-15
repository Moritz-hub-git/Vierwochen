import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import crypto from "node:crypto";
const code = ts.transpileModule(
  readFileSync(
    new URL("../app/api/blueprint-email/route.ts", import.meta.url),
    "utf8",
  ),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;
const dialogId = "12345678-1234-4234-8234-123456789012";
function route({
  storage = true,
  delivery = true,
  blueprint = true,
  existing = false,
} = {}) {
  const writes = [],
    notices = [];
  const db = {
    collection() {
      return {
        doc() {
          return { update: async () => {} };
        },
      };
    },
    async runTransaction(fn) {
      return fn({
        get: async () => ({
          exists: existing,
          data: () => ({ deliveryStatus: "sent" }),
        }),
        create: (_ref, data) => writes.push(data),
      });
    },
  };
  const deps = {
    "node:crypto": crypto,
    "@google-cloud/firestore": {
      FieldValue: { serverTimestamp: () => "SERVER_TIME" },
    },
    "next/server": {
      NextResponse: { json: (data, options) => Response.json(data, options) },
    },
    "@/lib/booking": {
      validBlueprintDialogId: (v) => v === dialogId,
      loadStoredBlueprint: async () =>
        blueprint ? { title: "Synthetic blueprint" } : null,
      blueprintSummary: () => "Synthetic blueprint",
    },
    "@/lib/config": {
      SITE: { email: "owner@example.invalid" },
      contactEmail: () => "owner@example.invalid",
    },
    "@/lib/email": {
      checkBusinessEmail: (value) =>
        value.includes("@") ? { ok: true, email: value } : { ok: false },
    },
    "@/lib/firestore": {
      safe: async (operation) => (storage ? operation(db) : null),
    },
    "@/lib/mail": {
      ownerNoticeHtml: (value) => JSON.stringify(value),
      sendMail: async (value) => {
        notices.push(value);
        return delivery;
      },
    },
    "@/lib/ratelimit": {
      checkPersistentDailyLimit: async () => true,
      checkWindowLimit: () => true,
      clientIp: () => "TEST_IP",
    },
  };
  const exports = {};
  vm.runInNewContext(code, {
    exports,
    require: (name) => {
      assert.ok(deps[name], `Unexpected dependency ${name}`);
      return deps[name];
    },
    Request,
    Response,
    console,
  });
  return { POST: exports.POST, writes, notices };
}
const request = (extra = {}) =>
  new Request("http://localhost/api/blueprint-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dialogId, email: "lead@example.invalid", ...extra }),
  });
test("blueprint email delivers only stored result and never implies marketing consent", async () => {
  const r = route();
  const res = await r.POST(request());
  assert.equal(res.status, 200);
  assert.equal((await res.json()).delivery, "sent");
  assert.equal(r.writes[0].marketingConsent, false);
  assert.equal(r.notices[0].to, "lead@example.invalid");
});
test("saved but unsent blueprint request honestly reports pending personal delivery", async () => {
  const r = route({ delivery: false });
  const res = await r.POST(request());
  const body = await res.json();
  assert.equal(body.delivery, "requested");
  assert.match(body.message, /nicht bestätigt/);
});
test("blueprint email fails when neither durable storage nor delivery succeeds", async () => {
  const r = route({ storage: false, delivery: false });
  assert.equal((await r.POST(request())).status, 503);
});
test("unknown blueprint and injected client content never produce outbound email", async () => {
  const r = route({ blueprint: false });
  assert.equal((await r.POST(request())).status, 503);
  assert.equal((await r.POST(request({ html: "<img src=x>" }))).status, 400);
  assert.equal(r.notices.length, 0);
});
test("duplicate blueprint email request does not resend", async () => {
  const r = route({ existing: true });
  assert.equal((await r.POST(request())).status, 200);
  assert.equal(r.notices.length, 0);
});
