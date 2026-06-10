import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getFeaturedProjects } from "@/lib/content/projects";

export default function FeaturedProject() {
  const featured = getFeaturedProjects()[0];
  if (!featured) return null;

  return (
    <section className="pb-24 antialiased">
      <h2 className="text-muted-foreground mb-6 font-mono text-sm tracking-wider uppercase">
        Featured Project
      </h2>
      <Card className="bg-muted/20 hover:border-muted-foreground/20 backdrop-blur-sm transition-all">
        <div className="relative h-56 overflow-hidden rounded-t-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
          <span className="absolute bottom-6 left-6 text-6xl font-bold text-white/20 select-none">
            {featured.title[0]}
          </span>
        </div>
        <CardContent className="p-6 sm:p-8">
          <Badge
            variant="outline"
            className="text-primary border-primary/20 bg-primary/10 font-mono text-[10px] tracking-widest uppercase"
          >
            {featured.scope}
          </Badge>
          <h3 className="text-foreground mt-4 text-2xl font-semibold">
            {featured.title}
          </h3>
          <p className="text-muted-foreground mt-3 text-base leading-relaxed">
            {featured.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {featured.technologies.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="border-border/60 font-mono"
              >
                {t}
              </Badge>
            ))}
          </div>
          <Separator className="mt-8 mb-6" />
          <Button variant="link" asChild className="group h-auto p-0">
            <Link href={"/projects/" + featured.slug}>
              View Case Study
              <span className="ml-1.5 transform transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
