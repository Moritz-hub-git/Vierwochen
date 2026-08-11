/**
 * Gemini über Vertex AI (PROMPT.md §8).
 *
 * Authentifizierung ausschließlich über die Dienstkonto-Identität der Laufzeit
 * (Application Default Credentials, google-auth-library). Keine API-Schlüssel.
 *
 * Technische Fallstricke aus §5, hier bewusst abgedeckt:
 * - großzügiges Antwortbudget (LIMITS.maxOutputTokens),
 * - Antwortschema erzwungen (responseMimeType + responseSchema),
 * - abgeschnittenes JSON reparieren, finishReason protokollieren,
 * - Fehler mit Ursache loggen, nie pauschal „nicht erreichbar".
 */
import { GoogleAuth } from "google-auth-library";
import { LIMITS, VERTEX } from "./config";

const auth = new GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});

export interface Content {
  role: "user" | "model";
  parts: { text: string }[];
}

export interface GenerateResult {
  json: unknown;
  finishReason: string;
  repaired: boolean;
}

/**
 * Schneidet abgeschnittenes JSON bis zur letzten vollständigen Struktur zurück
 * bzw. ergänzt fehlende schließende Klammern (PROMPT.md §5, Fallstricke).
 */
export function repairJson(raw: string): unknown {
  const text = raw.trim().replace(/^```(?:json)?/, "").replace(/```$/, "").trim();
  try {
    return JSON.parse(text);
  } catch {
    // Versuch 1: offene Klammern zählen und schließen (String-Zustand beachten).
    const stack: string[] = [];
    let inString = false;
    let escaped = false;
    for (const ch of text) {
      if (inString) {
        if (escaped) escaped = false;
        else if (ch === "\\") escaped = true;
        else if (ch === '"') inString = false;
        continue;
      }
      if (ch === '"') inString = true;
      else if (ch === "{") stack.push("}");
      else if (ch === "[") stack.push("]");
      else if (ch === "}" || ch === "]") stack.pop();
    }
    let candidate = text;
    // Hängt die Antwort mitten in einem String, String schließen.
    if (inString) candidate += '"';
    // Ein angerissenes letztes Feld („"foo": ) loswerden.
    candidate = candidate.replace(/,\s*"[^"]*"?\s*:?\s*$/, "").replace(/,\s*$/, "");
    candidate += stack.reverse().join("");
    try {
      return JSON.parse(candidate);
    } catch {
      // Versuch 2: bis zur letzten schließenden Klammer kürzen, dann erneut schließen.
      const lastBrace = text.lastIndexOf("}");
      if (lastBrace > 0) {
        return repairJsonTruncated(text.slice(0, lastBrace + 1));
      }
      throw new Error("JSON-Antwort nicht reparierbar");
    }
  }
}

function repairJsonTruncated(text: string): unknown {
  for (let end = text.length; end > 1; end = text.lastIndexOf("}", end - 2) + 1) {
    const slice = text.slice(0, end);
    const opens = (slice.match(/{/g) ?? []).length;
    const closes = (slice.match(/}/g) ?? []).length;
    const candidate = slice + "}".repeat(Math.max(0, opens - closes));
    try {
      return JSON.parse(candidate);
    } catch {
      if (end <= 1) break;
    }
  }
  throw new Error("JSON-Antwort nicht reparierbar (gekürzt)");
}

/**
 * Prüft, ob das konfigurierte Modell in der eingestellten Region bereitsteht.
 * Fragt nur die Metadaten ab — kostet keine Tokens. Nützlich nach einem
 * Modellwechsel: Ist das Modell in der Region unbekannt, antwortet Vertex 404.
 */
/**
 * Basis-URL für einen Standort. Der globale Endpunkt hat kein Regionspräfix,
 * regionale und Multiregion-Endpunkte (z. B. `eu`) haben eines.
 */
export function apiHost(location: string): string {
  return location === "global" ? "aiplatform.googleapis.com" : `${location}-aiplatform.googleapis.com`;
}

export async function probeModel(candidate?: string, candidateLocation?: string): Promise<{
  ok: boolean;
  model: string;
  location: string;
  status?: number;
  error?: string;
}> {
  const model = candidate ?? VERTEX.model;
  const location = candidateLocation ?? VERTEX.location;
  const project = VERTEX.project;
  if (!project) {
    return { ok: false, model, location, error: "GOOGLE_CLOUD_PROJECT ist nicht gesetzt." };
  }
  try {
    const client = await auth.getClient();
    // Kleinstmöglicher echter Aufruf: sagt verlässlich, ob das Modell in dieser
    // Region antwortet. Eine reine Metadatenabfrage tut das nicht.
    await client.request({
      url: `https://${apiHost(location)}/v1/projects/${project}/locations/${location}/publishers/google/models/${model}:generateContent`,
      method: "POST",
      data: {
        contents: [{ role: "user", parts: [{ text: "ping" }] }],
        generationConfig: { maxOutputTokens: 1, temperature: 0 },
      },
      timeout: 30_000,
    });
    return { ok: true, model, location };
  } catch (err) {
    const status = (err as { response?: { status?: number } })?.response?.status;
    const data = (err as { response?: { data?: unknown } })?.response?.data;
    const upstream =
      typeof data === "object" && data !== null
        ? JSON.stringify(data).slice(0, 400)
        : err instanceof Error
          ? err.message.slice(0, 400)
          : String(err).slice(0, 400);
    console.error(`[vertex] Modellprüfung fehlgeschlagen (${model} in ${location}):`, upstream);
    return { ok: false, model, location, status, error: upstream };
  }
}

export async function generateStructured(options: {
  contents: Content[];
  systemInstruction: string;
  responseSchema: Record<string, unknown>;
  temperature?: number;
}): Promise<GenerateResult> {
  const project = VERTEX.project;
  if (!project) {
    throw new Error("GOOGLE_CLOUD_PROJECT ist nicht gesetzt — Vertex AI nicht konfiguriert.");
  }
  const url = `https://${apiHost(VERTEX.location)}/v1/projects/${project}/locations/${VERTEX.location}/publishers/google/models/${VERTEX.model}:generateContent`;

  const client = await auth.getClient();
  const body = {
    contents: options.contents,
    systemInstruction: { role: "system", parts: [{ text: options.systemInstruction }] },
    generationConfig: {
      temperature: options.temperature ?? 0.4,
      maxOutputTokens: LIMITS.maxOutputTokens,
      responseMimeType: "application/json",
      responseSchema: options.responseSchema,
    },
  };

  const res = await client.request<{
    candidates?: {
      content?: { parts?: { text?: string }[] };
      finishReason?: string;
    }[];
  }>({
    url,
    method: "POST",
    data: body,
    timeout: 60_000,
  });

  const candidate = res.data.candidates?.[0];
  const finishReason = candidate?.finishReason ?? "UNBEKANNT";
  const text = candidate?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";

  if (finishReason !== "STOP") {
    console.warn(`[vertex] finishReason=${finishReason}, Antwortlänge=${text.length}`);
  }
  if (!text) {
    throw new Error(`Leere Modellantwort (finishReason=${finishReason})`);
  }

  let json: unknown;
  let repaired = false;
  try {
    json = JSON.parse(text);
  } catch {
    console.warn(`[vertex] JSON unvollständig (finishReason=${finishReason}) — repariere.`);
    json = repairJson(text);
    repaired = true;
  }
  return { json, finishReason, repaired };
}
