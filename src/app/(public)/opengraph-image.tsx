import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const alt = `${SITE.name} \u2014 ${SITE.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "#0A0A0A",
        padding: "80px",
        color: "#FAFAFA",
        fontFamily: "Inter",
      }}
    >
      <p style={{ fontSize: 24, color: "#A1A1AA", margin: 0 }}>{SITE.title}</p>
      <h1
        style={{
          fontSize: 64,
          fontWeight: 700,
          margin: "16px 0 0 0",
          letterSpacing: "-0.02em",
        }}
      >
        {SITE.name}
      </h1>
      <p
        style={{
          fontSize: 28,
          color: "#A1A1AA",
          margin: "16px 0 0 0",
          maxWidth: 600,
        }}
      >
        Authentication \u00b7 APIs \u00b7 SaaS Infrastructure
      </p>
    </div>,
    { ...size }
  );
}
