import Container from "@/components/layout/Container";
import Hero from "@/components/sections/Hero";
import FeaturedProject from "@/components/sections/FeaturedProject";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import CurrentFocus from "@/components/sections/CurrentFocus";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Container className="flex-1">
        <Hero />
        <FeaturedProject />
        <ProjectsGrid />
        <CurrentFocus />
      </Container>
      <Container>
        <Footer />
      </Container>
    </>
  );
}
