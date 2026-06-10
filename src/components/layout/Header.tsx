import Link from "next/link";
import Navigation from "./Navigation";
import Container from "./Container";
import { SITE } from "@/lib/constants";

export default function Header() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            {SITE.name}
          </Link>
          <Navigation />
        </div>
      </Container>
    </header>
  );
}
