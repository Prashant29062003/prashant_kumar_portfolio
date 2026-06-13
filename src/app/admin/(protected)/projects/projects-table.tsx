"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { FolderKanban, Pencil, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import FeaturedButton from "@/components/admin/FeaturedButton";
import { toggleFeatured } from "@/app/actions/projects";

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  year: number;
  status: string;
  visibility: string;
  isFeatured: boolean;
};

type Props = {
  projects: ProjectRow[];
};

export default function ProjectsTable({ projects }: Props) {
  const [isPending, startTransition] = useTransition();

  const currentFeaturedId = projects.find((p) => p.isFeatured)?.id || null;
  const [featuredId, setFeaturedId] = useState<string | null>(
    currentFeaturedId
  );

  const handleToggle = (id: string) => {
    const previousFeaturedId = featuredId;
    const nextFeaturedId = featuredId === id ? null : id;

    setFeaturedId(nextFeaturedId);

    startTransition(async () => {
      try {
        await toggleFeatured(id);
      } catch (error) {
        console.error("Database sync failed. Rolling back UI state:", error);
        setFeaturedId(previousFeaturedId);
      }
    });
  };

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <div className="bg-muted mb-4 flex size-12 items-center justify-center rounded-full">
          <FolderKanban className="text-muted-foreground size-6" />
        </div>
        <h3 className="mb-1 text-lg font-semibold">No projects yet</h3>
        <p className="text-muted-foreground mb-6 max-w-sm text-sm">
          Get started by creating your first project. It will appear here once
          published.
        </p>
        <Button asChild>
          <Link href="/admin/projects/new">Create Project</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40 sticky top-0 z-10">
            <TableHead className="px-4 py-3 font-medium">Title</TableHead>
            <TableHead className="px-4 py-3 font-medium">Slug</TableHead>
            <TableHead className="px-4 py-3 font-medium">Year</TableHead>
            <TableHead className="px-4 py-3 font-medium">Status</TableHead>
            <TableHead className="px-4 py-3 font-medium">Visibility</TableHead>
            <TableHead className="px-4 py-3 text-center font-medium">
              Featured
            </TableHead>
            <TableHead className="px-4 py-3 text-right font-medium">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="text-foreground px-4 py-3 font-medium">
                {project.title}
              </TableCell>
              <TableCell className="text-muted-foreground px-4 py-3 font-mono text-xs">
                {project.slug}
              </TableCell>
              <TableCell className="text-muted-foreground px-4 py-3">
                {project.year}
              </TableCell>
              <TableCell className="px-4 py-3">
                <Badge
                  variant="outline"
                  className={`font-mono text-[10px] ${
                    project.status === "completed"
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                      : "border-blue-500/20 bg-blue-500/10 text-blue-500"
                  }`}
                >
                  {project.status === "completed" ? "Completed" : "In Progress"}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-3">
                <Badge
                  variant="outline"
                  className={`font-mono text-[10px] ${
                    project.visibility === "published"
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                      : project.visibility === "draft"
                        ? "border-amber-500/20 bg-amber-500/10 text-amber-500"
                        : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  {project.visibility}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-3 text-center">
                <FeaturedButton
                  isFeatured={featuredId === project.id}
                  onToggle={() => handleToggle(project.id)}
                  disabled={isPending}
                />
              </TableCell>
              <TableCell className="px-4 py-3 text-right">
                <div className="flex justify-end gap-1.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    asChild
                  >
                    <Link href={`/admin/projects/${project.id}/edit`}>
                      <Pencil className="text-muted-foreground hover:text-foreground h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>

                  {project.visibility === "published" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      asChild
                    >
                      <Link href={`/projects/${project.slug}`} target="_blank">
                        <ExternalLink className="text-muted-foreground hover:text-foreground h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
