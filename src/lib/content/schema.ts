import { z } from "zod";

export const MetricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  featuredRank: z.number().optional(),
  scope: z.enum(["personal", "client", "professional"]),
  status: z.enum(["active", "completed", "archived"]),
  role: z.string(),
  teamSize: z.number().optional(),
  duration: z.string().optional(),
  year: z.number(),
  completedAt: z.string().optional(),
  technologies: z.array(z.string()),
  outcomes: z.array(z.string()).optional(),
  metrics: z.array(MetricSchema).optional(),
  github: z.string().optional(),
  liveUrl: z.string().optional(),
  image: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Metric = z.infer<typeof MetricSchema>;
