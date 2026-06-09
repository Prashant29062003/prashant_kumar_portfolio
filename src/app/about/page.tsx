import Container from "@/components/layout/Container";

export default function AboutPage() {
  return (
    <Container className="py-16">
      <article className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">About</h1>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Who I Am</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            I am a backend engineer focused on authentication systems, API
            design, and SaaS infrastructure. I care about architecture decisions
            that compound over time \u2014 schema design, system boundaries, and
            the tradeoffs that look small on day one but define a system years
            later.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Experience</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Software Engineer working primarily on backend services, database
            design, and API development. I build systems that handle
            authentication, authorization, and multi-tenant data isolation
            \u2014 the foundational layers that every product needs but few
            users see.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">What I Build</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            REST and GraphQL APIs, database schemas that survive production,
            authentication flows (JWT, OAuth2, session management), RBAC/ABAC
            systems, background job processors, and deployment pipelines.
            Full-stack when needed, but backend is where I invest depth.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Current Focus</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Investing time in multi-tenant SaaS architecture, authentication
            system design (refresh token rotation, session management at scale),
            and PostgreSQL performance. I write about what I learn \u2014
            technical notes on RBAC, JWT patterns, and system design.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Engineering Interests</h2>
          <ul className="text-muted-foreground mt-3 space-y-2">
            {[
              "Authentication & Authorization \u2014 OAuth2, OIDC, SAML, session management",
              "Multi-Tenant Systems \u2014 data isolation, tenant-aware caching, migration strategies",
              "System Design \u2014 distributed systems, event-driven architecture, CQRS",
              "Database Internals \u2014 query optimization, indexing strategies, schema evolution",
              "Developer Experience \u2014 API design, SDK generation, documentation tooling",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="bg-foreground mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Learning Roadmap</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Deeper into distributed systems \u2014 consensus algorithms,
            replication strategies, and building for failure. I work through
            system design problems and build small projects to test ideas before
            applying them at scale.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Outside Engineering</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            When not building, I read about cognitive science, write about
            engineering decisions, and explore tools that make complex systems
            easier to reason about.
          </p>
        </section>
      </article>
    </Container>
  );
}
