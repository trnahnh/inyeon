"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const scrollToDemo = () => {
    const demoSection = document.getElementById("showcase");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyInstall = () => {
    navigator.clipboard.writeText(
      "pip install git+https://github.com/suka712/inyeon-upstream.git",
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-12">
      <motion.div
        className="text-center w-full max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Korean text */}
        <motion.p
          variants={itemVariants}
          className="text-zinc-600 text-xl sm:text-2xl tracking-[0.3em] uppercase mb-4 sm:mb-6 md:mb-8"
        >
          &#51064;&#50672;
        </motion.p>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-8xl font-bold mb-4 sm:mb-6 tracking-tight"
        >
          <span className="gradient-text inline-flex">
            {"Inyeon".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + i * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-zinc-300 text-base sm:text-lg md:text-xl mb-3 sm:mb-4"
        >
          Your Agentic AI Git Companion
        </motion.p>

        {/* Signature quote */}
        <motion.p
          variants={itemVariants}
          className="text-zinc-600 italic text-sm sm:text-lg mb-6 sm:mb-8 md:mb-12 px-2"
        >
          &ldquo;You are Daniel Craig but life owes you a Vesper Lynd?&rdquo;
        </motion.p>

        {/* Description - updated for v3 */}
        <motion.p
          variants={itemVariants}
          className="text-zinc-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed px-2"
        >
          Split commits, resolve conflicts, review code, and generate PRs &amp;
          changelogs — all in one command.
        </motion.p>

        {/* Install snippet */}
        <motion.div
          variants={itemVariants}
          className="mb-8 sm:mb-10 md:mb-14 max-w-md mx-auto px-4 sm:px-0"
        >
          <button
            onClick={copyInstall}
            className="w-full code-block flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 cursor-pointer hover:border-aurora-purple/40 transition-colors group min-w-0"
          >
            <code className="text-[10px] sm:text-xs md:text-sm text-zinc-300 overflow-hidden text-ellipsis whitespace-nowrap block min-w-0">
              <span className="text-aurora-purple">$</span> pip install git+https://github.com/suka712/inyeon-upstream.git
            </code>
            <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors flex-shrink-0">
              {copied ? (
                <svg
                  className="w-4 h-4 text-aurora-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </span>
          </button>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-3 sm:gap-4 px-4 sm:px-0"
        >
          {/* Primary row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            <MagneticButton className="w-full sm:w-auto">
              <motion.a
                href="https://github.com/suka712/inyeon-upstream"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex items-center justify-center gap-2 w-full"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                View on GitHub
              </motion.a>
            </MagneticButton>

            <MagneticButton className="w-full sm:w-auto">
              <motion.a
                href="https://inyeon-upstream-production.up.railway.app/docs"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-ghost w-full flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Live API Docs
              </motion.a>
            </MagneticButton>
          </div>

          {/* See how it works */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToDemo}
            className="btn-ghost w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            See how it works
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-zinc-700 to-transparent"
        />
      </motion.div>
    </section>
  );
}
