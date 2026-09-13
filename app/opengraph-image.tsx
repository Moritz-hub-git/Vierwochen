import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "Opsrid — Work eliminated. Individuelle Prozesssoftware.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#eef2ff",
          padding: "65px 80px",
          color: "#202331",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
          Opsrid.
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 65,
            fontSize: 112,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: -7,
          }}
        >
          <div style={{ display: "flex" }}>Work</div>
          <div style={{ display: "flex", color: "#425de8" }}>eliminated.</div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 45,
            fontSize: 23,
            color: "#707b9b",
          }}
        >
          Individuelle Prozesssoftware · opsrid.com
        </div>
      </div>
    ),
    size,
  );
}
