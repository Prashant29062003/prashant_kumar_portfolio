import { MDXRemote } from "next-mdx-remote/rsc";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MermaidRenderer } from "./MermaidRenderer";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import React from "react";

type HeadingProps = React.ComponentPropsWithoutRef<"h1">;
type ParagraphProps = React.ComponentPropsWithoutRef<"p">;
type ListProps = React.ComponentPropsWithoutRef<"ul">;
type TableProps = React.ComponentPropsWithoutRef<"table">;
type TableSectionProps = React.ComponentPropsWithoutRef<"thead">;
type TableRowProps = React.ComponentPropsWithoutRef<"tr">;
type TableCellProps = React.ComponentPropsWithoutRef<"th">;
type CodeProps = React.ComponentPropsWithoutRef<"code">;

interface PreProps extends React.ComponentPropsWithoutRef<"pre"> {
  children: React.ReactNode;
}

interface ChildWithProps {
  props?: {
    className?: string;
    children?: React.ReactNode;
  };
}

const components = {
  h1: (props: HeadingProps) => (
    <h1
      className="text-foreground mt-12 scroll-m-20 text-3xl font-bold tracking-tight first:mt-0"
      {...props}
    />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <>
      <h2
        className="text-foreground mt-10 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0"
        {...props}
      />
      <Separator className="mt-2" />
    </>
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="text-foreground mt-8 scroll-m-20 text-lg font-medium tracking-tight"
      {...props}
    />
  ),
  p: (props: ParagraphProps) => (
    <p
      className="text-muted-foreground leading-7 [&:not(:first-child)]:mt-5"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="text-muted-foreground my-5 ml-6 list-disc [&>li]:mt-2"
      {...props}
    />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="text-muted-foreground my-5 ml-6 list-decimal [&>li]:mt-2"
      {...props}
    />
  ),
  li: (props: React.ComponentPropsWithoutRef<"li">) => (
    <li
      className="text-muted-foreground text-sm leading-relaxed md:text-base"
      {...props}
    />
  ),
  table: (props: TableProps) => (
    <Card className="bg-muted/20 my-6 w-full overflow-y-auto">
      <CardContent className="p-0">
        <table
          className="w-full border-collapse text-left text-sm"
          {...props}
        />
      </CardContent>
    </Card>
  ),
  thead: (props: TableSectionProps) => (
    <thead
      className="border-border bg-muted/30 text-muted-foreground border-b text-xs font-medium tracking-wider uppercase"
      {...props}
    />
  ),
  tbody: (props: React.ComponentPropsWithoutRef<"tbody">) => (
    <tbody className="divide-border divide-y" {...props} />
  ),
  tr: (props: TableRowProps) => (
    <tr className="hover:bg-accent/50 transition-colors" {...props} />
  ),
  th: (props: TableCellProps) => (
    <th className="text-foreground px-4 py-3 font-semibold" {...props} />
  ),
  td: (props: React.ComponentPropsWithoutRef<"td">) => (
    <td
      className="text-muted-foreground px-4 py-3 font-mono text-xs"
      {...props}
    />
  ),
  pre: ({ children }: PreProps) => {
    const child = Array.isArray(children) ? children[0] : children;
    const childWithProps = child as ChildWithProps;
    if (childWithProps?.props?.className === "language-mermaid") {
      return <MermaidRenderer code={childWithProps.props.children as string} />;
    }
    return (
      <Card className="bg-muted my-6 overflow-x-auto">
        <CardContent className="text-muted-foreground p-4 font-mono text-xs leading-relaxed">
          <pre className="m-0">{children}</pre>
        </CardContent>
      </Card>
    );
  },
  code: (props: CodeProps) => (
    <code
      className="bg-muted/50 text-foreground rounded px-1.5 py-0.5 font-mono text-xs"
      {...props}
    />
  ),
};

interface MdxContentProps {
  source: string;
}

export default async function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="text-muted-foreground selection:bg-accent w-full">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ],
          },
        }}
      />
    </div>
  );
}
