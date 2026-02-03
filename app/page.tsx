import BackgroundEffects from "@/components/BackgroundEffects";
import Hero from "@/components/Hero";
import TerminalDemo from "@/components/TerminalDemo";
import DiffShowcase from "@/components/DiffShowcase";
import Features from "@/components/Features";
import TechBadges from "@/components/TechBadges";
import CTAFooter from "@/components/CTAFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      {/* Background effects */}
      <BackgroundEffects />

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <TerminalDemo />
        <DiffShowcase />
        <Features />
        <TechBadges />
        <CTAFooter />
      </div>
    </main>
  );
}
