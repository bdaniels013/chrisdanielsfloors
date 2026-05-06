import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.taglines.primary}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, rgba(31,36,40,0.62) 0%, rgba(79,106,134,0.55) 100%), radial-gradient(ellipse at top right, #E5D2BD 0%, #F4EFE6 60%)",
          color: "#F4EFE6",
          fontFamily: "Georgia, serif",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 130,
            fontStyle: "italic",
            lineHeight: 1,
            textShadow: "0 4px 24px rgba(0,0,0,0.28)",
          }}
        >
          Chris Daniels
        </div>
        <div style={{ width: 360, height: 1, background: "#F4EFE6", margin: "32px 0", opacity: 0.6 }} />
        <div
          style={{
            fontSize: 28,
            fontWeight: 300,
            letterSpacing: 16,
            paddingLeft: 16,
            textTransform: "uppercase",
          }}
        >
          Floors
        </div>
        <div style={{ marginTop: 56, fontSize: 28, fontStyle: "italic", opacity: 0.95 }}>
          {site.taglines.primary}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          <span>Mississippi · Gulf Coast</span>
          <span>Est. {site.established}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
