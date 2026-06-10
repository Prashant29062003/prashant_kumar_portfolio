"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import ThemeToggle from "./ThemeToggle";
import { SITE, NAVIGATION } from "@/lib/constants";
import { Menu } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        {NAVIGATION.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors ${
              isActive(link.href)
                ? "text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
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

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="rounded-full">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] max-w-sm">
            <SheetDescription className="sr-only">
              Site navigation with links to Home, Projects, and About
            </SheetDescription>
            <div className="flex h-full flex-col">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 px-2">
                {NAVIGATION.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={`rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                        isActive(link.href)
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto border-t px-4 py-4">
                <div className="flex items-center justify-between">
                  <ThemeToggle />
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="rounded-full"
                  >
                    <a
                      href={SITE.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resume
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
