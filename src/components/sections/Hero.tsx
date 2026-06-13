import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { SITE, SOCIAL } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="pt-24 pb-32 antialiased sm:pt-32 sm:pb-40">
      <div className="grid gap-12 md:grid-cols-[1fr_auto]">
        <div>
          <h1 className="text-foreground text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {SITE.name}
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">{SITE.tagline}</p>
          <p className="text-muted-foreground mt-6 max-w-lg text-base leading-relaxed">
            {SITE.description}
          </p>
        </div>
        <Card className="border-muted/50 w-72 shrink-0 shadow-lg dark:shadow-none">
          <CardContent className="flex flex-col gap-4 p-6">
            <div className="bg-muted mb-2 flex h-32 items-center justify-center rounded-lg">
              <span className="text-muted-foreground text-sm">Photo</span>
            </div>
            <Button asChild>
              <a
                href={SITE.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View GitHub
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
