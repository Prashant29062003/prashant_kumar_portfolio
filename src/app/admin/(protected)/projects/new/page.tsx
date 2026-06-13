import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "@/app/actions/projects";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
        <p className="text-muted-foreground mt-2">
          Create a new project case study.
        </p>
      </div>
      <ProjectForm action={createProject} />
    </div>
  );
}
