"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { AdminProject } from "@/lib/content/types";

type FormState = {
  values?: Record<string, unknown>;
  errors?: Record<string, string[]>;
  message?: string;
} | null;

type Props = {
  project?: AdminProject;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
};

export default function ProjectForm({ project, action }: Props) {
  const [state, formAction] = useActionState(action, null);

  const [technologies, setTechnologies] = useState<string[]>(
    project?.technologies?.length ? project.technologies : [""]
  );
  const [outcomes, setOutcomes] = useState<string[]>(
    project?.outcomes?.length ? project.outcomes : [""]
  );
  const [metrics, setMetrics] = useState<{ label: string; value: string }[]>(
    project?.metrics?.length ? project.metrics : [{ label: "", value: "" }]
  );

  const val = (name: string, fallback = "") =>
    (state?.values?.[name] as string) ??
    ((project as Record<string, unknown>)?.[name] as string) ??
    fallback;

  const numVal = (name: string, fallback = "") => {
    const v =
      state?.values?.[name] ?? (project as Record<string, unknown>)?.[name];
    if (v === null || v === undefined) return fallback;
    return String(v);
  };

  const err = (name: string) => state?.errors?.[name];

  return (
    <form action={formAction} className="space-y-8">
      {project?.id && <input type="hidden" name="id" value={project.id} />}

      {state?.message && (
        <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
          {state.message}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={val("title")} required />
          {err("title") && (
            <p className="text-destructive text-xs">{err("title")![0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" defaultValue={val("slug")} required />
          {err("slug") && (
            <p className="text-destructive text-xs">{err("slug")![0]}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Input
          id="summary"
          name="summary"
          defaultValue={val("summary")}
          required
        />
        {err("summary") && (
          <p className="text-destructive text-xs">{err("summary")![0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={val("description")}
          required
        />
        {err("description") && (
          <p className="text-destructive text-xs">{err("description")![0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="body">MDX Body</Label>
        <Textarea
          id="body"
          name="body"
          rows={25}
          className="font-mono text-sm"
          defaultValue={val("body")}
        />
        {err("body") && (
          <p className="text-destructive text-xs">{err("body")![0]}</p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input id="role" name="role" defaultValue={val("role")} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            name="year"
            type="number"
            defaultValue={numVal("year")}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            name="duration"
            defaultValue={val("duration")}
            placeholder="e.g. 3 months"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="teamSize">Team Size</Label>
          <Input
            id="teamSize"
            name="teamSize"
            type="number"
            defaultValue={numVal("teamSize")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="scope">Scope</Label>
          <select
            id="scope"
            name="scope"
            defaultValue={val("scope", "personal")}
            className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <option value="personal">Personal</option>
            <option value="client">Client</option>
            <option value="professional">Professional</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            defaultValue={val("status", "in_progress")}
            className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="visibility">Visibility</Label>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">
            {project?.visibility === "published"
              ? "Currently published. Use buttons below to change."
              : project?.visibility === "archived"
                ? "Currently archived. Edit status from projects list."
                : "Currently draft. Use buttons below to publish."}
          </span>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input
            id="githubUrl"
            name="githubUrl"
            type="url"
            defaultValue={val("githubUrl")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="liveUrl">Live URL</Label>
          <Input
            id="liveUrl"
            name="liveUrl"
            type="url"
            defaultValue={val("liveUrl")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            defaultValue={val("imageUrl")}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Technologies</Label>
        {technologies.map((t, i) => (
          <div key={i} className="flex gap-2">
            <Input
              name="technologies"
              defaultValue={t}
              placeholder="e.g. Next.js"
            />
            {technologies.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  setTechnologies(technologies.filter((_, j) => j !== i))
                }
              >
                &times;
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setTechnologies([...technologies, ""])}
        >
          + Add Technology
        </Button>
      </div>

      <div className="space-y-3">
        <Label>Outcomes</Label>
        {outcomes.map((o, i) => (
          <div key={i} className="flex gap-2">
            <Input
              name="outcomes"
              defaultValue={o}
              placeholder="e.g. Built RBAC system"
            />
            {outcomes.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setOutcomes(outcomes.filter((_, j) => j !== i))}
              >
                &times;
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setOutcomes([...outcomes, ""])}
        >
          + Add Outcome
        </Button>
      </div>

      <div className="space-y-3">
        <Label>Metrics</Label>
        {metrics.map((m, i) => (
          <div key={i} className="flex gap-2">
            <Input
              name="metricLabel"
              defaultValue={m.label}
              placeholder="Label"
            />
            <Input
              name="metricValue"
              defaultValue={m.value}
              placeholder="Value"
            />
            {metrics.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setMetrics(metrics.filter((_, j) => j !== i))}
              >
                &times;
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setMetrics([...metrics, { label: "", value: "" }])}
        >
          + Add Metric
        </Button>
      </div>

      <div className="border-border/40 bg-background sticky bottom-0 z-40 flex items-center gap-3 border-t py-4">
        <Button type="submit" name="_action" value="draft" variant="outline">
          Save Draft
        </Button>
        <Button
          type="submit"
          name="_action"
          value={project?.visibility === "published" ? "unpublish" : "publish"}
        >
          {project?.visibility === "published" ? "Unpublish" : "Publish"}
        </Button>
      </div>
    </form>
  );
}
