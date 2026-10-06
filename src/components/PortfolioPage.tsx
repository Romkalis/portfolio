"use client";

import About from "./sections/About";
import Contact from "./sections/Contact";
import CtaBand from "./sections/CtaBand";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Features from "./sections/Features";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import SkillsTerminal from "./sections/SkillsTerminal";

export default function PortfolioPage() {
  return (
    <main>
      <Hero />
      <Features />
      <About />
      <SkillsTerminal />
      <Experience />
      <Education />
      <Projects />
      <CtaBand />
      <Contact />
    </main>
  );
}
