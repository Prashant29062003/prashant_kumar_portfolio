import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Code2, ExternalLink } from "lucide-react";
import Container from "@/components/layout/Container";
import { db } from "@/lib/db/client";
import { projects } from "@/lib/db/schema";
import { getProjectBySlug } from "@/lib/content/projects";
import { SITE } from "@/lib/constants";
import MdxContent from "@/components/mdx/MdxContent";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const rows = await db
    .select({ slug: projects.slug })
    .from(projects)
    .where(eq(projects.visibility, "published"));

  return rows.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${SITE.name}`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <Container className="py-16">
      <article className="mx-auto max-w-3xl">
        <header className="mb-12">
          <Badge
            variant="outline"
            className="border-none bg-transparent font-mono tracking-widest text-blue-500 uppercase"
          >
            Case Study / {project.scope}
          </Badge>
          <h1 className="text-foreground mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            {project.description}
          </p>
          <Separator className="mt-8" />
          <Card className="bg-muted/20 mt-8">
            <CardContent className="text-muted-foreground grid grid-cols-2 gap-4 p-4 font-mono text-xs sm:grid-cols-4">
              <div>
                <span className="text-muted-foreground block">Role:</span>{" "}
                {project.role}
              </div>
              {project.duration && (
                <div>
                  <span className="text-muted-foreground block">Duration:</span>{" "}
                  {project.duration}
                </div>
              )}
              {project.teamSize && (
                <div>
                  <span className="text-muted-foreground block">
                    Team Size:
                  </span>{" "}
                  {project.teamSize}
                </div>
              )}
              <div>
                <span className="text-muted-foreground block">Status:</span>{" "}
                {project.status}
              </div>
            </CardContent>
          </Card>
          {(project.githubUrl || project.liveUrl) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.githubUrl && (
                <Button asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Code2 className="mr-2 h-4 w-4" />
                    View Source
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button variant="outline" asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Site
                  </a>
                </Button>
              )}
            </div>
          )}
        </header>
        <section className="article-body">
          <MdxContent source={project.body} />
        </section>
      </article>
    </Container>
  );
}
