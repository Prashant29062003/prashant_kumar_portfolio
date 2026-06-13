import Link from "next/link";
import { Pencil, ExternalLink } from "lucide-react";
import { db } from "@/lib/db/client";
import { projects } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FeaturedButton from "@/components/admin/FeaturedButton";

export default async function AdminProjectsPage() {
  const allProjects = await db
    .select()
    .from(projects)
    .orderBy(projects.createdAt);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-2">
            {allProjects.length} project{allProjects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button>New Project</Button>
        </Link>
      </div>

      <div className="border-border rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-border text-muted-foreground border-b text-left text-sm">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Visibility</th>
              <th className="px-4 py-3 font-medium">Year</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProjects.map((p) => (
              <tr
                key={p.id}
                className="border-border hover:bg-muted/50 border-b text-sm transition-colors last:border-0"
              >
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="text-muted-foreground px-4 py-3 font-mono text-xs">
                  {p.slug}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant="outline"
                    className={
                      p.status === "completed"
                        ? "border-emerald-500/20 bg-emerald-500/10 font-mono text-[10px] text-emerald-500"
                        : "border-blue-500/20 bg-blue-500/10 font-mono text-[10px] text-blue-500"
                    }
                  >
                    {p.status === "in_progress" ? "In Progress" : "Completed"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant="outline"
                    className={
                      p.visibility === "published"
                        ? "border-emerald-500/20 bg-emerald-500/10 font-mono text-[10px] text-emerald-500"
                        : p.visibility === "draft"
                          ? "border-amber-500/20 bg-amber-500/10 font-mono text-[10px] text-amber-500"
                          : "border-border bg-muted text-muted-foreground font-mono text-[10px]"
                    }
                  >
                    {p.visibility}
                  </Badge>
                </td>
                <td className="text-muted-foreground px-4 py-3">{p.year}</td>
                <td className="px-4 py-3">
                  <FeaturedButton id={p.id} isFeatured={p.isFeatured} />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/projects/${p.id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-3.5 w-3.5" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </Link>
                    {p.visibility === "published" && (
                      <Link href={`/projects/${p.slug}`} target="_blank">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span className="sr-only">View</span>
                        </Button>
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
