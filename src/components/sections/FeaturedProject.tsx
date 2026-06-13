import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getFeaturedProjects } from "@/lib/content/projects";

export default async function FeaturedProject() {
  const featuredList = await getFeaturedProjects();
  const featured = featuredList[0];
  if (!featured) return null;

  return (
    <section className="pb-24 antialiased">
      <h2 className="text-muted-foreground mb-6 font-mono text-sm tracking-wider uppercase">
        Featured Project
      </h2>
      <Card className="group border-muted/50 hover:border-muted-foreground/20 overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-none">
        <div className="relative h-56 overflow-hidden sm:h-64">
          {featured.imageUrl ? (
            <Image
              src={featured.imageUrl}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
              <span className="absolute bottom-5 left-6 text-7xl font-bold text-white/10 select-none">
                {featured.title[0]}
              </span>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <Badge
              variant="secondary"
              className="bg-background/80 text-foreground border-border/60 font-mono text-[10px] tracking-widest uppercase backdrop-blur-sm"
            >
              {featured.scope}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6 sm:p-8">
          <h3 className="text-2xl font-semibold tracking-tight">
            {featured.title}
          </h3>
          <p className="text-muted-foreground mt-3 leading-relaxed">
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
          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href={"/projects/" + featured.slug}>
                View Case Study
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            {featured.githubUrl && (
              <Button variant="outline" size="icon" asChild>
                <a
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="sr-only">Source code</span>
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
