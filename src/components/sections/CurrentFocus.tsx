import { Card, CardContent } from "@/components/ui/card";
import { Shield, Server, GitBranch, Building2 } from "lucide-react";

const focusAreas = [
  {
    title: "Authentication & Authorization",
    description:
      "Building secure auth systems with session management, RBAC, and OAuth patterns.",
    icon: Shield,
  },
  {
    title: "Backend Architecture",
    description:
      "Designing scalable APIs with Node.js, Express, and PostgreSQL.",
    icon: Server,
  },
  {
    title: "System Design",
    description:
      "Architecting distributed systems with caching, load balancing, and microservices.",
    icon: GitBranch,
  },
  {
    title: "Multi-Tenant SaaS",
    description:
      "Building isolated tenant architectures with shared infrastructure.",
    icon: Building2,
  },
];

export default function CurrentFocus() {
  return (
    <section className="pb-24">
      <h2 className="text-2xl font-semibold tracking-tight">Current Focus</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {focusAreas.map((area) => (
          <Card
            key={area.title}
            className="group hover:border-muted-foreground/20 transition-all hover:-translate-y-0.5"
          >
            <CardContent className="p-6">
              <div className="bg-muted mb-4 flex size-10 items-center justify-center rounded-lg">
                <area.icon className="text-foreground size-5" />
              </div>
              <h3 className="font-semibold">{area.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {area.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
