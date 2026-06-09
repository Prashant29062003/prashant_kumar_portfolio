export default function CurrentFocus() {
  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold tracking-tight">Current Focus</h2>
      <ul className="mt-6 space-y-3">
        {[
          "Authentication & Authorization",
          "Backend Architecture",
          "System Design",
          "Multi-Tenant SaaS",
        ].map((item) => (
          <li
            key={item}
            className="text-muted-foreground flex items-center gap-3"
          >
            <span className="bg-foreground h-1.5 w-1.5 rounded-full" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
