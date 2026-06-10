import Container from "@/components/layout/Container";

export default function AboutPage() {
  return (
    <Container className="py-16">
      <article className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">About</h1>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Who I Am</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            I build full-stack web applications — currently as a Full Stack
            Developer Intern at E-Sutra Technologies — working with React.js,
            Next.js, Node.js, TypeScript, MongoDB, and PostgreSQL on production
            systems. My work spans authentication and authorization, database
            schema design, API development, and architectural decisions that
            influence long-term maintainability and scalability.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Experience</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            I&apos;m currently a Full Stack Developer Intern at E-Sutra
            Technologies Private Limited (Jan 2026 &ndash; Present),
            contributing to production web applications used in real-world
            environments. My work includes developing and integrating REST APIs,
            implementing frontend features, improving existing UI components,
            investigating and resolving frontend and backend issues, and
            collaborating with cross-functional teams through Agile development
            workflows using Jira.
          </p>
        </section>
        <section className="mt-6">
          <p className="text-muted-foreground leading-relaxed">
            Alongside professional work, I&apos;ve built and deployed several
            personal projects end-to-end, including a PG accommodation discovery
            platform, a sweet shop management system, and a multi-vendor food
            ordering platform. These projects span database design, API
            development, authentication, responsive user interfaces, deployment,
            and ongoing maintenance, helping me develop a strong full-stack
            engineering foundation.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">What I Build</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Full-stack web applications with React and Next.js frontends,
            Express and Node.js backends, and databases across PostgreSQL
            (Drizzle ORM) and MongoDB (Mongoose). Authentication flows with JWT
            access/refresh tokens, Google OAuth, email verification, and
            role-based access control. Deployed on Vercel, Netlify, and Railway.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Current Focus</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Deepening my understanding of the Next.js ecosystem — server
            components, server actions, and Drizzle ORM. Also exploring RBAC
            patterns, authentication architecture (refresh token rotation,
            session management), and when to choose SQL vs. NoSQL for a given
            problem.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Engineering Interests</h2>
          <ul className="text-muted-foreground mt-3 space-y-2">
            {[
              "Authentication & Authorization \u2014 JWT, OAuth2, RBAC, permission-based access control",
              "Database Design \u2014 PostgreSQL (Drizzle ORM), MongoDB (Mongoose), schema evolution",
              "Full-Stack Architecture \u2014 Next.js App Router, Server Components, Express modular monoliths",
              "System Design \u2014 event-driven architecture, API design, deployment pipelines",
              "Developer Experience \u2014 TypeScript, testing (Jest, Supertest), CI/CD",
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
            Adding TypeScript to existing JavaScript projects, writing
            integration tests for critical paths, and setting up automated CI/CD
            pipelines. Longer term, I&apos;m exploring distributed systems and
            event-driven architecture.
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
