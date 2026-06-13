import { unstable_cache } from "next/cache";
import { eq, and, asc, desc } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { projects } from "@/lib/db/schema";
import type { Project, AdminProject } from "./types";

function toProject(row: typeof projects.$inferSelect): Project {
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    description: row.description,
    body: row.body,
    role: row.role,
    scope: row.scope as Project["scope"],
    status: row.status as Project["status"],
    visibility: row.visibility as Project["visibility"],
    duration: row.duration ?? null,
    teamSize: row.teamSize ?? null,
    year: row.year,
    githubUrl: row.githubUrl ?? null,
    liveUrl: row.liveUrl ?? null,
    imageUrl: row.imageUrl ?? null,
    technologies: JSON.parse(row.technologies),
    outcomes: row.outcomes ? JSON.parse(row.outcomes) : [],
    metrics: row.metrics ? JSON.parse(row.metrics) : [],
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function toAdminProject(row: typeof projects.$inferSelect): AdminProject {
  return {
    ...toProject(row),
    id: row.id,
    isFeatured: row.isFeatured,
  };
}

export const getAllProjects = unstable_cache(
  async () => {
    const rows = await db
      .select()
      .from(projects)
      .where(eq(projects.visibility, "published"))
      .orderBy(desc(projects.year), asc(projects.title));
    return rows.map(toProject);
  },
  ["projects-all"],
  { tags: ["projects"] }
);

export const getFeaturedProjects = unstable_cache(
  async () => {
    const rows = await db
      .select()
      .from(projects)
      .where(
        and(eq(projects.visibility, "published"), eq(projects.isFeatured, true))
      )
      .limit(1);
    return rows.map(toProject);
  },
  ["projects-featured"],
  { tags: ["projects"] }
);

export const getProjectBySlug = unstable_cache(
  async (slug: string) => {
    const rows = await db
      .select()
      .from(projects)
      .where(and(eq(projects.slug, slug), eq(projects.visibility, "published")))
      .limit(1);
    return rows[0] ? toProject(rows[0]) : undefined;
  },
  ["project-by-slug"],
  { tags: ["projects"] }
);

export async function getProjectByIdAdmin(id: string) {
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);
  return rows[0] ? toAdminProject(rows[0]) : undefined;
}
