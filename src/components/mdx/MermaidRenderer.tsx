"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import mermaid from "mermaid";

const svgCache = new Map<string, string>();

interface MermaidRendererProps {
  code: string;
}

export function MermaidRenderer({ code }: MermaidRendererProps) {
  const [svgHtml, setSvgHtml] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const { resolvedTheme } = useTheme();
  const idRef = useRef<string | null>(null);
  const theme = resolvedTheme === "dark" ? "dark" : "base";

  const normalizedCode = useMemo(() => code.trim(), [code]);

  const cacheKey = useMemo(
    () => `${normalizedCode}::${theme}`,
    [normalizedCode, theme]
  );

  const cachedSvg = svgCache.get(cacheKey);

  useEffect(() => {
    if (!idRef.current) {
      idRef.current = `m-${crypto.randomUUID()}`;
    }
  }, []);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme,
      securityLevel: "loose",
    });
  }, [theme]);

  useEffect(() => {
    if (cachedSvg) {
      return;
    }

    if (!idRef.current) {
      return;
    }

    setHasError(false);

    let cancelled = false;

    const renderDiagram = async () => {
      try {
        const { svg } = await mermaid.render(
          `${idRef.current}-svg`,
          normalizedCode
        );

        if (cancelled) {
          return;
        }

        svgCache.set(cacheKey, svg);
        setSvgHtml(svg);
        setHasError(false);
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error("Mermaid parsing failure:", error);
        setSvgHtml(null);
        setHasError(true);
      }
    };

    void renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [cachedSvg, cacheKey, normalizedCode]);

  if (hasError) {
    return (
      <div className="border-destructive/50 bg-destructive/10 text-destructive my-6 rounded-xl border p-4 font-mono text-xs">
        Failed to render system architecture diagram.
        <pre className="text-muted-foreground mt-2 overflow-x-auto">{code}</pre>
      </div>
    );
  }

  const svgToRender = cachedSvg ?? svgHtml;

  if (!svgToRender) {
    return (
      <div className="bg-muted my-8 h-32 w-full animate-pulse rounded-xl" />
    );
  }

  return (
    <div
      className="bg-muted/20 my-8 w-full overflow-x-auto rounded-xl p-6"
      dangerouslySetInnerHTML={{ __html: svgToRender }}
    />
  );
}
