import ProjectCard from "@/components/cards/ProjectCard";
import { getAllProjects, getFeaturedProjects } from "@/lib/content/projects";

export default async function ProjectsGrid() {
  const [allProjects, featuredList] = await Promise.all([
    getAllProjects(),
    getFeaturedProjects(),
  ]);
  const featured = featuredList[0];
  const gridProjects = allProjects.filter((p) => p.slug !== featured?.slug);

  if (gridProjects.length === 0) return null;

  return (
    <section className="pb-24 antialiased">
      <h2 className="text-muted-foreground font-mono text-sm tracking-wider uppercase">
        Selected Projects
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gridProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
