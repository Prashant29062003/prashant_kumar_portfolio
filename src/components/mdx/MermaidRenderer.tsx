"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import mermaid from "mermaid";

interface MermaidRendererProps {
  code: string;
}

export function MermaidRenderer({ code }: MermaidRendererProps) {
  const [svgHtml, setSvgHtml] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const { resolvedTheme } = useTheme();
  const initialized = useRef(false);
  const idRef = useRef<string | null>(null);

  useEffect(() => {
    if (!idRef.current) {
      idRef.current = "m-" + Math.random().toString(36).slice(2, 9);
    }

    const theme = resolvedTheme === "dark" ? "dark" : "base";

    if (!initialized.current) {
      mermaid.initialize({
        startOnLoad: false,
        theme,
        securityLevel: "loose",
      });
      initialized.current = true;
    }

    const renderDiagram = async () => {
      try {
        const { svg } = await mermaid.render(
          idRef.current + "-svg",
          code.trim()
        );
        setSvgHtml(svg);
        setHasError(false);
      } catch (error) {
        console.error("Mermaid parsing failure:", error);
        setHasError(true);
      }
    };

    renderDiagram();
  }, [code, resolvedTheme]);

  if (hasError) {
    return (
      <div className="border-destructive/50 bg-destructive/10 text-destructive my-6 rounded-xl border p-4 font-mono text-xs">
        Failed to render system architecture diagram.
        <pre className="text-muted-foreground mt-2 overflow-x-auto">{code}</pre>
      </div>
    );
  }

  if (!svgHtml) {
    return (
      <div className="bg-muted my-8 h-32 w-full animate-pulse rounded-xl" />
    );
  }

  return (
    <div
      className="bg-muted/20 my-8 w-full overflow-x-auto rounded-xl p-6"
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}
