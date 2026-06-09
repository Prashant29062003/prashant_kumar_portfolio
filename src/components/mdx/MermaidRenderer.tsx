"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Card, CardContent } from "@/components/ui/card";
import mermaid from "mermaid";

interface MermaidRendererProps {
  code: string;
}

export function MermaidRenderer({ code }: MermaidRendererProps) {
  const uniqueId = "mermaid-" + useId().replace(/:/g, "");
  const [svgCode, setSvgCode] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const { resolvedTheme } = useTheme();
  const initialized = useRef(false);

  useEffect(() => {
    const theme = resolvedTheme === "dark" ? "dark" : "base";

    mermaid.initialize({
      startOnLoad: false,
      theme,
      securityLevel: "loose",
      fontFamily: "var(--font-geist-mono), monospace",
      themeVariables:
        theme === "dark"
          ? {
              background: "#0A0A0A",
              primaryColor: "#1F1F1F",
              primaryTextColor: "#FAFAFA",
              lineColor: "#2E2E2E",
              signalColor: "#3B82F6",
            }
          : {
              background: "#ffffff",
              primaryColor: "#f4f4f5",
              primaryTextColor: "#18181b",
              lineColor: "#e4e4e7",
              signalColor: "#3B82F6",
            },
    });
    initialized.current = true;

    const renderDiagram = async () => {
      try {
        const container = document.getElementById(uniqueId);
        if (container) container.innerHTML = "";

        const { svg } = await mermaid.render(uniqueId + "-svg", code.trim());
        setSvgCode(svg);
        setHasError(false);
      } catch (error) {
        console.error("Mermaid parsing failure:", error);
        setHasError(true);
      }
    };

    renderDiagram();
  }, [code, uniqueId, resolvedTheme]);

  if (hasError) {
    return (
      <Card className="border-destructive/50 bg-destructive/10 my-6">
        <CardContent className="text-destructive p-4 font-mono text-xs">
          Failed to render system architecture diagram.
          <pre className="text-muted-foreground mt-2 overflow-x-auto">
            {code}
          </pre>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id={uniqueId} className="bg-muted/20 my-8 w-full backdrop-blur-sm">
      <CardContent className="flex justify-center p-6">
        {svgCode ? (
          <div
            className="w-full overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: svgCode }}
          />
        ) : (
          <div className="bg-muted h-32 w-full animate-pulse rounded" />
        )}
      </CardContent>
    </Card>
  );
}
