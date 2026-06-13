import Container from "@/components/layout/Container";
import ProjectCard from "@/components/cards/ProjectCard";
import { getAllProjects } from "@/lib/content/projects";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <Container className="py-16">
      <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      <p className="text-muted-foreground mt-4">
        Case studies and engineering deep-dives.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Container>
  );
}
