import { SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="pt-24 pb-32 antialiased sm:pt-32 sm:pb-40">
      <h1 className="text-foreground text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
        {SITE.name}
      </h1>
      <p className="text-muted-foreground mt-3 text-lg">{SITE.tagline}</p>
      <p className="text-muted-foreground mt-6 max-w-lg text-base leading-relaxed">
        {SITE.description}
      </p>
    </section>
  );
}
