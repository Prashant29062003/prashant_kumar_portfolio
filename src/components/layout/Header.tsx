import Link from "next/link";
import Navigation from "./Navigation";
import Container from "./Container";

export default function Header() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Prashant Kumar
          </Link>
          <Navigation />
        </div>
      </Container>
    </header>
  );
}
