import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 32,
          background: "#1F2428",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F4EFE6",
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          letterSpacing: -1,
        }}
      >
        cd
      </div>
    ),
    { ...size }
  );
}
