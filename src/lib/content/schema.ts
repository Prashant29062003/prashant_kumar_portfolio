import { z } from "zod";

export const SCOPES = ["personal", "client", "professional"] as const;
export const STATUSES = ["in_progress", "completed"] as const;
export const VISIBILITIES = ["draft", "published", "archived"] as const;

export const MetricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const ProjectSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string(),
  title: z.string(),
  summary: z.string().min(10),
  description: z.string(),
  body: z.string(),
  role: z.string(),
  scope: z.enum(SCOPES),
  status: z.enum(STATUSES),
  visibility: z.enum(VISIBILITIES),
  duration: z.string().nullable(),
  teamSize: z.number().nullable(),
  year: z.number(),
  githubUrl: z.string().nullable(),
  liveUrl: z.string().nullable(),
  imageUrl: z.string().nullable(),
  technologies: z.array(z.string()),
  outcomes: z.array(z.string()),
  metrics: z.array(MetricSchema),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Metric = z.infer<typeof MetricSchema>;
