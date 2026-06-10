import { Separator } from "@/components/ui/separator";
import { SITE, SOCIAL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="text-muted-foreground py-12 font-mono text-xs antialiased">
      <Separator className="mb-12" />
      <p className="text-sm">Available for opportunities.</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        <a
          href={`mailto:${SITE.email}`}
          className="hover:text-foreground transition-colors"
        >
          Email
        </a>
        <a
          href={SOCIAL.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          LinkedIn
        </a>
        <a
          href={SOCIAL.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          GitHub
        </a>
        <a
          href={SITE.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Resume
        </a>
      </div>
    </footer>
  );
}
