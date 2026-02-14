"use client";

import { motion } from "framer-motion";
import BackgroundEffects from "@/components/BackgroundEffects";
import CursorSpotlight from "@/components/CursorSpotlight";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import Hero from "@/components/Hero";
import TerminalDemo from "@/components/TerminalDemo";
import DiffShowcase from "@/components/DiffShowcase";
import SplitShowcase from "@/components/SplitShowcase";
import Features from "@/components/Features";
import TechBadges from "@/components/TechBadges";
import Stats from "@/components/Stats";
import CTAFooter from "@/components/CTAFooter";

export default function Home() {
  return (
    <>
      {/* Fixed overlays — outside motion wrapper to preserve position: fixed */}
      <ScrollProgress />
      <Navbar />
      <CursorSpotlight />
      <BackToTop />

      <motion.main
        className="relative min-h-screen bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background effects */}
        <BackgroundEffects />

        {/* Content */}
        <div className="relative z-10">
          <Hero />
          <TerminalDemo />
          <DiffShowcase />
          <SplitShowcase />
          <Features />
          <TechBadges />
          <Stats />
          <CTAFooter />
        </div>
      </motion.main>
    </>
  );
}
