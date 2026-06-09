import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="text-muted-foreground py-12 font-mono text-xs antialiased">
      <Separator className="mb-12" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="tracking-tight">
          &copy; {new Date().getFullYear()}&nbsp;&mdash; Core Infrastructure
          Portfolio
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a
            href="mailto:prashant.kumar.work@gmail.com"
            className="hover:text-foreground transition-colors"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/prashantkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/prashantkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
