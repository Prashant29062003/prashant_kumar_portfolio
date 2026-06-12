import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/content/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectOGImage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  const title = project?.title ?? "Project";
  const summary = project?.summary ?? "";
  const techs = project?.technologies?.join(" \u00b7 ") ?? "";

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
      <p
        style={{
          fontSize: 20,
          color: "#3B82F6",
          margin: 0,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Case Study
      </p>
      <h1
        style={{
          fontSize: 48,
          fontWeight: 700,
          margin: "16px 0 0 0",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: 24,
          color: "#A1A1AA",
          margin: "16px 0 0 0",
          maxWidth: 700,
          lineHeight: 1.4,
        }}
      >
        {summary}
      </p>
      <p style={{ fontSize: 18, color: "#52525B", margin: "24px 0 0 0" }}>
        {techs}
      </p>
    </div>,
    { ...size }
  );
}
