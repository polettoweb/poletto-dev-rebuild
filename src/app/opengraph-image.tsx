import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Marco Poletto - Engineering leadership, in practice";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#f8f6f0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 15,
              backgroundColor: "#1f2924",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 800,
              color: "#f8f6f0",
            }}
          >
            P
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#1f2924",
            }}
          >
            Marco Poletto
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#1f2924",
            maxWidth: 980,
          }}
        >
          Engineering leadership, in practice.
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#65706a" }}>poletto.dev</div>
      </div>
    ),
    { ...size },
  );
}
