"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-black" />

      {/* Technical grid overlay */}
      <div className="absolute inset-0 bg-grid" />

      {/* Restrained top-left accent — cold blue */}
      <motion.div
        className="absolute -top-40 -left-20 w-[500px] h-[400px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(74, 124, 181, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Restrained bottom-right accent — warm gold */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-[400px] h-[300px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(196, 163, 90, 0.06) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Film grain */}
      <svg className="hidden">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
      <div
        className="absolute inset-0"
        style={{ filter: "url(#noise)", opacity: 0.03 }}
      />

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(196, 163, 90, 0.06), transparent)",
        }}
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
