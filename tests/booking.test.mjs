import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

function compile(relativePath, dependencies) {
  const code = ts.transpileModule(
    readFileSync(new URL(relativePath, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports,
    require(name) {
      assert.ok(dependencies[name], `Unexpected dependency ${name}`);
      return dependencies[name];
    },
    Request,
    Response,
    console,
  });
  return exports;
}

const nextServer = {
  NextResponse: {
    json(data, init) {
      return Response.json(data, init);
    },
  },
};

test("slots return 503 instead of unchecked availability when freeBusy fails", async () => {
  const route = compile("../app/api/booking/slots/route.ts", {
    "next/server": nextServer,
    "@/lib/calendar": {
      bookingCalendarId: () => "calendar@example.invalid",
      busyIntervals: async () => {
        throw new Error("calendar unavailable");
      },
      overlapsBusy: () => false,
    },
    "@/lib/firestore": { safe: async () => [] },
    "@/lib/slots": {
      candidateSlots: () => [
        {
          date: "2030-01-02",
          label: "Mi., 2. Jan.",
          slots: [
            {
              startUtc: "2030-01-02T08:00:00.000Z",
              endUtc: "2030-01-02T08:30:00.000Z",
            },
          ],
        },
      ],
    },
  });

  const response = await route.GET();
  const payload = await response.json();
  assert.equal(response.status, 503);
  assert.equal(payload.ok, false);
  assert.equal("days" in payload, false);
});

function bookingRoute({ freeBusyFails = false, attendeeInvited = true } = {}) {
  let createEventCalls = 0;
  const route = compile("../app/api/booking/book/route.ts", {
    "@/lib/booking": {
      loadStoredBlueprint: async () => null,
      blueprintSummary: () => "",
    },
    "next/server": nextServer,
    "@google-cloud/firestore": {
      FieldValue: { serverTimestamp: () => "SERVER_TIME" },
    },
    "@/lib/calendar": {
      bookingCalendarId: () => "calendar@example.invalid",
      busyIntervals: async () => {
        if (freeBusyFails) throw new Error("calendar unavailable");
        return [];
      },
      createEvent: async () => {
        createEventCalls += 1;
        return { eventId: "event-1", attendeeInvited };
      },
      overlapsBusy: () => false,
    },
    "@/lib/config": {
      BOOKING: { durationMinutes: 30 },
      SITE: { email: "contact@example.invalid" },
      contactEmail: () => "owner@example.invalid",
    },
    "@/lib/email": {
      checkBusinessEmail: (email) =>
        email.includes("@")
          ? { ok: true, email, freemail: false }
          : { ok: false },
    },
    "@/lib/events": {
      cleanAttribution: () => null,
      recordEvent: async () => true,
    },
    "@/lib/firestore": {
      firestore: () => null,
      safe: async () => null,
    },
    "@/lib/mail": {
      bookingConfirmationHtml: () => "confirmation",
      bookingMailSubject: () => "subject",
      ownerNoticeHtml: () => "notice",
      sendMail: async () => false,
    },
    "@/lib/ratelimit": {
      checkPersistentDailyLimit: async () => true,
      checkWindowLimit: () => true,
      clientIp: () => "TEST_IP",
    },
    "@/lib/slots": {
      formatBerlinDateTime: () => "Mittwoch, 2. Januar, 09:00",
      isValidSlotStart: () => true,
    },
  });
  return {
    ...route,
    get createEventCalls() {
      return createEventCalls;
    },
  };
}

function bookingRequest(body) {
  return new Request("http://localhost/api/booking/book", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validBooking = {
  slotStart: "2030-01-02T08:00:00.000Z",
  channel: "video",
  name: "Test Name",
  email: "lead@example.invalid",
};

test("booking rejects primitive bodies and oversized decoded input", async () => {
  const route = bookingRoute();
  for (const body of ["null", "[]", "42", '"text"']) {
    const response = await route.POST(bookingRequest(body));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).ok, false);
  }

  const oversized = await route.POST(
    bookingRequest({ ...validBooking, agenda: "x".repeat(25_000) }),
  );
  assert.equal(oversized.status, 413);
  assert.equal((await oversized.json()).ok, false);
});

test("booking rejects non-string contact and slot fields without throwing", async () => {
  for (const invalid of [
    { name: 42 },
    { email: { address: "lead@example.invalid" } },
    { slotStart: 1_893_556_800_000 },
  ]) {
    const route = bookingRoute();
    const response = await route.POST(
      bookingRequest({ ...validBooking, ...invalid }),
    );
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), {
      ok: false,
      error: "Ungültige Anfrage.",
    });
  }
});

test("booking never creates or confirms an event after freeBusy failure", async () => {
  const route = bookingRoute({ freeBusyFails: true });
  const response = await route.POST(bookingRequest(validBooking));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, false);
  assert.equal(route.createEventCalls, 0);
});

test("calendar success reports actual event and delivery status without promising email", async () => {
  const route = bookingRoute({ attendeeInvited: false });
  const response = await route.POST(bookingRequest(validBooking));
  const payload = await response.json();
  assert.equal(response.status, 200);
  assert.equal(payload.ok, true);
  assert.equal(payload.mode, "bestätigt");
  assert.equal(payload.eventCreated, true);
  assert.equal(payload.persisted, false);
  assert.equal(payload.attendeeInvited, false);
  assert.equal(payload.confirmationSent, false);
  assert.doesNotMatch(payload.message, /unterwegs|sie erhalten/i);
});
