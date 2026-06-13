import type { Project } from "./schema";

export type { Project, Metric } from "./schema";

export type AdminProject = Project & {
  id: string;
  isFeatured: boolean;
};
