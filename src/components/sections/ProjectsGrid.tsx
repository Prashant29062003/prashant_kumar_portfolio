import ProjectCard from "@/components/cards/ProjectCard";
import { getAllProjects, getFeaturedProjects } from "@/lib/content/projects";

export default function ProjectsGrid() {
  const allProjects = getAllProjects();
  const featured = getFeaturedProjects()[0];
  const gridProjects = allProjects.filter((p) => p.id !== featured?.id);

  if (gridProjects.length === 0) return null;

  return (
    <section className="pb-24 antialiased">
      <h2 className="text-muted-foreground font-mono text-sm tracking-wider uppercase">
        Selected Projects
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gridProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
