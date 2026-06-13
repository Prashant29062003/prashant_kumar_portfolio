import Link from "next/link";
import { db } from "@/lib/db/client";
import { projects } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { FolderKanban, FileText, StickyNote, ExternalLink } from "lucide-react";

type ContentType = {
  key: string;
  title: string;
  description: string;
  icon: React.ElementType;
  href: string | null;
  color: string;
  count?: number;
};

const comingSoon: ContentType[] = [
  {
    key: "blogs",
    title: "Blogs",
    description: "Articles and technical write-ups",
    icon: FileText,
    href: null,
    color: "text-amber-500",
  },
  {
    key: "notes",
    title: "Notes",
    description: "Quick references and snippets",
    icon: StickyNote,
    href: null,
    color: "text-emerald-500",
  },
];

export default async function AdminDashboardPage() {
  const [{ count: projectCount }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(projects);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Pick a content type to manage.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="border-border bg-card flex flex-col gap-6 rounded-xl border p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
              <FolderKanban className="size-5 text-blue-500" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold">Projects</h3>
              <p className="text-muted-foreground text-sm">
                {projectCount} {projectCount === 1 ? "project" : "projects"}{" "}
                total
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" asChild>
              <Link href="/admin/projects/new">New Project</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/projects">Manage</Link>
            </Button>
          </div>
        </div>

        {comingSoon.map((type) => (
          <div
            key={type.key}
            className="border-border bg-card/50 flex flex-col gap-6 rounded-xl border p-6 opacity-50"
          >
            <div className="flex items-start gap-4">
              <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
                <type.icon className="text-muted-foreground size-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold">{type.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {type.description}
                </p>
              </div>
            </div>
            <div>
              <Button variant="outline" size="sm" disabled>
                Coming Soon
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Link href="/" target="_blank">
        <Button variant="outline">
          <ExternalLink className="mr-2 h-4 w-4" />
          View Site
        </Button>
      </Link>
    </div>
  );
}
