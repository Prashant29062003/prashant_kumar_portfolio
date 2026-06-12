import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/layout/Container";
import { getProjectBySlug } from "@/lib/content/projects";
import MdxContent from "@/components/mdx/MdxContent";

type Props = {
  params: Promise<{ slug: string }>;
};

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
        </header>
        <section className="article-body">
          <MdxContent source={project.body} />
        </section>
      </article>
    </Container>
  );
}
