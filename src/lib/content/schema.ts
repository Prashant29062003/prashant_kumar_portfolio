import { z } from "zod";

export const MetricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  body: z.string(),
  role: z.string(),
  scope: z.enum(["personal", "client", "professional"]),
  status: z.enum(["completed", "in_progress"]),
  visibility: z.enum(["draft", "published", "archived"]),
  duration: z.string().optional(),
  teamSize: z.number().optional(),
  year: z.number(),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  technologies: z.array(z.string()),
  outcomes: z.array(z.string()).optional(),
  metrics: z.array(MetricSchema).optional(),
  featuredRank: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Metric = z.infer<typeof MetricSchema>;
