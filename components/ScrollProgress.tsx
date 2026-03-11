"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px z-60"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "0%",
        background: "linear-gradient(90deg, #4a7cb5, #c4a35a)",
      }}
    />
  );
}
