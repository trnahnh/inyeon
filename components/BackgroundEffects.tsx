"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Pure black base */}
      <div className="absolute inset-0 bg-black" />

      {/* Subtle aurora glow - top */}
      <motion.div
        className="absolute -top-40 left-1/4 w-[600px] h-[400px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(ellipse, rgba(168, 85, 247, 0.4) 0%, rgba(34, 211, 238, 0.2) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 30, 0],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle aurora glow - bottom right */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-[500px] h-[300px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(ellipse, rgba(236, 72, 153, 0.3) 0%, rgba(168, 85, 247, 0.15) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Very subtle center glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(ellipse, rgba(34, 211, 238, 0.2) 0%, transparent 60%)",
          filter: "blur(120px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
