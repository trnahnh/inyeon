"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60]"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "0%",
        background: "linear-gradient(90deg, #1e3a5f, #722f37, #b8860b)",
      }}
    />
  );
}
