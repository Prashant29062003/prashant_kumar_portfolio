import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import ProjectForm from "@/components/admin/ProjectForm";
import DeleteProjectDialog from "@/components/admin/DeleteProjectDialog";
import { updateProject } from "@/app/actions/projects";
import { getProjectByIdAdmin } from "@/lib/content/projects";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectByIdAdmin(id);

  if (!project) notFound();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
          <p className="text-muted-foreground mt-2">{project.title}</p>
        </div>
        {project.visibility === "published" && (
          <Link href={`/projects/${project.slug}`} target="_blank">
            <Button variant="outline">Preview</Button>
          </Link>
        )}
      </div>
      <ProjectForm project={project} action={updateProject.bind(null, id)} />

      <div className="border-destructive/50 mt-16 rounded-lg border p-6">
        <h2 className="text-destructive text-lg font-semibold">Danger Zone</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Permanently delete this project and all its content. This action
          cannot be undone.
        </p>
        <div className="mt-4">
          <DeleteProjectDialog
            projectTitle={project.title}
            projectId={project.id}
          />
        </div>
      </div>
    </div>
  );
}
