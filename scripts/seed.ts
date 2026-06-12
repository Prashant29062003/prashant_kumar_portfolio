import fs from "fs";
import path from "path";
import { db } from "@/lib/db/client";
import { projects } from "@/lib/db/schema";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function statusToNew(status: string): { status: string; visibility: string } {
  switch (status) {
    case "active":
      return { status: "in_progress", visibility: "published" };
    case "completed":
      return { status: "completed", visibility: "published" };
    case "archived":
      return { status: "completed", visibility: "archived" };
    default:
      return { status: "in_progress", visibility: "draft" };
  }
}

async function main() {
  const dirs = fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  let count = 0;

  for (const dir of dirs) {
    const metaPath = path.join(PROJECTS_DIR, dir.name, "meta.json");
    const contentPath = path.join(PROJECTS_DIR, dir.name, "content.mdx");

    if (!fs.existsSync(metaPath)) {
      console.warn(`Skipping ${dir.name}: no meta.json`);
      continue;
    }

    const raw = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    const { status: newStatus, visibility } = statusToNew(raw.status);

    const body = fs.existsSync(contentPath)
      ? fs.readFileSync(contentPath, "utf-8")
      : "";

    const now = new Date().toISOString();

    const record = {
      slug: raw.slug,
      title: raw.title,
      summary: raw.summary,
      description: raw.description,
      body,
      role: raw.role,
      scope: raw.scope,
      status: newStatus,
      visibility,
      duration: raw.duration ?? null,
      teamSize: raw.teamSize ?? null,
      year: raw.year,
      githubUrl: raw.github ?? null,
      liveUrl: raw.liveUrl ?? null,
      imageUrl: raw.image ?? null,
      technologies: JSON.stringify(raw.technologies ?? []),
      outcomes: raw.outcomes ? JSON.stringify(raw.outcomes) : null,
      metrics: raw.metrics ? JSON.stringify(raw.metrics) : null,
      featuredRank: raw.featuredRank ?? null,
      createdAt: now,
      updatedAt: now,
    };

    await db
      .insert(projects)
      .values(record)
      .onConflictDoUpdate({
        target: projects.slug,
        set: {
          ...record,
          updatedAt: now,
        },
      });

    console.log(`✅ ${raw.slug}`);
    count++;
  }

  console.log(`\n🎉 Seeded ${count} project(s).`);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
