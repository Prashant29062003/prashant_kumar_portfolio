import fs from "fs";
import path from "path";
import { ProjectSchema, type Project } from "./schema";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function readProjects(): Project[] {
  const dirs = fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  return dirs.map((dir) => {
    const metaPath = path.join(PROJECTS_DIR, dir.name, "meta.json");
    const raw = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    return ProjectSchema.parse(raw);
  });
}

let cached: Project[] | null = null;

function getProjects(): Project[] {
  if (!cached) {
    cached = readProjects();
  }
  return cached;
}

export function getAllProjects(): Project[] {
  return getProjects();
}

export function getFeaturedProjects(): Project[] {
  return getProjects()
    .filter((p) => p.featuredRank !== undefined)
    .sort((a, b) => (a.featuredRank ?? 999) - (b.featuredRank ?? 999));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getProjectContent(slug: string): string | null {
  const contentPath = path.join(PROJECTS_DIR, slug, "content.mdx");
  if (!fs.existsSync(contentPath)) return null;
  return fs.readFileSync(contentPath, "utf-8");
}
