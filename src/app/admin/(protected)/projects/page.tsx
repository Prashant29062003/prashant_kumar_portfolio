import Link from "next/link";
import { Plus, CheckCircle2, FileEdit, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db/client";
import { projects } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import ProjectsTable from "./projects-table";

export default async function AdminProjectsPage() {
  const [allProjects, stats] = await Promise.all([
    db.select().from(projects).orderBy(projects.createdAt),
    db
      .select({
        visibility: projects.visibility,
        count: sql<number>`count(*)`,
      })
      .from(projects)
      .groupBy(projects.visibility),
  ]);

  const total = allProjects.length;
  const published = stats.find((s) => s.visibility === "published")?.count ?? 0;
  const draft = stats.find((s) => s.visibility === "draft")?.count ?? 0;
  const archived = stats.find((s) => s.visibility === "archived")?.count ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            {total} {total === 1 ? "project" : "projects"} total
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new" className="gap-2">
            <Plus className="h-4 w-4" /> New Project
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Total</p>
            <p className="mt-2 text-3xl font-bold">{total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Published
              </p>
              <p className="mt-2 text-3xl font-bold">{published}</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Drafts
              </p>
              <p className="mt-2 text-3xl font-bold">{draft}</p>
            </div>
            <FileEdit className="h-8 w-8 text-amber-500" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Archived
              </p>
              <p className="mt-2 text-3xl font-bold">{archived}</p>
            </div>
            <Archive className="text-muted-foreground h-8 w-8" />
          </CardContent>
        </Card>
      </div>

      <ProjectsTable projects={allProjects} />
    </div>
  );
}
