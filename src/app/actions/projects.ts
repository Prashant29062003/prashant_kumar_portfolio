"use server";

import crypto from "crypto";
import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { projects } from "@/lib/db/schema";
import { ProjectSchema } from "@/lib/content/schema";
import { enforceAdminAuth } from "@/lib/admin/auth";

type FormState = {
  values?: Record<string, unknown>;
  errors?: Record<string, string[]>;
  message?: string;
} | null;

function formDataToProject(formData: FormData) {
  const technologies: string[] = [];
  for (const val of formData.getAll("technologies")) {
    const v = (val as string).trim();
    if (v) technologies.push(v);
  }

  const outcomes: string[] = [];
  for (const val of formData.getAll("outcomes")) {
    const v = (val as string).trim();
    if (v) outcomes.push(v);
  }

  const metricLabels = formData.getAll("metricLabel") as string[];
  const metricValues = formData.getAll("metricValue") as string[];
  const metrics = metricLabels
    .map((label, i) => ({
      label: label.trim(),
      value: (metricValues[i] ?? "").trim(),
    }))
    .filter((m) => m.label && m.value);

  return {
    id: (formData.get("id") as string) || undefined,
    slug: (formData.get("slug") as string) || "",
    title: (formData.get("title") as string) || "",
    summary: (formData.get("summary") as string) || "",
    description: (formData.get("description") as string) || "",
    body: (formData.get("body") as string) || "",
    role: (formData.get("role") as string) || "",
    scope: (formData.get("scope") as string) || "personal",
    status: (formData.get("status") as string) || "in_progress",
    visibility:
      (formData.get("_action") as string) === "publish" ? "published" : "draft",
    duration: (formData.get("duration") as string) || null,
    teamSize: (formData.get("teamSize") as string)
      ? Number(formData.get("teamSize"))
      : null,
    year: Number(formData.get("year")) || new Date().getFullYear(),
    githubUrl: (formData.get("githubUrl") as string) || null,
    liveUrl: (formData.get("liveUrl") as string) || null,
    imageUrl: (formData.get("imageUrl") as string) || null,
    technologies,
    outcomes,
    metrics,
  };
}

export async function createProject(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await enforceAdminAuth();

  const data = formDataToProject(formData);
  const parsed = ProjectSchema.safeParse(data);

  if (!parsed.success) {
    return {
      values: data as unknown as Record<string, unknown>,
      errors: parsed.error.flatten().fieldErrors,
      message: "Validation failed. Please check the form.",
    };
  }

  const slugExists = await db
    .select({ slug: projects.slug })
    .from(projects)
    .where(eq(projects.slug, parsed.data.slug))
    .limit(1);

  if (slugExists.length) {
    return {
      values: data as unknown as Record<string, unknown>,
      errors: { slug: ["A project with this slug already exists."] },
      message: "Slug is already taken.",
    };
  }

  const now = new Date().toISOString();
  const publishedAt = parsed.data.visibility === "published" ? now : null;

  await db.insert(projects).values({
    id: crypto.randomUUID(),
    slug: parsed.data.slug,
    title: parsed.data.title,
    summary: parsed.data.summary,
    description: parsed.data.description,
    body: parsed.data.body,
    role: parsed.data.role,
    scope: parsed.data.scope,
    status: parsed.data.status,
    visibility: parsed.data.visibility,
    duration: parsed.data.duration,
    teamSize: parsed.data.teamSize,
    year: parsed.data.year,
    githubUrl: parsed.data.githubUrl,
    liveUrl: parsed.data.liveUrl,
    imageUrl: parsed.data.imageUrl,
    technologies: JSON.stringify(parsed.data.technologies),
    outcomes: JSON.stringify(parsed.data.outcomes),
    metrics: JSON.stringify(parsed.data.metrics),
    createdAt: now,
    updatedAt: now,
    publishedAt,
  });

  revalidateTag("projects", "default");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await enforceAdminAuth();

  const data = formDataToProject(formData);
  const parsed = ProjectSchema.safeParse(data);

  if (!parsed.success) {
    return {
      values: data as unknown as Record<string, unknown>,
      errors: parsed.error.flatten().fieldErrors,
      message: "Validation failed. Please check the form.",
    };
  }

  const existing = await db
    .select({ publishedAt: projects.publishedAt })
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);

  if (!existing.length) {
    return {
      values: data as unknown as Record<string, unknown>,
      message: "Project not found.",
    };
  }

  const now = new Date().toISOString();
  const publishedAt =
    existing[0].publishedAt ??
    (parsed.data.visibility === "published" ? now : null);

  await db
    .update(projects)
    .set({
      slug: parsed.data.slug,
      title: parsed.data.title,
      summary: parsed.data.summary,
      description: parsed.data.description,
      body: parsed.data.body,
      role: parsed.data.role,
      scope: parsed.data.scope,
      status: parsed.data.status,
      visibility: parsed.data.visibility,
      duration: parsed.data.duration,
      teamSize: parsed.data.teamSize,
      year: parsed.data.year,
      githubUrl: parsed.data.githubUrl,
      liveUrl: parsed.data.liveUrl,
      imageUrl: parsed.data.imageUrl,
      technologies: JSON.stringify(parsed.data.technologies),
      outcomes: JSON.stringify(parsed.data.outcomes),
      metrics: JSON.stringify(parsed.data.metrics),
      updatedAt: now,
      publishedAt,
    })
    .where(eq(projects.id, id));

  revalidateTag("projects", "default");
  redirect("/admin/projects");
}

export async function toggleFeatured(id: string) {
  await enforceAdminAuth();

  const target = await db.query.projects.findFirst({
    where: eq(projects.id, id),
    columns: { isFeatured: true },
  });

  if (!target) throw new Error("Project not found");

  if (target.isFeatured) {
    await db
      .update(projects)
      .set({ isFeatured: false, updatedAt: new Date().toISOString() })
      .where(eq(projects.id, id));
  } else {
    await db
      .update(projects)
      .set({ isFeatured: false })
      .where(eq(projects.isFeatured, true));
    await db
      .update(projects)
      .set({ isFeatured: true, updatedAt: new Date().toISOString() })
      .where(eq(projects.id, id));
  }

  revalidateTag("projects", "default");
  revalidatePath("/", "page");
}

export async function deleteProject(id: string) {
  await enforceAdminAuth();

  await db.delete(projects).where(eq(projects.id, id));
  revalidateTag("projects", "default");
  redirect("/admin/projects");
}
