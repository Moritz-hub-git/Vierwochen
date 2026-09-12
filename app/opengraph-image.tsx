import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "OpsDone — Work eliminated. AI-native Process Automation.";
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
          background: "#edf0e5",
          padding: "65px 80px",
          color: "#1d2420",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
          ▣ OpsDone.
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
          <div style={{ display: "flex", color: "#6f7d56" }}>eliminated.</div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 45,
            fontSize: 23,
            color: "#54614b",
          }}
        >
          AI-native Process Automation · opsdone.de
        </div>
      </div>
    ),
    size,
  );
}
