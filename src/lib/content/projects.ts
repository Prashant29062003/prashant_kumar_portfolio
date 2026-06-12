import { unstable_cache } from "next/cache";
import { eq, and, isNotNull, asc, desc } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { projects } from "@/lib/db/schema";
import type { Project } from "./schema";

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
    duration: row.duration ?? undefined,
    teamSize: row.teamSize ?? undefined,
    year: row.year,
    githubUrl: row.githubUrl ?? undefined,
    liveUrl: row.liveUrl ?? undefined,
    imageUrl: row.imageUrl ?? undefined,
    technologies: JSON.parse(row.technologies),
    outcomes: row.outcomes ? JSON.parse(row.outcomes) : undefined,
    metrics: row.metrics ? JSON.parse(row.metrics) : undefined,
    featuredRank: row.featuredRank ?? undefined,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
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
        and(
          eq(projects.visibility, "published"),
          isNotNull(projects.featuredRank)
        )
      )
      .orderBy(asc(projects.featuredRank));
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

export async function getProjectBySlugAdmin(slug: string) {
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);
  return rows[0] ? toProject(rows[0]) : undefined;
}
