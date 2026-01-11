import Hero from "@/components/Hero/Hero";
import About from "@/components/Sections/About";
import Certifications from "@/components/Sections/Certifications";
import Projects from "@/components/Sections/Projects";
import TechStack from "@/components/Sections/TechStack";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <div className="relative z-20 bg-black">
        <About />
        <TechStack />
        <Certifications />
        <Projects />

        <footer className="py-12 bg-black border-t border-zinc-800 text-center text-zinc-600 text-sm">
          <p>© {new Date().getFullYear()} Shubhang Singh. All rights reserved.</p>
          <p className="mt-2">Crafting Logic, Coding Reality.</p>
        </footer>
      </div>
    </main>
  );
}
