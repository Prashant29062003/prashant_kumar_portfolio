import Link from "next/link";
import { LayoutDashboard, FolderKanban, ExternalLink } from "lucide-react";
import { enforceAdminAuth } from "@/lib/admin/auth";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { logout } from "@/app/actions/logout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await enforceAdminAuth();

  return (
    <div className="bg-background min-h-screen">
      <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-1">
            <Link
              href="/admin"
              className="hover:bg-accent flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-semibold tracking-tight transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Admin
            </Link>
            <span className="bg-border mx-1 inline-block h-4 w-px" />
            <nav className="text-muted-foreground flex items-center gap-0.5 text-sm">
              <Link
                href="/admin/projects"
                className="hover:text-foreground hover:bg-accent inline-flex items-center gap-2 rounded-md px-3 py-1.5 transition-colors"
              >
                <FolderKanban className="h-3.5 w-3.5" />
                Projects
              </Link>
              <Link
                href="/"
                target="_blank"
                className="hover:text-foreground hover:bg-accent inline-flex items-center gap-2 rounded-md px-3 py-1.5 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View Site
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="bg-border inline-block h-4 w-px" />
            <form action={logout}>
              <Button type="submit" variant="ghost" size="sm">
                Logout
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
