import Link from "next/link";
import { db } from "@/lib/db/client";
import { projects } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FolderKanban,
  CheckCircle2,
  FileEdit,
  Archive,
  ExternalLink,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const stats = await db
    .select({
      visibility: projects.visibility,
      count: sql<number>`count(*)`,
    })
    .from(projects)
    .groupBy(projects.visibility);

  const total = stats.reduce((a, s) => a + s.count, 0);
  const published = stats.find((s) => s.visibility === "published")?.count ?? 0;
  const draft = stats.find((s) => s.visibility === "draft")?.count ?? 0;
  const archived = stats.find((s) => s.visibility === "archived")?.count ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your portfolio content.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent>
            <p className="text-muted-foreground text-sm font-medium">
              Total Projects
            </p>
            <p className="mt-2 text-3xl font-bold">{total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between">
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
          <CardContent className="flex items-center justify-between">
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
          <CardContent className="flex items-center justify-between">
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

      <div className="flex items-center gap-4">
        <Link href="/admin/projects/new">
          <Button>
            <FolderKanban className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
        <Link href="/" target="_blank">
          <Button variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Site
          </Button>
        </Link>
      </div>
    </div>
  );
}
