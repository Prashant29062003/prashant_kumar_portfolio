"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, ExternalLink } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
  external?: boolean;
};

const links: NavLink[] = [
  { href: "/admin", label: "Admin", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/", label: "View Site", icon: ExternalLink, external: true },
];

export default function AdminNav() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="text-muted-foreground flex items-center gap-0.5 text-sm">
      {links.map((link) => {
        const active = isActive(link.href, link.exact);
        return (
          <Link
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 transition-colors ${
              active
                ? "bg-accent text-foreground font-semibold"
                : "hover:text-foreground hover:bg-accent"
            }`}
          >
            <link.icon className={link.exact ? "h-4 w-4" : "h-3.5 w-3.5"} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
