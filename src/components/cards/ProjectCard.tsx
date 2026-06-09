import Link from "next/link";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/content/types";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={"/projects/" + project.slug}>
      <Card className="hover:bg-accent transition-colors">
        <CardContent className="p-6">
          <CardTitle className="font-medium">{project.title}</CardTitle>
          <CardDescription className="mt-2 leading-relaxed">
            {project.summary}
          </CardDescription>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
          <Button variant="link" className="mt-4 h-auto p-0">
            View Case Study &rarr;
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
