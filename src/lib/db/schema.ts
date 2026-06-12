import {
  sqliteTable,
  text,
  integer,
  check,
  index,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const projects = sqliteTable(
  "projects",
  {
    slug: text("slug").primaryKey().notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    description: text("description").notNull(),
    body: text("body").notNull(),
    role: text("role").notNull(),
    scope: text("scope").notNull(),
    status: text("status").notNull(),
    visibility: text("visibility").notNull(),
    duration: text("duration"),
    teamSize: integer("team_size"),
    year: integer("year").notNull(),
    githubUrl: text("github_url"),
    liveUrl: text("live_url"),
    imageUrl: text("image_url"),
    technologies: text("technologies").notNull(),
    outcomes: text("outcomes"),
    metrics: text("metrics"),
    featuredRank: integer("featured_rank"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => ({
    statusCheck: check(
      "status_check",
      sql`${table.status} IN ('completed', 'in_progress')`
    ),
    visibilityCheck: check(
      "visibility_check",
      sql`${table.visibility} IN ('draft', 'published', 'archived')`
    ),
    visibilityIdx: index("visibility_idx").on(table.visibility),
    featuredRankIdx: index("featured_rank_idx").on(table.featuredRank),
  })
);
