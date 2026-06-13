import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db/client";
import { projects } from "@/lib/db/schema";
import ProjectsTable from "./projects-table";

export default async function AdminProjectsPage() {
  const allProjects = await db
    .select()
    .from(projects)
    .orderBy(projects.createdAt);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            {allProjects.length}{" "}
            {allProjects.length === 1 ? "project" : "projects"} total
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new" className="gap-2">
            <Plus className="h-4 w-4" /> New Project
          </Link>
        </Button>
      </div>

      <ProjectsTable projects={allProjects} />
    </div>
  );
}
