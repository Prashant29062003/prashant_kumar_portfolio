import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { SITE, NAVIGATION } from "@/lib/constants";

export default function Navigation() {
  return (
    <nav className="flex items-center gap-6 text-sm font-medium">
      {NAVIGATION.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {link.label}
        </Link>
      ))}
      <ThemeToggle />
      <Button variant="outline" size="sm" asChild className="rounded-full">
        <a href={SITE.resumeUrl} target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </Button>
    </nav>
  );
}
