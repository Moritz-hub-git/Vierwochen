import { NextResponse } from "next/server";
import { VERTEX } from "@/lib/config";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "vierwochen",
    vertexConfigured: Boolean(VERTEX.project),
    time: new Date().toISOString(),
  });
}
